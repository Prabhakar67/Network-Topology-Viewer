import { describe, it, expect, vi, beforeEach } from "vitest";

import {
    getAllDevices,
    createDevice,
    deleteDevice,
    updateDevice,
    updateDevicePosition,
    getDeviceById,
} from "./deviceService";

import { pool } from "../db";


vi.mock("../db", () => ({
    pool: {
        query: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("deviceService - unit tests", () => {

    it("getAllDevices should return rows", async () => {
        (pool.query as any).mockResolvedValue({
            rows: [{ id: 1 }],
        });

        const result = await getAllDevices();

        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM devices"
        );
        expect(result).toEqual([{ id: 1 }]);
    });

 
    it("createDevice should return inserted device", async () => {
        const input = {
            name: "Router",
            type: "network",
            status: "online",
            ip_address: "192.168.1.1",
            mac_address: "AA:BB:CC",
            manufacturer: "Cisco",
            model: "XR500",
            location: "Rack 1",
            description: "Core router",
            position_x: 100,
            position_y: 200,
        };

        (pool.query as any).mockResolvedValue({
            rows: [{ id: 10, name: "Router" }],
        });

        const result = await createDevice(input);

        expect(pool.query).toHaveBeenCalled();
        expect(result.id).toBe(10);
        expect(result.name).toBe("Router");
    });


    it("deleteDevice should not throw error", async () => {
        (pool.query as any).mockResolvedValue({});

        await expect(deleteDevice("1")).resolves.not.toThrow();

        expect(pool.query).toHaveBeenCalledWith(
            "DELETE FROM devices WHERE id = $1",
            ["1"]
        );
    });

    it("updateDevice should return updated device", async () => {
        const input = {
            name: "Switch",
            type: "network",
            status: "offline",
            ip_address: "192.168.1.2",
            mac_address: "DD:EE:FF",
            manufacturer: "HP",
            model: "2920",
            location: "Rack 2",
            description: "Access switch",
            position_x: 300,
            position_y: 400,
        };

        (pool.query as any).mockResolvedValue({
            rows: [{ id: 1, name: "Switch", status: "offline" }],
        });

        const result = await updateDevice("1", input);

        expect(pool.query).toHaveBeenCalled();
        expect(result.name).toBe("Switch");
        expect(result.status).toBe("offline");
    });

    it("updateDevicePosition should update x and y", async () => {
        (pool.query as any).mockResolvedValue({
            rows: [{ id: 1, position_x: 500, position_y: 600 }],
        });

        const result = await updateDevicePosition("1", 500, 600);

        expect(pool.query).toHaveBeenCalled();
        expect(result.position_x).toBe(500);
        expect(result.position_y).toBe(600);
    });

    it("getDeviceById should return single device", async () => {
        (pool.query as any).mockResolvedValue({
            rows: [{ id: 1, name: "Firewall" }],
        });

        const result = await getDeviceById(1);

        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM devices WHERE id = $1",
            [1]
        );
        expect(result.id).toBe(1);
        expect(result.name).toBe("Firewall");
    });

});