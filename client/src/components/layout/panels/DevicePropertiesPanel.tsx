import { useState, useEffect } from "react";

interface Props {
    device: any;
}

const DevicePropertiesPanel = ({ device }: Props) => {
    const [localDevice, setLocalDevice] = useState<any>(device || {});

    useEffect(() => {
        if (device) {
            setLocalDevice(device);
        }
    }, [device]);

    if (!device) {
        return (
            <div className="w-72 border-l bg-white p-4">
                <h3 className="font-semibold text-gray-700">Device Properties</h3>
                <p className="text-sm text-gray-400 mt-4">
                    Select a device to view details
                </p>
            </div>
        );
    }

    const fields = Object.entries(localDevice);

    return (
        <div className="w-72 border-l bg-white p-4 space-y-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-700">Device Properties</h3>

            {fields.map(([key, value]) => (
                <div key={key} className="flex flex-col">
                    <span className="text-xs text-gray-500 capitalize">
                        {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                        {value?.toString() || "-"}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default DevicePropertiesPanel;