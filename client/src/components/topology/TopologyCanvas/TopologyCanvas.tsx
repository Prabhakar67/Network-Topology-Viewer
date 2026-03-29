
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    type Node,
    type Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import { useDevices } from "../../../hooks/useDevices";
import { useConnections } from "../../../hooks/useConnections";

import DeviceNode from "../DeviceNode";
import ConnectionEdge from "../ConnectionEdge/ConnectionEdge";

import Drawer from "../../ui/Drawer/Drawer";
import DeviceDrawer from "../../ui/Drawer/DeviceDrawer";
import ConnectionDrawer from "../../ui/Drawer/ConnectionDrawer";
import { MiniMap } from "reactflow";
import dagre from "dagre";

import deviceService from "../../../services/deviceService";
import connectionService from "../../../services/connectionService";

import { notify } from "../../ui/Toast/toast";
import DeviceSidebar from "../../devices/DeviceSidebar/deviceSide";
import { ReactFlowProvider, useReactFlow } from "reactflow";
import DevicePropertiesPanel from "../../layout/panels/DevicePropertiesPanel";
import Header from "../../layout/Header/Header";

const nodeTypes = {
    device: DeviceNode,
};

const createEmptyDevice = () => ({
    name: "",
    type: "server",
    status: "online",
    ip_address: "",
    position_x: 200,
    position_y: 200,
});

