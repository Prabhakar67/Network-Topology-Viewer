
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyNodeChanges,
} from "reactflow";
import type { Node, Connection } from "reactflow";
import "reactflow/dist/style.css";

import { useDevices } from "../../../hooks/useDevices";
import { useConnections } from "../../../hooks/useConnections";
import DeviceNode from "../DeviceNode";
import Drawer from "../../ui/Drawer/Drawer";
import deviceService from "../../../services/deviceService";
import connectionService from "../../../services/connectionService";

const nodeTypes = {
    device: DeviceNode,
};

const TopologyCanvas = () => {
    const { devices, refresh: refreshDevices } = useDevices();
    const { connections, refresh: refreshConnections } = useConnections();

    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>(null);

    // Build nodes from devices
    useEffect(() => {
        const formatted = devices.map((device) => ({
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

    // Handle drag
    // const onNodesChange = useCallback(
    //     (changes: any) => {
    //         // Update UI immediately
    //         setNodes((nds) => applyNodeChanges(changes, nds));

    //         // Persist position when drag stops
    //         const positionChange = changes.find(
    //             (change: any) =>
    //                 change.type === "position" &&
    //                 change.dragging === false &&
    //                 change.position
    //         );

    //         if (!positionChange) return;

    //         const nodeId = Number(positionChange.id);
    //         const device = devices.find((d) => d.id === nodeId);

    //         if (!device) return;

    //         const { x, y } = positionChange.position;

    //         if (x === undefined || y === undefined) return;

    //         deviceService.updatePosition(device.id, x, y);
    //     },
    //     [devices]
    // );


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
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
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
                    <>
                        <h2>{selectedDevice.name}</h2>
                        <p>Status: {selectedDevice.status}</p>
                        <p>IP: {selectedDevice.ip_address}</p>
                    </>
                )}
            </Drawer>
        </div>
    );
};

export default TopologyCanvas;
