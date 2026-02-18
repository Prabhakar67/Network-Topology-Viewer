
import { useDevices } from "../../../hooks/useDevices";

const DeviceList = () => {
    const { filteredDevices, loading } = useDevices();

    if (loading)
        return (
            <div className="flex items-center justify-center py-6 text-gray-600 dark:text-gray-300">
                Loading...
            </div>
        );

    return (
        <div className="max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                Devices with Status
            </h2>

            <ul className="space-y-2">
                {filteredDevices.map((device) => (
                    <li
                        key={device.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <span className="font-medium">{device.name}</span>

                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold
                                ${device.status === "online"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : device.status === "offline"
                                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                }
                            `}
                        >
                            {device.status}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceList;
