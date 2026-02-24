import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header/Header";

describe("Header", () => {
    it("renders default title when no title prop is provided", () => {
        render(<Header />);

        expect(
            screen.getByText("Network Topology Viewer")
        ).toBeInTheDocument();
        expect(screen.getByText("NT")).toBeInTheDocument();
    });

    it("renders custom title when title prop is provided", () => {
        render(<Header title="My Dashboard" />);

        expect(screen.getByText("My Dashboard")).toBeInTheDocument();
    });
});