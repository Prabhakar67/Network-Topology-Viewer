import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceFilters from "../DeviceFilters/DeviceFilters";

describe("DeviceFilters", () => {
    it("calls onSearch when typing in search input", () => {
        const onSearch = vi.fn();
        const onStatusFilter = vi.fn();

        render(
            <DeviceFilters
                onSearch={onSearch}
                onStatusFilter={onStatusFilter}
            />
        );

        const input = screen.getByPlaceholderText("Search device...");
        fireEvent.change(input, { target: { value: "router" } });

        expect(onSearch).toHaveBeenCalledWith("router");
    });

    it("updates input value when typing", () => {
        const onSearch = vi.fn();
        const onStatusFilter = vi.fn();

        render(
            <DeviceFilters
                onSearch={onSearch}
                onStatusFilter={onStatusFilter}
            />
        );

        const input = screen.getByPlaceholderText("Search device...");
        fireEvent.change(input, { target: { value: "switch" } });

        expect(input).toHaveValue("switch");
    });

    it("calls onStatusFilter when selecting status", () => {
        const onSearch = vi.fn();
        const onStatusFilter = vi.fn();

        render(
            <DeviceFilters
                onSearch={onSearch}
                onStatusFilter={onStatusFilter}
            />
        );

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "online" } });

        expect(onStatusFilter).toHaveBeenCalledWith("online");
    });

    it("updates select value when status changes", () => {
        const onSearch = vi.fn();
        const onStatusFilter = vi.fn();

        render(
            <DeviceFilters
                onSearch={onSearch}
                onStatusFilter={onStatusFilter}
            />
        );

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "offline" } });

        expect(select).toHaveValue("offline");
    });
});