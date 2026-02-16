import { Handle, Position } from "reactflow";

interface Props {
    data: {
        label: string;
        status?: string;
        onClick?: () => void;
    };
}

const getBorderColor = (status?: string) => {
    switch (status) {
        case "online":
            return "#22c55e";
        case "warning":
            return "#facc15";
        case "offline":
            return "#ef4444";
        case "maintenance":
            return "#3b82f6";
        default:
            return "#999";
    }
};

const DeviceNode = ({ data }: Props) => {
    return (
        <div
            // onClick={data.onClick}
            onClick={() => {
                console.log("NODE CLICKED");
                data.onClick?.();
            }}

            style={{
                padding: 12,
                borderRadius: 8,
                border: `2px solid ${getBorderColor(data.status)}`,
                background: "#ffffff",
                minWidth: 120,
                textAlign: "center",
                fontWeight: 600,
                color: "#111827",   // 👈 important: text color
            }}
        >
            <div>{data.label}</div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default DeviceNode;
