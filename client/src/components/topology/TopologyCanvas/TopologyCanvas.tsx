
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
    Background, Controls, addEdge, applyNodeChanges,
} from "reactflow";
import type { Node, Connection } from "reactflow";
import "reactflow/dist/style.css";

import { useDevices } from "../../../hooks/useDevices";
import { useConnections } from "../../../hooks/useConnections";
import DeviceNode from "../DeviceNode";
import Drawer from "../../ui/Drawer/Drawer";
import deviceService from "../../../services/deviceService";
import connectionService from "../../../services/connectionService";
import DeviceFilters from "../../devices/DeviceFilters";

const nodeTypes = {
    device: DeviceNode,
};

const TopologyCanvas = () => {
    const { devices, refresh: refreshDevices } = useDevices();
    const { connections, refresh: refreshConnections } = useConnections();

    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedEdge, setSelectedEdge] = useState<any>(null)

    // Build nodes from devices
    useEffect(() => {
        const formatted = filteredDevices.map((device) => ({
            id: String(device.id),
            type: "device",
            position: {
                x: device.position_x,
                y: device.position_y,
            },
            data: {
                label: device.name,
                status: device.status,
                onClick: () => setSelectedDevice(device),
            },
        }));

        setNodes(formatted);
    }, [devices]);

    const filteredDevices = devices.filter((d) => {
        const matchesSearch =
            d.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "" || d.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const onEdgeClicked = (_: any, edge: any) => {
        setSelectedEdge(edge);
    };

    // Build edges from connections
    const edges = useMemo(() => {
        return connections.map((conn) => ({
            id: String(conn.id),
            source: String(conn.source_device_id),
            target: String(conn.target_device_id),
            label: conn.label,
            animated: conn.status === "online",
        }));
    }, [connections]);


    const onNodesChange = useCallback(
        (changes: any) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        []
    );

    const onNodeDragStop = useCallback(
        async (_: any, node: any) => {
            try {
                await deviceService.updatePosition(
                    Number(node.id),
                    node.position.x,
                    node.position.y
                );
                console.log("PATCH CALLED ✅");
            } catch (err) {
                console.error("Position update failed", err);
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

                refreshConnections(); // refetch connections
            } catch (err) {
                console.error("Connection create failed", err);
            }
        },
        [refreshConnections]
    );

    const drawerStyle: React.CSSProperties = {
        position: "fixed",
        top: 0,
        right: 0,
        width: 320,
        height: "100vh",
        background: "#1f2937",
        color: "white",
        padding: 20,
        zIndex: 1000,
    };


    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            {/* Graph */}
            <div style={{ flex: 1, height: "100%" }}>
                <DeviceFilters
                    onSearch={setSearchTerm}
                    onStatusFilter={setStatusFilter}
                />

                <button
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        zIndex: 1000,
                        padding: "8px 12px",
                    }}
                    onClick={() =>
                        setSelectedDevice({
                            name: "",
                            type: "server",
                            status: "online",
                            ip_address: "",
                            position_x: 200,
                            position_y: 200,
                        })
                    }
                >
                    Add Device
                </button>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onEdgeClick={onEdgeClicked}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>

            {/* Drawer */}
            <Drawer
                open={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
            >
                {selectedDevice && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            width: 300,
                            height: "100vh",
                            background: "#1f2937",
                            color: "white",
                            padding: 20,
                            zIndex: 200,
                        }}
                    >
                        <h3>Edit Device</h3>

                        <input
                            value={selectedDevice.name}
                            onChange={(e) =>
                                setSelectedDevice({
                                    ...selectedDevice,
                                    name: e.target.value,
                                })
                            }
                            style={{ width: "100%", marginBottom: 10 }}
                        />

                        <select
                            value={selectedDevice.status}
                            onChange={(e) =>
                                setSelectedDevice({
                                    ...selectedDevice,
                                    status: e.target.value,
                                })
                            }
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <option value="online">Online</option>
                            <option value="warning">Warning</option>
                            <option value="offline">Offline</option>
                            <option value="maintenance">Maintenance</option>
                        </select>

                        <button
                            onClick={async () => {
                                if (selectedDevice.id) {
                                    // EDIT MODE
                                    await deviceService.update(
                                        selectedDevice.id,
                                        selectedDevice
                                    );
                                } else {
                                    // ADD MODE
                                    await deviceService.create(selectedDevice);
                                }

                                await refreshDevices();
                                setSelectedDevice(null);
                            }}
                        >
                            Save
                        </button>


                        <button
                            style={{ marginLeft: 10 }}
                            onClick={async () => {
                                await deviceService.delete(selectedDevice.id);
                                await refreshDevices();
                                setSelectedDevice(null);
                            }}
                        >
                            Delete
                        </button>

                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() => setSelectedDevice(null)}
                        >
                            Close
                        </button>
                    </div>
                )}



                {selectedEdge && (
                    <div style={drawerStyle}>
                        <h3>Edit Connection</h3>

                        <input
                            value={selectedEdge.label || ""}
                            onChange={(e) =>
                                setSelectedEdge({
                                    ...selectedEdge,
                                    label: e.target.value,
                                })
                            }
                        />

                        <button
                            onClick={async () => {
                                await connectionService.update(
                                    Number(selectedEdge.id),
                                    { label: selectedEdge.label }
                                );
                                await refreshConnections();
                                setSelectedEdge(null);
                            }}
                        >
                            Save
                        </button>

                        <button
                            onClick={async () => {
                                await connectionService.delete(
                                    Number(selectedEdge.id)
                                );
                                await refreshConnections();
                                setSelectedEdge(null);
                            }}
                        >
                            Delete
                        </button>

                        <button onClick={() => setSelectedEdge(null)}>
                            Close
                        </button>
                    </div>
                )}



            </Drawer>
        </div>
    );
};

export default TopologyCanvas;
