import { describe, it, expect, vi, beforeEach } from "vitest";

import {
    getAllConnections,
    createConnection,
    updateConnection,
    deleteConnection,
} from "../services/connectionService";

import { pool } from "../db";

vi.mock("../db", () => ({
    pool: {
        query: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("connectionService - unit tests", () => {

    it("getAllConnections should return rows", async () => {
        (pool.query as any).mockResolvedValue({
            rows: [{ id: 1 }],
        });

        const result = await getAllConnections();

        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM connections"
        );
        expect(result).toEqual([{ id: 1 }]);
    });

    it("createConnection should return inserted row", async () => {
        const input = {
            source_device_id: 1,
            target_device_id: 2,
            connection_type: "ethernet",
            bandwidth: "1Gbps",
            label: "A-B",
        };

        (pool.query as any).mockResolvedValue({
            rows: [{ id: 10, ...input }],
        });

        const result = await createConnection(input);

        expect(pool.query).toHaveBeenCalled();
        expect(result.id).toBe(10);
    });

    it("updateConnection should update label", async () => {
        (pool.query as any).mockResolvedValue({
            rows: [{ id: 1, label: "Updated" }],
        });

        const result = await updateConnection("1", "Updated");

        expect(pool.query).toHaveBeenCalled();
        expect(result.label).toBe("Updated");
    });

    it("deleteConnection should not throw error", async () => {
        (pool.query as any).mockResolvedValue({});

        await expect(deleteConnection("1")).resolves.not.toThrow();
    });

});