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

        expect(screen.getByLabelText("Name")).toHaveValue("Router");
        expect(screen.getByLabelText("Type")).toHaveValue("router");
        expect(screen.getByLabelText("Status")).toHaveValue("online");
    });

    it("calls onChange when name is updated", () => {
        const onChange = vi.fn();
        render(<DeviceForm device={baseDevice} onChange={onChange} />);

        const input = screen.getByLabelText("Name");
        fireEvent.change(input, { target: { value: "Switch" } });

        expect(onChange).toHaveBeenCalled();
    });

    it("calls onChange when status is updated", () => {
        const onChange = vi.fn();
        render(<DeviceForm device={baseDevice} onChange={onChange} />);

        const select = screen.getByLabelText("Status");
        fireEvent.change(select, { target: { value: "offline" } });

        expect(onChange).toHaveBeenCalled();
    });
});