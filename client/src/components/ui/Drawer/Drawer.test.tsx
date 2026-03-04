import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Drawer from "./Drawer";

describe("Drawer", () => {
    it("renders children when open", () => {
        render(
            <Drawer open={true} onClose={vi.fn()}>
                <div>Drawer Content</div>
            </Drawer>
        );

        expect(screen.getByText("Drawer Content")).toBeInTheDocument();
    });

    it("calls onClose when overlay is clicked", () => {
        const onClose = vi.fn();

        const { container } = render(
            <Drawer open={true} onClose={onClose}>
                <div>Content</div>
            </Drawer>
        );

        const overlay = container.querySelector(".bg-black\\/40") as HTMLElement;
        fireEvent.click(overlay);

        expect(onClose).toHaveBeenCalled();
    });

    it("does not call onClose when drawer panel is clicked", () => {
        const onClose = vi.fn();

        const { container } = render(
            <Drawer open={true} onClose={onClose}>
                <div>Content</div>
            </Drawer>
        );

        const panel = container.querySelector(".bg-white") as HTMLElement;
        fireEvent.click(panel);

        expect(onClose).not.toHaveBeenCalled();
    });

    it("applies invisible class when closed", () => {
        const { container } = render(
            <Drawer open={false} onClose={vi.fn()}>
                <div>Content</div>
            </Drawer>
        );

        expect(container.firstChild).toHaveClass("invisible");
    });
});