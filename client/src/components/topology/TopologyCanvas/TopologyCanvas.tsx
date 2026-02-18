
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
import DeviceDrawer from "../../ui/Drawer/DeviceDrawer";
import TopologyToolbar from "./TopologyToolbar";
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

    const filteredDevices = useMemo(() => {
        return devices.filter((d) => {
            const matchesSearch =
                d.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "" || d.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [devices, searchTerm, statusFilter]);


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
    }, [filteredDevices]);



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


    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            {/* Graph */}
            <div style={{ flex: 1, height: "100%" }}>

                <TopologyToolbar
                    onSearch={setSearchTerm}
                    onStatusFilter={setStatusFilter}
                    onAddDevice={() =>
                        setSelectedDevice({
                            name: "",
                            type: "server",
                            status: "online",
                            ip_address: "",
                            position_x: 200,
                            position_y: 200,
                        })
                    }
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
                    onEdgeClick={onEdgeClicked}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>



            <Drawer
                open={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
            >
                {selectedDevice && (
                    <DeviceDrawer
                        device={selectedDevice}
                        onClose={() => setSelectedDevice(null)}
                        onSave={async (device) => {
                            if (device.id) {
                                await deviceService.update(device.id, device);
                            } else {
                                await deviceService.create(device);
                            }
                            await refreshDevices();
                            setSelectedDevice(null);
                        }}
                        onDelete={async (id) => {
                            await deviceService.delete(id);
                            await refreshDevices();
                            setSelectedDevice(null);
                        }}
                    />
                )}
            </Drawer>

        </div>
    );
};

export default TopologyCanvas;
