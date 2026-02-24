import { describe, it, expect, vi, beforeEach } from "vitest";
import * as connectionController from "./connectionController";
import * as connectionService from "../services/connectionService";

// 👉 service mock
vi.mock("../services/connectionService");

const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("connectionController - unit tests", () => {

    it("should return connections", async () => {
        const req: any = {};
        const res = mockResponse();

        (connectionService.getAllConnections as any).mockResolvedValue([
            { id: 1 },
        ]);

        await connectionController.getConnections(req, res);

        expect(connectionService.getAllConnections).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });

    it("should return 500 if getConnections fails", async () => {
        const req: any = {};
        const res = mockResponse();

        (connectionService.getAllConnections as any).mockRejectedValue(
            new Error()
        );

        await connectionController.getConnections(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to fetch connections",
        });
    });

    it("should create connection", async () => {
        const req: any = { body: { label: "A-B" } };
        const res = mockResponse();

        (connectionService.createConnection as any).mockResolvedValue({
            id: 1,
        });

        await connectionController.createConnection(req, res);

        expect(connectionService.createConnection).toHaveBeenCalledWith(
            req.body
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it("should return 500 if createConnection fails", async () => {
        const req: any = { body: {} };
        const res = mockResponse();

        (connectionService.createConnection as any).mockRejectedValue(
            new Error()
        );

        await connectionController.createConnection(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to create connection",
        });
    });

    it("should update connection and return message", async () => {
        const req: any = {
            params: { id: "1" },
            body: { label: "Updated" },
        };
        const res = mockResponse();

        (connectionService.updateConnection as any).mockResolvedValue({
            id: 1,
            label: "Updated",
        });

        await connectionController.updateConnection(req, res);

        expect(connectionService.updateConnection).toHaveBeenCalledWith(
            "1",
            "Updated"
        );
        expect(res.json).toHaveBeenCalled();
    });

    it("should return 404 if connection not found", async () => {
        const req: any = {
            params: { id: "1" },
            body: { label: "Updated" },
        };
        const res = mockResponse();

        (connectionService.updateConnection as any).mockResolvedValue(
            null
        );

        await connectionController.updateConnection(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Connection not found",
        });
    });

    it("should return 500 if updateConnection fails", async () => {
        const req: any = {
            params: { id: "1" },
            body: { label: "Updated" },
        };
        const res = mockResponse();

        (connectionService.updateConnection as any).mockRejectedValue(
            new Error()
        );

        await connectionController.updateConnection(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to update connection",
        });
    });

    it("should delete connection", async () => {
        const req: any = { params: { id: "1" } };
        const res = mockResponse();

        (connectionService.deleteConnection as any).mockResolvedValue(
            undefined
        );

        await connectionController.deleteConnection(req, res);

        expect(connectionService.deleteConnection).toHaveBeenCalledWith(
            "1"
        );
        expect(res.json).toHaveBeenCalledWith({
            message: "Connection deleted successfully",
        });
    });

    it("should return 500 if deleteConnection fails", async () => {
        const req: any = { params: { id: "1" } };
        const res = mockResponse();

        (connectionService.deleteConnection as any).mockRejectedValue(
            new Error()
        );

        await connectionController.deleteConnection(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to delete connection",
        });
    });

});