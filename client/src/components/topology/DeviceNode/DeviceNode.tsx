import { Handle, Position } from "reactflow";

interface Props {
    data: {
        label: string;
        status?: string;
        onClick?: () => void;
    };
}

const statusBorderClass = (status?: string) => {
    switch (status) {
        case "online":
            return "border-green-500";
        case "warning":
            return "border-yellow-400";
        case "offline":
            return "border-red-500";
        case "maintenance":
            return "border-blue-500";
        default:
            return "border-gray-400";
    }
};

const DeviceNode = ({ data }: Props) => {
    return (
        <div
            onClick={() => {
                data.onClick?.();
            }}
            className={`
        min-w-[120px]
        rounded-lg
        border-2
        ${statusBorderClass(data.status)}
        bg-white
        dark:bg-gray-900
        text-gray-900
        dark:text-gray-100
        font-semibold
        text-center
        px-3
        py-2
        cursor-pointer
        shadow-sm
        hover:shadow-md
        transition
      `}
        >
            <div className="mb-1">{data.label}</div>

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default DeviceNode;
