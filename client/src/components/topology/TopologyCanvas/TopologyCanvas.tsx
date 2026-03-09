
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

import DeviceFilters from "../../devices/DeviceFilters";

import deviceService from "../../../services/deviceService";
import connectionService from "../../../services/connectionService";

import { notify } from "../../ui/Toast/toast";
import ButtonComponent from "../../ui/Button/Button";
import { useFilteredDevices } from "../../../hooks/useFilteredDevices";

const createEmptyDevice = () => ({
    name: "",
    type: "server",
    status: "online",
    ip_address: "",
    position_x: 200,
    position_y: 200,
});

const nodeTypes = {
    device: DeviceNode,
};

const TopologyCanvas = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const { devices, refresh: refreshDevices } = useDevices();
    const { connections, refresh: refreshConnections } = useConnections();


    const filteredDevices = useFilteredDevices(
        devices,
        searchTerm,
        statusFilter
    );

    useEffect(() => {
        const formattedNodes: Node[] = filteredDevices.map((device) => ({
            id: String(device.id),
            type: "device",
            position: {
                x: device.position_x,
                y: device.position_y,
            },
            data: {
                label: device.name,
                status: device.status,
                onClick: async () => {
                    const fullDevice = await deviceService.getById(device.id);
                    setSelectedDevice(fullDevice);
                },
            },
        }));

        setNodes(formattedNodes);
    }, [filteredDevices]);

    const { edges, onConnect } = ConnectionEdge({
        connections,
        onEdgeClick: setSelectedEdge,
        refreshConnections,
    });

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

    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            {/* Graph Area */}
            <div style={{ flex: 1, height: "100%" }}>
                <div className="flex items-center justify-center">
                    <ButtonComponent
                        title="Add Device"
                        onClick={handleAddDevice}
                        className="bg-blue-600 hover:bg-blue-700 px-2 py-2"
                    />

                </div>

                <div className="flex items-center justify-center">
                    <DeviceFilters
                        onSearch={setSearchTerm}
                        onStatusFilter={setStatusFilter}
                    />

                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onEdgeClick={(_, edge) => setSelectedEdge(edge)}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>

            {/* Device Drawer */}
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

            {/* Connection Drawer */}
            <Drawer
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
            </Drawer>
        </div>
    );
};

export default TopologyCanvas;