const TopologyCanvasInner = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [selectedDeviceDetails, setSelectedDeviceDetails] = useState<any>(null);
    const { project } = useReactFlow();

    const { devices, refresh: refreshDevices } = useDevices();
    const { connections, refresh: refreshConnections } = useConnections();


    useEffect(() => {
        const formattedNodes: Node[] = devices.map((device) => ({
            id: String(device.id),
            type: "device",
            position: {
                x: device.position_x,
                y: device.position_y,
            },
            data: {
                label: device.name,
                status: device.status,
                type: device.type,
                selected: selectedNodeId === String(device.id),
            }
        }));
        setNodes(formattedNodes);
    }, [devices, selectedNodeId]);


    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.key === "Delete" && selectedNodeId) {
                await deviceService.delete(Number(selectedNodeId));
                await refreshDevices();
                setSelectedNodeId(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedNodeId]);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const results = devices.filter((device) =>
            device.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(results);
    }, [searchTerm, devices]);

    const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        dagreGraph.setGraph({
            rankdir: "LR",
            ranksep: 120,
            nodesep: 80,
        });

        const nodeWidth = 140;
        const nodeHeight = 70;

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, {
                width: nodeWidth,
                height: nodeHeight,
            });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const layoutedNodes = nodes.map((node) => {
            const nodePosition = dagreGraph.node(node.id);

            return {
                ...node,
                position: {
                    x: nodePosition.x - nodeWidth / 2 + 200,
                    y: nodePosition.y - nodeHeight / 2 + 100,
                },
            };
        });

        return { nodes: layoutedNodes, edges };
    };

    const { setCenter } = useReactFlow();

    const focusNode = async (device: any) => {

        const node = nodes.find((n) => n.id === String(device.id));
        if (!node) return;

        setCenter(
            node.position.x,
            node.position.y,
            { zoom: 1.3, duration: 600 }
        );

        setSelectedNodeId(String(device.id));

        const fullDevice = await deviceService.getById(device.id);
        setSelectedDeviceDetails(fullDevice);

        setSearchResults([]);
    };

    const handleSaveTopology = () => {
        const topology = {
            nodes,
            edges,
        };

        const blob = new Blob([JSON.stringify(topology, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "topology.json";
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleAutoLayout = async () => {
        const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);

        setNodes(layoutedNodes);

        try {
            for (const node of layoutedNodes) {
                await deviceService.updatePosition(
                    Number(node.id),
                    node.position.x,
                    node.position.y
                );
            }

            notify.success("Layout saved");
        } catch (error) {
            console.error(error);
        }
    };

    const { edges, onConnect } = ConnectionEdge({
        connections,
        onEdgeClick: setSelectedEdge,
        refreshConnections,
    });

    const onNodeClick = async (_: any, node: Node) => {
        setSelectedNodeId(node.id);

        try {
            const fullDevice = await deviceService.getById(Number(node.id));
            setSelectedDeviceDetails(fullDevice);
        } catch (error) {
            console.error(error);
        }
    };

    const onNodeDoubleClick = async (_: any, node: Node) => {
        try {
            const fullDevice = await deviceService.getById(Number(node.id));
            setSelectedDevice(fullDevice); // drawer open
        } catch (error) {
            console.error(error);
        }
    };
    const onNodesChange = useCallback((changes: any) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onNodeDragStop = useCallback(
        async (_: any, node: Node) => {
            try {
                await deviceService.updatePosition(
                    Number(node.id),
                    node.position.x,
                    node.position.y
                );
                if (node.dragging) {
                    notify.success("Device position updated successfully");
                };
            } catch (error) {
                console.error("Position update failed", error);
                notify.error("Failed to update device position");
            }
        },
        []
    );

    const handleAddDevice = useCallback(() => {
        setSelectedDevice(createEmptyDevice());
    }, []);

    const handleSaveDevice = async (device: any) => {
        try {

            if (device.id) {
                await deviceService.update(device.id, device);
                notify.success("Device updated successfully");

                // refresh selected device details
                const updated = await deviceService.getById(device.id);
                setSelectedDeviceDetails(updated);

            } else {
                await deviceService.create(device);
                notify.success("Device added successfully");
            }

            await refreshDevices();

            setSelectedDevice(null);

        } catch (error) {
            console.error("Save device failed", error);
            notify.error("Failed to save device");
        }
    };

    const handleDeleteDevice = async (id: number) => {
        try {
            await deviceService.delete(id);
            await refreshDevices();
            setSelectedDevice(null);
            notify.success("Device deleted successfully");
        } catch (error) {
            console.error("Delete device failed", error);
            notify.error("Failed to delete device");
        }
    };

    const handleSaveConnection = async (edge: any) => {
        try {
            await connectionService.update(Number(edge.id), {
                label: edge.label,
            });
            await refreshConnections();
            setSelectedEdge(null);
            notify.success("Connection updated successfully");
        } catch (error) {
            console.error("Update connection failed", error);
            notify.error("Failed to update connection");
        }
    };

    const handleDeleteConnection = async (id: number) => {
        try {
            await connectionService.delete(id);
            await refreshConnections();
            setSelectedEdge(null);
            notify.success("Connection deleted successfully");
        } catch (error) {
            console.error("Delete connection failed", error);
            notify.error("Failed to delete connection");
        }
    };


    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        async (event: any) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            if (!type) return;

            const position = project({
                x: event.clientX,
                y: event.clientY,
            });

            try {
                await deviceService.create({
                    name: `${type}-${Date.now()}`,
                    type,
                    status: "online",
                    ip_address: "",
                    position_x: position.x,
                    position_y: position.y,
                });

                await refreshDevices();

                notify.success("Device added");
            } catch (error) {
                console.error(error);
                notify.error("Failed to add device");
            }
        },
        [project, refreshDevices]
    );

    const handleLoadTopology = (event: any) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (e: any) => {
            const topology = JSON.parse(e.target.result);

            setNodes(topology.nodes || []);

            // connections backend मधून refresh
            await refreshConnections();
        };

        reader.readAsText(file);
    };


    return (<>
        <Header
            onAddDevice={handleAddDevice}
            onAutoLayout={handleAutoLayout}
            onSaveTopology={handleSaveTopology}
            onLoadTopology={handleLoadTopology}

            searchTerm={searchTerm}
            onSearch={setSearchTerm}

            searchResults={searchResults}
            onSelectDevice={focusNode}
        />

        <div className="flex h-[calc(100vh-60px)] w-full">

            {/* LEFT SIDEBAR */}
            <div className="w-64 border-r bg-gray-50">
                <DeviceSidebar devices={devices} connections={connections} />
            </div>

            {/* CANVAS AREA */}
            <div className="flex-1 relative">

                {/* TOP TOOLBAR */}
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                </div>

                <div className="flex h-[calc(100vh-60px)] w-full">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onConnect={onConnect}
                        onNodeDragStop={onNodeDragStop}
                        onEdgeClick={(_, edge) => setSelectedEdge(edge)}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onNodeDoubleClick={onNodeDoubleClick}
                        minZoom={0.4}
                        maxZoom={1.3}
                        snapToGrid
                        snapGrid={[20, 20]}
                        fitView
                    >
                        <Background gap={20} size={1} color="gray" />
                        <Controls />


                        <MiniMap
                            nodeColor={(node) => {
                                if (node.data.status === "online") return "#22c55e";
                                if (node.data.status === "offline") return "#ef4444";
                                return "#facc15";
                            }}
                        />

                    </ReactFlow>
                </div>

            </div>
            <DevicePropertiesPanel device={selectedDeviceDetails} />

            <Drawer
                open={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
            >
                {selectedDevice && (
                    <DeviceDrawer
                        device={selectedDevice}
                        onClose={() => setSelectedDevice(null)}
                        onSave={handleSaveDevice}
                        onDelete={handleDeleteDevice}
                    />
                )}
            </Drawer>

            {/* CONNECTION DRAWER */}
            {<Drawer
                open={!!selectedEdge}
                onClose={() => setSelectedEdge(null)}
            >
                {selectedEdge && (
                    <ConnectionDrawer
                        edge={selectedEdge}
                        onClose={() => setSelectedEdge(null)}
                        onSave={handleSaveConnection}
                        onDelete={handleDeleteConnection}
                    />
                )}
            </Drawer>}

        </div>

    </>
    );
};

const TopologyCanvas = () => {
    return (
        <ReactFlowProvider>
            <TopologyCanvasInner />
        </ReactFlowProvider>
    );
};

export default TopologyCanvas;

