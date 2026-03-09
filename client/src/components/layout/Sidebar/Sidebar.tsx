import { useState } from "react";

interface DeviceListProps {
    devices: any[];
}

const DeviceList = ({ devices }: DeviceListProps) => {
    const [selectedDevice, setSelectedDevice] = useState<any | null>(null);

    return (
        <div className="h-screen w-full bg-white p-6 overflow-y-auto">
            <h2 className="mb-4 text-xl font-semibold">Devices</h2>

            {/* Device List */}
            <ul className="space-y-2">
                {devices.map((d) => (
                    <li
                        key={d.id}
                        className="flex justify-between rounded border p-3 text-sm"
                    >
                        <span>{d.name}</span>

                        <button
                            className="text-blue-600 text-xs"
                            onClick={() => setSelectedDevice(d)}
                        >
                            Details
                        </button>
                    </li>
                ))}
            </ul>

            {/* Overlay Details */}
            {selectedDevice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setSelectedDevice(null)}
                    />

                    {/* modal */}
                    <div className="relative bg-white p-6 rounded shadow-lg w-96">

                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                Device Details
                            </h3>

                            <button onClick={() => setSelectedDevice(null)}>
                                ✕
                            </button>
                        </div>

                        <div className="space-y-2 text-sm">
                            {Object.entries(selectedDevice).map(([key, value]) => (
                                <p key={key}>
                                    <b>{key.replaceAll("_", " ")}:</b> {String(value)}
                                </p>
                            ))}
                        </div>

                        <div className="mt-4 text-right">
                            <button
                                className="px-3 py-1 bg-gray-200 rounded"
                                onClick={() => setSelectedDevice(null)}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceList;