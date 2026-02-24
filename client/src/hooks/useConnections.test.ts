import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useConnections } from "../hooks/useConnections";
import connectionService from "../services/connectionService";

vi.mock("../services/connectionService", () => ({
    default: {
        getAll: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("useConnections hook", () => {

    it("should fetch connections on mount", async () => {
        (connectionService.getAll as any).mockResolvedValue([
            { id: 1 },
        ]);

        const { result } = renderHook(() => useConnections());

        expect(result.current.loading).toBe(true);
        expect(result.current.connections).toEqual([]);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(connectionService.getAll).toHaveBeenCalled();
        expect(result.current.connections).toEqual([{ id: 1 }]);
        expect(result.current.error).toBeNull();
    });

    it("should set error if fetching fails", async () => {
        (connectionService.getAll as any).mockRejectedValue(
            new Error("API error")
        );

        const { result } = renderHook(() => useConnections());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe(
            "Failed to fetch connections"
        );
        expect(result.current.connections).toEqual([]);
    });

    it("refresh should refetch connections", async () => {
        (connectionService.getAll as any)
            .mockResolvedValueOnce([{ id: 1 }])
            .mockResolvedValueOnce([{ id: 2 }]);

        const { result } = renderHook(() => useConnections());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.connections).toEqual([{ id: 1 }]);

        await act(async () => {
            await result.current.refresh();
        });

        expect(result.current.connections).toEqual([{ id: 2 }]);
        expect(connectionService.getAll).toHaveBeenCalledTimes(2);
    });

});