import { useState } from "react";
import DeviceDetails from "../DeviceDetails/DeviceDetails";

interface Props {
    device: any;
}

const DeviceCard = ({ device }: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border-b border-gray-200 px-2 py-2 text-sm">
            {/* Main row */}
            <div className="grid grid-cols-3 items-center gap-2">
                {/* Column 1: Device */}
                <div className="text-gray-800">
                    {device.name}
                </div>

                {/* Column 2: Status */}
                <div>
                    <span
                        className={`rounded px-2 py-0.5 text-xs
              ${device.status === "online"
                                ? "bg-green-100 text-green-700"
                                : device.status === "offline"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }
            `}
                    >
                        {device.status}
                    </span>
                </div>

                {/* Column 3: Details */}
                <div>
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-blue-600 hover:underline"
                    >
                        {showDetails ? "Hide" : "Details"}
                    </button>
                </div>
            </div>

            {/* Details section */}
            {showDetails && (
                <DeviceDetails
                    device={device}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    );
};

export default DeviceCard;
