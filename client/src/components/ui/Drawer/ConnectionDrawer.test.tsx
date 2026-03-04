import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ConnectionDrawer from "./ConnectionDrawer";

vi.mock("../../connections/ConnectionForm", () => ({
    default: ({ edge }: any) => (
        <div data-testid="connection-form">{edge?.id}</div>
    ),
}));

describe("ConnectionDrawer", () => {
    const edge = { id: 1 };

    it("returns null when edge is not provided", () => {
        const { container } = render(
            <ConnectionDrawer
                edge={null}
                onClose={vi.fn()}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders drawer with title and form", () => {
        render(
            <ConnectionDrawer
                edge={edge}
                onClose={vi.fn()}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText("Edit Connection")).toBeInTheDocument();
        expect(screen.getByTestId("connection-form")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();

        render(
            <ConnectionDrawer
                edge={edge}
                onClose={onClose}
                onSave={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText("✕"));

        expect(onClose).toHaveBeenCalled();
    });
});