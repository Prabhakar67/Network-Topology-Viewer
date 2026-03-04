import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./components/layout/Header/Header", () => ({
    default: () => <div data-testid="header">Header</div>,
}));

vi.mock("./components/topology/TopologyCanvas", () => ({
    default: () => <div data-testid="topology">TopologyCanvas</div>,
}));

vi.mock("react-hot-toast", () => ({
    Toaster: () => <div data-testid="toaster" />,
}));

describe("App", () => {
    it("renders Header component", () => {
        render(<App />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("renders TopologyCanvas component", () => {
        render(<App />);
        expect(screen.getByTestId("topology")).toBeInTheDocument();
    });

    it("renders Toaster component", () => {
        render(<App />);
        expect(screen.getByTestId("toaster")).toBeInTheDocument();
    });
});