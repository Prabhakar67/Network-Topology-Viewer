
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    type Node,
    type Connection,
    type Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import { useDevices } from "../../../hooks/useDevices";
import { useConnections } from "../../../hooks/useConnections";

import DeviceNode from "../DeviceNode";
import Drawer from "../../ui/Drawer/Drawer";
import DeviceDrawer from "../../ui/Drawer/DeviceDrawer";
import DeviceFilters from "../../devices/DeviceFilters";
import AddDevice from "../../ui/Button/Button";
import Sidebar from "../../layout/Sidebar/Sidebar";

import deviceService from "../../../services/deviceService";
import connectionService from "../../../services/connectionService";
import ConnectionDrawer from "../../ui/Drawer/ConnectionDrawer";
import { notify } from "../../ui/Toast/toast"

/* ----------------------------- HELPERS ----------------------------- */
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
    /* ----------------------------- STATE ----------------------------- */
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const { devices, refresh: refreshDevices } = useDevices();
    const { connections, refresh: refreshConnections } = useConnections();

    /* ----------------------------- FILTERED DEVICES ----------------------------- */
    const filteredDevices = useMemo(() => {
        return devices.filter((device) => {
            const matchesSearch = device.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesStatus =
                !statusFilter || device.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [devices, searchTerm, statusFilter]);

    /* ----------------------------- NODES ----------------------------- */
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


    const edges = useMemo(() => {
        return connections.map((conn) => ({
            id: String(conn.id),
            source: String(conn.source_device_id),
            target: String(conn.target_device_id),
            label: conn.label,
            animated: conn.status === "online",

            // 🔥 IMPORTANT
            status: conn.status,
            bandwidth: conn.bandwidth,
            connection_type: conn.connection_type,
        }));
    }, [connections]);


    /* ----------------------------- HANDLERS ----------------------------- */
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
                notify.success("device position update successfuly");
            } catch (error) {
                console.error("Position update failed", error);
            }
        },
        []
    );

    const onConnect = useCallback(
        async (params: Connection) => {
            if (!params.source || !params.target) return;

            try {
                await connectionService.create({
                    source_device_id: Number(params.source),
                    target_device_id: Number(params.target),
                    connection_type: "ethernet",
                    bandwidth: "1Gbps",
                    label: "New Link",
                    status: "online",
                });

                await refreshConnections();
                notify.success("new connection successfuly");
            } catch (error) {
                console.error("Connection create failed", error);
                notify.error("connection create failed");
            }
        },
        [refreshConnections]
    );

    const onEdgeClick = useCallback((_: any, edge: Edge) => {
        setSelectedEdge(edge);
    }, []);

    /* ----------------------------- DEVICE CRUD ----------------------------- */
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
            notify.error("Failed to add/update device");
        }
    };

    const handleDeleteDevice = async (id: number) => {
        try {
            await deviceService.delete(id);
            await refreshDevices();
            setSelectedDevice(null);
            notify.success("device deleted successfully");
        } catch (error) {
            console.error("Delete device failed", error);
            notify.error("failed to delete device");
        }
    };

    /* ----------------------------- ADD DEVICE ----------------------------- */
    const handleAddDevice = useCallback(() => {
        setSelectedDevice(createEmptyDevice());
    }, []);

    const handleSaveConnection = async (edge: any) => {
        try {
            await connectionService.update(
                Number(edge.id),
                { label: edge.label }
            );

            await refreshConnections();
            setSelectedEdge(null);
            notify.success("connection updated successfuly");
        } catch (err) {
            console.error("Update connection failed", err);
            notify.error("failed to update connection");
        }
    };

    const handleDeleteConnection = async (id: number) => {
        try {
            await connectionService.delete(id);
            await refreshConnections();
            setSelectedEdge(null); // close drawer
            notify.success("connection deleted successfuly")
        } catch (err) {
            console.error("Delete connection failed", err);
        }
    };


    /* ----------------------------- RENDER ----------------------------- */
    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            {/* Graph */}
            <div style={{ flex: 1, height: "100%" }}>
                <Sidebar filteredDevices={filteredDevices} />

                <AddDevice
                    onSearch={setSearchTerm}
                    onStatusFilter={setStatusFilter}
                    onAddDevice={handleAddDevice}
                />

                <DeviceFilters
                    onSearch={setSearchTerm}
                    onStatusFilter={setStatusFilter}
                />

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onEdgeClick={onEdgeClick}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>

            {/* Drawer */}
            <Drawer open={!!selectedDevice} onClose={() => setSelectedDevice(null)}>
                {selectedDevice && (
                    <DeviceDrawer
                        device={selectedDevice}
                        onClose={() => setSelectedDevice(null)}
                        onSave={handleSaveDevice}
                        onDelete={handleDeleteDevice}
                    />
                )}
            </Drawer>

            <Drawer open={!!selectedEdge} onClose={() => setSelectedEdge(null)}>
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
