interface Props {
    device: Record<string, any>;
    onClose: () => void;
}

// helper: snake_case → Title Case
const formatLabel = (key: string) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const HIDDEN_FIELDS = [
    "id",
    "created_at",
    "updated_at",
    "position_x",
    "position_y",
];

const DeviceDetails = ({ device, onClose }: Props) => {
    if (!device) return null;

    return (
        <div className="mt-2 rounded border border-gray-300 bg-white p-3 text-sm shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-800">
                Device Details
            </h4>

            <div className="space-y-1">
                {Object.entries(device)
                    .filter(([key]) => !HIDDEN_FIELDS.includes(key))
                    .map(([key, value]) => (
                        <div key={key} className="flex">
                            <span className="w-32 font-medium text-gray-600">
                                {formatLabel(key)}:
                            </span>
                            <span className="text-gray-800">
                                {value ?? "-"}
                            </span>
                        </div>
                    ))}
            </div>

            <button
                onClick={onClose}
                className="  py-1 px-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition duration-200"
            >
                Close
            </button>
        </div>
    );
};

export default DeviceDetails;
