import { useDevices } from "../../../hooks/useDevices";
import type { Device } from "../../../types";
import DeviceCard from "../DeviceCard/DeviceCard";

interface Props {
    filteredDevices: Device[];
}

const DeviceList = ({ filteredDevices }: Props) => {
    const { loading } = useDevices();

    if (loading) {
        return <div className="py-4 text-gray-600">Loading...</div>;
    }

    return (
        <div className="max-w-md border border-gray-300 bg-white">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 border-b border-gray-300 bg-gray-100 px-2 py-2 text-sm font-medium">
                <div>Device</div>
                <div>Status</div>
                <div>Details</div>
            </div>

            {/* Rows */}
            {filteredDevices.map((device) => (
                <DeviceCard key={device.id} device={device} />
            ))}
        </div>
    );
};

export default DeviceList;
