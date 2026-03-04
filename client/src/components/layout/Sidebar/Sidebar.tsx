
import { useState } from "react";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    devices: any[];
}

const Sidebar = ({ open, onClose, devices }: SidebarProps) => {
    const [selectedDevice, setSelectedDevice] = useState<any | null>(null);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* sidebar panel */}
            <div
                className="absolute left-0 top-0 h-full w-72 bg-white border-r border-gray-200 p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Devices</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Device list */}
                <ul className="space-y-2 text-sm">
                    {devices.map((d) => (
                        <li key={d.id} className="rounded border p-2 flex justify-between">
                            <span>{d.name}</span>

                            <button
                                className="text-blue-500 text-xs"
                                onClick={() => setSelectedDevice(d)}
                            >
                                Details
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Device Details Modal */}
            {selectedDevice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedDevice(null)} />

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
                                    <b>{key.toUpperCase()}:</b> {String(value)}
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

export default Sidebar;