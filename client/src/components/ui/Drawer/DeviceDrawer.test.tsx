import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceDrawer from "./DeviceDrawer";

vi.mock("../../devices/DeviceForm/DeviceForm", () => ({
    default: ({ device, onChange }: any) => (
        <div data-testid="device-form">
            <button onClick={() => onChange({ ...device, name: "Updated" })}>
                Update
            </button>
        </div>
    ),
}));

describe("DeviceDrawer", () => {
    const device = { id: 1, name: "Router" };

    it("returns null when device is not provided", () => {
        const { container } = render(
            <DeviceDrawer
                device={null}
                onClose={vi.fn()}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders edit title when device has id", () => {
        render(
            <DeviceDrawer
                device={device}
                onClose={vi.fn()}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText("Edit Device")).toBeInTheDocument();
    });

    it("renders add title when device has no id", () => {
        render(
            <DeviceDrawer
                device={{ name: "" }}
                onClose={vi.fn()}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText("Add Device")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();

        render(
            <DeviceDrawer
                device={device}
                onClose={onClose}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText("✕"));
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onSave when save button is clicked", () => {
        const onSave = vi.fn();

        render(
            <DeviceDrawer
                device={device}
                onClose={vi.fn()}
                onSave={onSave}
                onDelete={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText("Save"));
        expect(onSave).toHaveBeenCalled();
    });

    it("calls onDelete when delete button is clicked", () => {
        const onDelete = vi.fn();

        render(
            <DeviceDrawer
                device={device}
                onClose={vi.fn()}
                onSave={vi.fn()}
                onDelete={onDelete}
            />
        );

        fireEvent.click(screen.getByText("Delete"));
        expect(onDelete).toHaveBeenCalledWith(1);
    });

    it("updates local device state when form changes", () => {
        const onSave = vi.fn();

        render(
            <DeviceDrawer
                device={device}
                onClose={vi.fn()}
                onSave={onSave}
                onDelete={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText("Update"));
        fireEvent.click(screen.getByText("Save"));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({ name: "Updated" })
        );
    });
});