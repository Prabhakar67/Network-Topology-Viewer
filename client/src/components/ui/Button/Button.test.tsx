import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonComponent from "./Button";

describe("ButtonComponent", () => {
    it("renders button with given title", () => {
        render(
            <ButtonComponent
                title="Add Device"
                onAddDevice={vi.fn()}
                onSearch={vi.fn()}
                onStatusFilter={vi.fn()}
            />
        );

        expect(screen.getByRole("button", { name: "Add Device" })).toBeInTheDocument();
    });

    it("calls onAddDevice when button is clicked", () => {
        const onAddDevice = vi.fn();

        render(
            <ButtonComponent
                title="Add Device"
                onAddDevice={onAddDevice}
                onSearch={vi.fn()}
                onStatusFilter={vi.fn()}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: "Add Device" }));

        expect(onAddDevice).toHaveBeenCalledTimes(1);
    });

    it("renders correct title text", () => {
        render(
            <ButtonComponent
                title="Create"
                onAddDevice={vi.fn()}
                onSearch={vi.fn()}
                onStatusFilter={vi.fn()}
            />
        );

        expect(screen.getByText("Create")).toBeInTheDocument();
    });
});