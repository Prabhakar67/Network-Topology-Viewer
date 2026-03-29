import { useCallback } from "react";
import type { Edge, Connection } from "reactflow";
import { MarkerType } from "reactflow";

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

    const edges: Edge[] = connections.map((conn) => ({
        id: String(conn.id),
        source: String(conn.source_device_id),
        target: String(conn.target_device_id),

        type: "smoothstep",

        label: conn.label || "1Gbps",

        animated: true,

        style: {
            stroke: "#3b82f6",
            strokeWidth: 2,
        },

        markerEnd: {
            type: MarkerType.ArrowClosed,
        },

        // important for edit drawer
        data: {
            connection: conn
        }
    }));


    // create new connection
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

                notify.success("Connection created successfully");

            } catch (error) {
                console.error("Connection create failed", error);
                notify.error("Connection create failed");
            }

        },
        [refreshConnections]
    );


    return {
        edges,
        onConnect,
        onEdgeClick
    };
};

export default ConnectionEdge;