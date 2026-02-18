import { useEffect, useState } from "react";

interface Props {
    device: any;
    onClose: () => void;
    onSave: (device: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const DeviceDrawer = ({ device, onClose, onSave, onDelete }: Props) => {
    const [localDevice, setLocalDevice] = useState<any>(device);

    // 🔥 sync when device changes
    useEffect(() => {
        if (device) {
            setLocalDevice(device);
        }
    }, [device]);

    // 🛑 VERY IMPORTANT GUARD
    if (!localDevice) return null;

    return (
        <div style={{ padding: 20 }}>
            <h3>Edit Device</h3>

            <input
                value={localDevice.name || ""}
                onChange={(e) =>
                    setLocalDevice({ ...localDevice, name: e.target.value })
                }
            />

            <select
                value={localDevice.status || "online"}
                onChange={(e) =>
                    setLocalDevice({ ...localDevice, status: e.target.value })
                }
            >
                <option value="online">Online</option>
                <option value="warning">Warning</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
            </select>

            <button onClick={() => onSave(localDevice)}>Save</button>

            {localDevice.id && (
                <button onClick={() => onDelete(localDevice.id)}>
                    Delete
                </button>
            )}

            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default DeviceDrawer;
