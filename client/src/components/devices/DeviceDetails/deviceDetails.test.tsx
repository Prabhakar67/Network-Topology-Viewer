import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceDetails from "../DeviceDetails/DeviceDetails";

describe("DeviceDetails", () => {
    const device = {
        id: 1,
        name: "Router",
        status: "online",
        ip_address: "192.168.1.1",
        created_at: "2024-01-01",
        position_x: 100,
        position_y: 200,
    };

    it("renders visible device fields with formatted labels", () => {
        render(<DeviceDetails device={device} onClose={vi.fn()} />);

        expect(screen.getByText("Device Details")).toBeInTheDocument();
        expect(screen.getByText("Name:")).toBeInTheDocument();
        expect(screen.getByText("Router")).toBeInTheDocument();
        expect(screen.getByText("Status:")).toBeInTheDocument();
        expect(screen.getByText("online")).toBeInTheDocument();
        expect(screen.getByText("Ip Address:")).toBeInTheDocument();
        expect(screen.getByText("192.168.1.1")).toBeInTheDocument();
    });

    it("does not render hidden fields", () => {
        render(<DeviceDetails device={device} onClose={vi.fn()} />);

        expect(screen.queryByText("Id:")).toBeNull();
        expect(screen.queryByText("Created At:")).toBeNull();
        expect(screen.queryByText("Position X:")).toBeNull();
        expect(screen.queryByText("Position Y:")).toBeNull();
    });

    it("renders dash for null or undefined values", () => {
        render(
            <DeviceDetails
                device={{ name: null, status: undefined }}
                onClose={vi.fn()}
            />
        );

        expect(screen.getAllByText("-").length).toBe(2);
    });

    it("calls onClose when Close button is clicked", () => {
        const onClose = vi.fn();
        render(<DeviceDetails device={device} onClose={onClose} />);

        fireEvent.click(screen.getByText("Close"));
        expect(onClose).toHaveBeenCalled();
    });

    it("returns null when device is not provided", () => {
        const { container } = render(
            <DeviceDetails device={null as any} onClose={vi.fn()} />
        );

        expect(container.firstChild).toBeNull();
    });
});