import { useState } from "react";
import { useFilteredDevices } from "../../../hooks/useFilteredDevices";
import ButtonComponent from "../../ui/Button/Button";

interface DeviceListProps {
    devices: any[];
}

const DeviceList = ({ devices }: DeviceListProps) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredDevices = useFilteredDevices(
        devices,
        searchTerm,
        statusFilter
    );

    const [selectedDevice, setSelectedDevice] = useState<any | null>(null);

    return (
        <div className="h-screen w-full bg-white p-6 overflow-y-auto">

            <h2 className="mb-4 text-xl font-semibold">Devices</h2>

            {/* Filters */}
            <div className="mb-8 space-y-2">

                <input
                    placeholder="Search device..."
                    className="border px-2 py-1 mr-2 rounded text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border px-2 py-1 mr-2 rounded text-sm"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>

            </div>

            {/* Device List */}
            <ul className="space-y-2">
                {filteredDevices.map((d) => (
                    <li
                        key={d.id}
                        className="flex justify-between rounded border p-3 text-sm"
                    >
                        <span>{d.name}</span>

                        <ButtonComponent
                            title="Details"
                            onClick={() => setSelectedDevice(d)}
                            className="bg-gray-600 hover:bg-gray-700 px-2 py-1 text-sm"
                        />

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

                            <ButtonComponent
                                title="Close"
                                onClick={() => setSelectedDevice(null)}
                                className="bg-gray-600 hover:bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceList;