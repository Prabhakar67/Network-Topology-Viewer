import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceForm from "../DeviceForm/DeviceForm";

describe("DeviceForm", () => {
    const baseDevice = {
        name: "Router",
        type: "router",
        status: "online",
        ip_address: "192.168.1.1",
        mac_address: "AA:BB:CC",
        manufacturer: "Cisco",
        model: "XR500",
        location: "Rack 1",
        description: "Core router",
    };

    it("renders form fields with initial values", () => {
        render(<DeviceForm device={baseDevice} onChange={vi.fn()} />);

        expect(screen.getByDisplayValue("Router")).toBeInTheDocument();
        expect(screen.getByDisplayValue("router")).toBeInTheDocument();
        expect(screen.getByDisplayValue("online")).toBeInTheDocument();
        expect(screen.getByDisplayValue("192.168.1.1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("AA:BB:CC")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Cisco")).toBeInTheDocument();
        expect(screen.getByDisplayValue("XR500")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Rack 1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Core router")).toBeInTheDocument();
    });

    it("calls onChange when name is updated", () => {
        const onChange = vi.fn();
        render(<DeviceForm device={baseDevice} onChange={onChange} />);

        const input = screen.getByDisplayValue("Router");
        fireEvent.change(input, { target: { value: "Switch" } });

        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({ name: "Switch" })
        );
    });

    it("calls onChange when status is updated", () => {
        const onChange = vi.fn();
        render(<DeviceForm device={baseDevice} onChange={onChange} />);

        const select = screen.getByDisplayValue("online");
        fireEvent.change(select, { target: { value: "offline" } });

        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({ status: "offline" })
        );
    });

    it("updates local state when device prop changes", () => {
        const { rerender } = render(
            <DeviceForm device={baseDevice} onChange={vi.fn()} />
        );

        rerender(
            <DeviceForm
                device={{ ...baseDevice, name: "Firewall" }}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByDisplayValue("Firewall")).toBeInTheDocument();
    });
});