import { useEffect, useState } from "react";
import deviceService from "../services/deviceService";
import type { Device } from "../types";

export const useDevices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDevices = async () => {
        try {
            const data = await deviceService.getAll(); // ✅ correct
            setDevices(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return {
        devices,
        loading,
        refresh: fetchDevices,
    };
};
