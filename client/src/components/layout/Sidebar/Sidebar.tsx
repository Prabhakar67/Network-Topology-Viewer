import DeviceList from "../../devices/DeviceList";
import type { Device } from "../../../types";

interface Props {
    filteredDevices: Device[];
}

const Sidebar = ({ filteredDevices }: Props) => {
    return (
        <div className="w-72 bg-gray-600 text-gray-100 border-r border-gray-700 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-white">
                Devices
            </h2>

            <div className="space-y-2">
                <DeviceList filteredDevices={filteredDevices} />
            </div>
        </div>
    );
};

export default Sidebar;