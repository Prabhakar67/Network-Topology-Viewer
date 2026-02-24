import { describe, it, expect, vi, beforeEach } from "vitest";
import deviceService from "../services/deviceService";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("deviceService (frontend)", () => {


    it("create should call POST /devices with data", async () => {
        const payload = { name: "Router" };

        (api.post as any).mockResolvedValue({
            data: { id: 1, name: "Router" },
        });

        const result = await deviceService.create(payload);

        expect(api.post).toHaveBeenCalledWith("/devices", payload);
        expect(result.id).toBe(1);
    });


    it("getAll should call GET /devices and return data", async () => {
        (api.get as any).mockResolvedValue({
            data: [{ id: 1 }],
        });

        const result = await deviceService.getAll();

        expect(api.get).toHaveBeenCalledWith("/devices");
        expect(result).toEqual([{ id: 1 }]);
    });

 
    it("getById should call GET /devices/:id", async () => {
        (api.get as any).mockResolvedValue({
            data: { id: 1, name: "Switch" },
        });

        const result = await deviceService.getById(1);

        expect(api.get).toHaveBeenCalledWith("/devices/1");
        expect(result.name).toBe("Switch");
    });


    it("updatePosition should call PATCH /devices/:id/updateDevice", async () => {
        (api.patch as any).mockResolvedValue({
            data: { id: 1, position_x: 10, position_y: 20 },
        });

        const result = await deviceService.updatePosition(1, 10, 20);

        expect(api.patch).toHaveBeenCalledWith(
            "/devices/1/updateDevice",
            { position_x: 10, position_y: 20 }
        );
        expect(result.position_x).toBe(10);
        expect(result.position_y).toBe(20);
    });


    it("update should call PUT /devices/:id with data", async () => {
        const payload = { name: "Firewall" };

        (api.put as any).mockResolvedValue({
            data: { id: 1, name: "Firewall" },
        });

        const result = await deviceService.update(1, payload);

        expect(api.put).toHaveBeenCalledWith("/devices/1", payload);
        expect(result.name).toBe("Firewall");
    });


    it("delete should call DELETE /devices/:id", async () => {
        (api.delete as any).mockResolvedValue({
            data: { success: true },
        });

        const result = await deviceService.delete(1);

        expect(api.delete).toHaveBeenCalledWith("/devices/1");
        expect(result).toEqual({ success: true });
    });

});