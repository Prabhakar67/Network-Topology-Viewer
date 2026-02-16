import { api } from "./api";
import type { Device } from "../types";

const deviceService = {
    getAll: async (): Promise<Device[]> => {
        const res = await api.get("/devices");
        return res.data;
    },

    updatePosition: async (
        id: number,
        position_x: number,
        position_y: number
    ) => {
        const res = await api.patch(`/devices/${id}/position`, {
            position_x,
            position_y,
        });

        return res.data;
    },
};

export default deviceService;
