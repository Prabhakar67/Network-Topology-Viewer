
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TopologyCanvas from "../TopologyCanvas/TopologyCanvas";

vi.mock("reactflow", () => ({
    default: () => <div data-testid="reactflow" />,
    Background: () => <div />,
    Controls: () => <div />,
    applyNodeChanges: vi.fn(),
}));

vi.mock("../../../hooks/useDevices", () => ({
    useDevices: () => ({
        devices: [],
        refresh: vi.fn(),
    }),
}));

vi.mock("../../../hooks/useConnections", () => ({
    useConnections: () => ({
        connections: [],
        refresh: vi.fn(),
    }),
}));

vi.mock("../../layout/DeviceList/DeviceList", () => ({
    default: ({ open }: any) =>
        open ? <div data-testid="DeviceList">DeviceList</div> : null,
}));

vi.mock("../../devices/DeviceFilters", () => ({
    default: () => <div data-testid="filters" />,
}));

vi.mock("../../ui/Button/Button", () => ({
    default: ({ onAddDevice }: any) => (
        <button onClick={onAddDevice}>Add Device</button>
    ),
}));

vi.mock("../../ui/Drawer/Drawer", () => ({
    default: ({ open, children }: any) =>
        open ? <div data-testid="drawer">{children}</div> : null,
}));

vi.mock("../../ui/Drawer/DeviceDrawer", () => ({
    default: () => <div data-testid="device-drawer" />,
}));

vi.mock("../../ui/Drawer/ConnectionDrawer", () => ({
    default: () => <div data-testid="connection-drawer" />,
}));

vi.mock("../../../services/deviceService", () => ({
    default: {
        getById: vi.fn(),
        updatePosition: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock("../../../services/connectionService", () => ({
    default: {
        update: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock("../../ui/Toast/toast", () => ({
    notify: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("TopologyCanvas", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders ReactFlow canvas", () => {
        render(<TopologyCanvas />);
        expect(screen.getByTestId("reactflow")).toBeInTheDocument();
    });

    it("renders device filters", () => {
        render(<TopologyCanvas />);
        expect(screen.getByTestId("filters")).toBeInTheDocument();
    });

    it("opens DeviceList when menu button is clicked", () => {
        render(<TopologyCanvas />);
        fireEvent.click(screen.getByText("☰"));
        expect(screen.getByTestId("DeviceList")).toBeInTheDocument();
    });

    it("opens device drawer when Add Device button is clicked", () => {
        render(<TopologyCanvas />);
        fireEvent.click(screen.getByText("Add Device"));
        expect(screen.getByTestId("drawer")).toBeInTheDocument();
    });
});

