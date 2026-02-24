import { useCallback, useMemo } from "react";
import type { Edge, Connection } from "reactflow";
import connectionService from "../../../services/connectionService";
import { notify } from "../../ui/Toast/toast";

interface Props {
    connections: any[];
    onEdgeClick: (edge: Edge) => void;
    refreshConnections: () => Promise<void>;
}

const ConnectionEdge = ({
    connections,
    onEdgeClick,
    refreshConnections,
}: Props) => {
    // edges build
    const edges: Edge[] = useMemo(() => {
        return connections.map((conn) => ({
            id: String(conn.id),
            source: String(conn.source_device_id),
            target: String(conn.target_device_id),
            label: conn.label,
            animated: conn.status === "online",

            status: conn.status,
            bandwidth: conn.bandwidth,
            connection_type: conn.connection_type,
        }));
    }, [connections]);

    // new connection create
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
                notify.success("new connection successfully");
            } catch (error) {
                console.error("Connection create failed", error);
                notify.error("connection create failed");
            }
        },
        [refreshConnections]
    );

    return {
        edges,
        onConnect,
        onEdgeClick,
    };
};

export default ConnectionEdge;
