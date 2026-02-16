import { api } from "./api";
import type { Connection } from "../types";

const connectionService = {
    getAll: async (): Promise<Connection[]> => {
        const response = await api.get("/connections");
        return response.data;
    },

    create: async (data: Partial<Connection>) => {
        const response = await api.post("/connections", data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/connections/${id}`);
        return response.data;
    },
};

export default connectionService;
