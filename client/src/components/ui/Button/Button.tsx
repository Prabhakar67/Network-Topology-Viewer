import React from "react";
import deviceService from "../../../services/deviceService";
import { useState } from "react";

type Device = {
    name: string;
    type: "router" | "switch" | "firewall" | "server" | "access_point" | "endpoint";
    status: "online" | "offline" | "warning" | "maintenance";
    ip_address: string;
    position_x: number;
    position_y: number;
};

type Props = {
    setSelectedDevice: (device: Device) => void;
};



const AddDeviceButton: React.FC<Props> = () => {
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const handleAddDevice = () => {
        setSelectedDevice({
            name: "",
            type: "server",
            status: "online",
            ip_address: "",
            position_x: 200,
            position_y: 200,
        });
    };

    return (
        <button
            style={{
                position: "absolute",
                top: 20,
                left: 20,
                zIndex: 1000,
                padding: "8px 12px",
            }}
            onClick={handleAddDevice}
        >
            Add Device
        </button>
    );
};

export default AddDeviceButton;
