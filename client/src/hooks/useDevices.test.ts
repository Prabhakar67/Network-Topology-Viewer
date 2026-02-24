import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useDevices } from "../hooks/useDevices";
import deviceService from "../services/deviceService";

vi.mock("../services/deviceService", () => ({
    default: {
        getAll: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("useDevices hook", () => {

    it("should fetch devices on mount", async () => {
        (deviceService.getAll as any).mockResolvedValue([
            { id: 1, name: "Router", status: "online" },
            { id: 2, name: "Switch", status: "offline" },
        ]);

        const { result } = renderHook(() => useDevices());

        expect(result.current.loading).toBe(true);
        expect(result.current.devices).toEqual([]);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(deviceService.getAll).toHaveBeenCalled();
        expect(result.current.devices.length).toBe(2);
        expect(result.current.filteredDevices.length).toBe(2);
    });

    it("should filter devices by search text", async () => {
        (deviceService.getAll as any).mockResolvedValue([
            { id: 1, name: "Router", status: "online" },
            { id: 2, name: "Switch", status: "offline" },
        ]);

        const { result } = renderHook(() => useDevices());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.setSearch("rout");
        });

        expect(result.current.filteredDevices).toEqual([
            { id: 1, name: "Router", status: "online" },
        ]);
    });

    it("should filter devices by status", async () => {
        (deviceService.getAll as any).mockResolvedValue([
            { id: 1, name: "Router", status: "online" },
            { id: 2, name: "Switch", status: "offline" },
        ]);

        const { result } = renderHook(() => useDevices());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.setStatusFilter("offline");
        });

        expect(result.current.filteredDevices).toEqual([
            { id: 2, name: "Switch", status: "offline" },
        ]);
    });

    it("should filter by search and status together", async () => {
        (deviceService.getAll as any).mockResolvedValue([
            { id: 1, name: "Router", status: "online" },
            { id: 2, name: "Router-2", status: "offline" },
            { id: 3, name: "Switch", status: "offline" },
        ]);

        const { result } = renderHook(() => useDevices());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.setSearch("router");
            result.current.setStatusFilter("offline");
        });

        expect(result.current.filteredDevices).toEqual([
            { id: 2, name: "Router-2", status: "offline" },
        ]);
    });

    it("refresh should refetch devices", async () => {
        (deviceService.getAll as any)
            .mockResolvedValueOnce([
                { id: 1, name: "Router", status: "online" },
            ])
            .mockResolvedValueOnce([
                { id: 2, name: "Firewall", status: "online" },
            ]);

        const { result } = renderHook(() => useDevices());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.devices).toEqual([
            { id: 1, name: "Router", status: "online" },
        ]);

        await act(async () => {
            await result.current.refresh();
        });

        expect(result.current.devices).toEqual([
            { id: 2, name: "Firewall", status: "online" },
        ]);
        expect(deviceService.getAll).toHaveBeenCalledTimes(2);
    });

});