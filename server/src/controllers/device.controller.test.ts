import { describe, it, expect, vi, beforeEach } from "vitest";
import * as deviceController from "../controllers/deviceController";
import * as deviceService from "../services/deviceService";

vi.mock("../services/deviceService");

const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("deviceController - unit tests", () => {


    it("should return devices", async () => {
        const req: any = {};
        const res = mockResponse();

        (deviceService.getAllDevices as any).mockResolvedValue([{ id: 1 }]);

        await deviceController.getDevices(req, res);

        expect(deviceService.getAllDevices).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });

    it("should return 500 if getDevices fails", async () => {
        const req: any = {};
        const res = mockResponse();

        (deviceService.getAllDevices as any).mockRejectedValue(new Error());

        await deviceController.getDevices(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to fetch devices",
        });
    });


    it("should create device", async () => {
        const req: any = { body: { name: "Router" } };
        const res = mockResponse();

        (deviceService.createDevice as any).mockResolvedValue({ id: 1 });

        await deviceController.createDevice(req, res);

        expect(deviceService.createDevice).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it("should return 500 if createDevice fails", async () => {
        const req: any = { body: {} };
        const res = mockResponse();

        (deviceService.createDevice as any).mockRejectedValue(new Error());

        await deviceController.createDevice(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to create device",
        });
    });

  
    it("should delete device", async () => {
        const req: any = { params: { id: "1" } };
        const res = mockResponse();

        (deviceService.deleteDevice as any).mockResolvedValue(undefined);

        await deviceController.deleteDevice(req, res);

        expect(deviceService.deleteDevice).toHaveBeenCalledWith("1");
        expect(res.json).toHaveBeenCalledWith({
            message: "Device deleted successfully",
        });
    });

    it("should update device", async () => {
        const req: any = {
            params: { id: "1" },
            body: { name: "Switch" },
        };
        const res = mockResponse();

        (deviceService.updateDevice as any).mockResolvedValue({
            id: 1,
            name: "Switch",
        });

        await deviceController.updateDevice(req, res);

        expect(deviceService.updateDevice).toHaveBeenCalledWith(
            "1",
            req.body
        );
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: "Switch",
        });
    });

 
    it("should update device position", async () => {
        const req: any = {
            params: { id: "1" },
            body: { position_x: 10, position_y: 20 },
        };
        const res = mockResponse();

        (deviceService.updateDevicePosition as any).mockResolvedValue({
            id: 1,
            position_x: 10,
            position_y: 20,
        });

        await deviceController.updateDevicePosition(req, res);

        expect(deviceService.updateDevicePosition).toHaveBeenCalledWith(
            "1",
            10,
            20
        );
        expect(res.json).toHaveBeenCalled();
    });


    it("should return device by id", async () => {
        const req: any = { params: { id: "1" } };
        const res = mockResponse();

        (deviceService.getDeviceById as any).mockResolvedValue({
            id: 1,
        });

        await deviceController.getDeviceById(req, res);

        expect(deviceService.getDeviceById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it("should return 400 if id is invalid", async () => {
        const req: any = { params: { id: "abc" } };
        const res = mockResponse();

        await deviceController.getDeviceById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid device id",
        });
    });

    it("should return 404 if device not found", async () => {
        const req: any = { params: { id: "1" } };
        const res = mockResponse();

        (deviceService.getDeviceById as any).mockResolvedValue(null);

        await deviceController.getDeviceById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Device not found",
        });
    });

});