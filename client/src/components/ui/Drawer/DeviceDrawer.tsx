

import { useEffect, useState } from "react";
import DeviceForm from "../../devices/DeviceForm/DeviceForm";
import ButtonComponent from "../Button/Button";

interface Props {
    device: any;
    onClose: () => void;
    onSave: (device: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const DeviceDrawer = ({ device, onClose, onSave, onDelete }: Props) => {
    const [localDevice, setLocalDevice] = useState<any>(device);

    useEffect(() => {
        if (device) setLocalDevice(device);
    }, [device]);

    if (!localDevice) return null;

    return (
        <div className="fixed top-0 right-0 z-50 h-screen w-[340px] border-l border-gray-300 bg-white p-4 overflow-y-auto">

            <div className="mb-4 flex items-center">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                    {localDevice.id ? "Edit Device" : "Add Device"}
                </h3>

                <button
                    onClick={onClose}
                    className="ml-auto rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                >
                    ✕
                </button>
            </div>

            {/* FORM */}
            <DeviceForm
                device={localDevice}
                onChange={(d) => setLocalDevice(d)}
            />

            {/* ACTIONS */}
            <div className="mt-4 flex gap-2">
                <ButtonComponent
                    title="Save"
                    onClick={() => onSave(localDevice)}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-1 text-sm"
                />

                {localDevice.id && (
                    <ButtonComponent
                        title="Delete"
                        onClick={() => onDelete(localDevice.id)}
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 text-sm"
                    />
                )}

            </div>
        </div>
    );
};

export default DeviceDrawer;
