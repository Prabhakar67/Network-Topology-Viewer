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
            {filteredDevices.map((device) => (
                <DeviceCard key={device.id} device={device} />
            ))}
        </div>
    );
};

export default DeviceList;
