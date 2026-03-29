import { Handle, Position } from "reactflow";
import { Server, Router, Shield, Network } from "lucide-react";


const getIcon = (type: string) => {
    switch (type) {
        case "router":
            return <Router size={18} />;
        case "switch":
            return <Network size={18} />;
        case "server":
            return <Server size={18} />;
        case "firewall":
            return <Shield size={18} />;
        default:
            return <Server size={18} />;
    }
};

const getBorderColor = (status: string) => {
    switch (status) {
        case "online":
            return "border-green-500";
        case "offline":
            return "border-red-500";
        case "warning":
            return "border-yellow-500";
        default:
            return "border-gray-300";
    }
};

const DeviceNode = ({ data }: any) => {
    return (
        <div
            className={`px-3 py-2 bg-white border-2 rounded-lg shadow flex flex-col items-center
${data.selected
                    ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                    : getBorderColor(data.status)}
`}
        >
            {getIcon(data.type)}

            <span className="text-sm font-medium">{data.label}</span>

            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default DeviceNode;