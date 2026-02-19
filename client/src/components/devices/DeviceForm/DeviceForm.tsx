import { useEffect, useState } from "react";

interface Props {
    device: any;
    onChange: (device: any) => void;
}

const DeviceForm = ({ device, onChange }: Props) => {
    const [localDevice, setLocalDevice] = useState<any>(device);

    // sync when parent device changes
    useEffect(() => {
        setLocalDevice(device);
    }, [device]);

    const update = (key: string, value: any) => {
        const updated = { ...localDevice, [key]: value };
        setLocalDevice(updated);
        onChange(updated);
    };

    const inputClass =
        "w-full rounded border border-gray-300 px-2 py-1 text-sm";

    return (
        <div className="space-y-2">
            <div>
                <label className="text-sm">Name</label>
                <input
                    className={inputClass}
                    value={localDevice.name || ""}
                    onChange={(e) => update("name", e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">Type</label>
                <select
                    className={inputClass}
                    value={localDevice.type || "server"}
                    onChange={(e) => update("type", e.target.value)}
                >
                    <option value="router">Router</option>
                    <option value="switch">Switch</option>
                    <option value="server">Server</option>
                    <option value="firewall">Firewall</option>
                </select>
            </div>

            <div>
                <label className="text-sm">Status</label>
                <select
                    className={inputClass}
                    value={localDevice.status || "online"}
                    onChange={(e) => update("status", e.target.value)}
                >
                    <option value="online">Online</option>
                    <option value="warning">Warning</option>
                    <option value="offline">Offline</option>
                    <option value="maintenance">Maintenance</option>
                </select>
            </div>

            <div>
                <label className="text-sm">IP Address</label>
                <input
                    className={inputClass}
                    value={localDevice.ip_address || ""}
                    onChange={(e) => update("ip_address", e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">MAC Address</label>
                <input
                    className={inputClass}
                    value={localDevice.mac_address || ""}
                    onChange={(e) => update("mac_address", e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">Manufacturer</label>
                <input
                    className={inputClass}
                    value={localDevice.manufacturer || ""}
                    onChange={(e) => update("manufacturer", e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">Model</label>
                <input
                    className={inputClass}
                    value={localDevice.model || ""}
                    onChange={(e) => update("model", e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">Location</label>
                <input
                    className={inputClass}
                    value={localDevice.location || ""}
                    onChange={(e) => update("location", e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">Description</label>
                <textarea
                    className={inputClass}
                    value={localDevice.description || ""}
                    onChange={(e) => update("description", e.target.value)}
                />
            </div>
        </div>
    );
};

export default DeviceForm;
