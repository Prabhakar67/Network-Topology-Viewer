import { describe, it, expect, vi, beforeEach } from "vitest";
import connectionService from "../services/connectionService";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("connectionService (frontend)", () => {

    it("getAll should call GET /connections and return data", async () => {
        (api.get as any).mockResolvedValue({
            data: [{ id: 1 }],
        });

        const result = await connectionService.getAll();

        expect(api.get).toHaveBeenCalledWith("/connections");
        expect(result).toEqual([{ id: 1 }]);
    });

    it("create should call POST /connections with data", async () => {
        const payload = { label: "A-B" };

        (api.post as any).mockResolvedValue({
            data: { id: 1, label: "A-B" },
        });

        const result = await connectionService.create(payload);

        expect(api.post).toHaveBeenCalledWith("/connections", payload);
        expect(result.id).toBe(1);
    });

    it("update should call PUT /connections/:id with data", async () => {
        const payload = { label: "Updated" };

        (api.put as any).mockResolvedValue({
            data: { id: 1, label: "Updated" },
        });

        const result = await connectionService.update(1, payload);

        expect(api.put).toHaveBeenCalledWith(
            "/connections/1",
            payload
        );
        expect(result.label).toBe("Updated");
    });

    it("delete should call DELETE /connections/:id", async () => {
        (api.delete as any).mockResolvedValue({
            data: { success: true },
        });

        const result = await connectionService.delete(1);

        expect(api.delete).toHaveBeenCalledWith("/connections/1");
        expect(result).toEqual({ success: true });
    });

});