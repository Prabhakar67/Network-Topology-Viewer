import { api } from "./api";
import type { Device } from "../types";

const deviceService = {

    create: async (data: Partial<Device>) => {
        const res = await api.post("/devices", data);
        return res.data;
    },


    getAll: async (): Promise<Device[]> => {
        const res = await api.get("/devices");
        return res.data;
    },

    getById: async (id: number) => {
        const res = await api.get(`/devices/${id}`);
        return res.data;
    },

    updatePosition: async (
        id: number,
        position_x: number,
        position_y: number
    ) => {
        const res = await api.patch(`/devices/${id}/updateDevice`, {
            position_x,
            position_y,
        });

        return res.data;
    },

    // UPDATE DEVICE (PUT)
    update: async (id: number, data: Partial<Device>) => {
        const res = await api.put(`/devices/${id}`, data);
        return res.data;
    },

    // DELETE DEVICE
    delete: async (id: number) => {
        const res = await api.delete(`/devices/${id}`);
        return res.data;
    },
};

export default deviceService;
