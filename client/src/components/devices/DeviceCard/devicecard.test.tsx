import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceCard from "../DeviceCard/DeviceCard";

vi.mock("../DeviceDetails/DeviceDetails", () => ({
    default: ({ device, onClose }: any) => (
        <div data-testid="device-details">
            <span>{device.name}</span>
            <button onClick={onClose}>Close</button>
        </div>
    ),
}));

describe("DeviceCard component", () => {

    const mockDevice = {
        id: 1,
        name: "Router",
        status: "online",
    };

    it("should render device name and status", () => {
        render(<DeviceCard device={mockDevice} />);

        expect(screen.getByText("Router")).toBeInTheDocument();
        expect(screen.getByText("online")).toBeInTheDocument();
    });

    it("should apply green class for online status", () => {
        render(<DeviceCard device={mockDevice} />);

        const statusBadge = screen.getByText("online");
        expect(statusBadge.className).toContain("bg-green-100");
    });

    it("should show and hide details on button click", () => {
        render(<DeviceCard device={mockDevice} />);

        const button = screen.getByText("Details");

        expect(screen.queryByTestId("device-details")).toBeNull();

        fireEvent.click(button);

        expect(screen.getByTestId("device-details")).toBeInTheDocument();
        expect(screen.getByText("Hide")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Hide"));

        expect(screen.queryByTestId("device-details")).toBeNull();
    });


    it("should close details when onClose is triggered", () => {
        render(<DeviceCard device={mockDevice} />);

        fireEvent.click(screen.getByText("Details"));

        expect(screen.getByTestId("device-details")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Close"));

        expect(screen.queryByTestId("device-details")).toBeNull();
    });

});