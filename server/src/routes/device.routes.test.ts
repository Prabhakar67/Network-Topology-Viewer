import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

import router from "../routes/deviceRoutes";
import * as deviceController from "../controllers/deviceController";


vi.mock("../controllers/deviceController", () => ({
    getDevices: vi.fn((req, res) => res.status(200).json([])),
    getDeviceById: vi.fn((req, res) => res.status(200).json({ id: 1 })),
    createDevice: vi.fn((req, res) => res.status(201).json({ id: 1 })),
    deleteDevice: vi.fn((req, res) => res.status(204).send()),
    updateDevice: vi.fn((req, res) => res.status(200).json({ id: 1 })),
    updateDevicePosition: vi.fn((req, res) =>
        res.status(200).json({ id: 1, position_x: 10, position_y: 20 })
    ),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

const app = express();
app.use(express.json());
app.use("/devices", router);

describe("Device Routes", () => {

    it("GET /devices should call getDevices controller", async () => {
        await request(app).get("/devices");

        expect(deviceController.getDevices).toHaveBeenCalled();
    });

    it("GET /devices/:id should call getDeviceById controller", async () => {
        await request(app).get("/devices/1");

        expect(deviceController.getDeviceById).toHaveBeenCalled();
    });

    it("POST /devices should call createDevice controller", async () => {
        await request(app)
            .post("/devices")
            .send({ name: "Router" });

        expect(deviceController.createDevice).toHaveBeenCalled();
    });

    it("DELETE /devices/:id should call deleteDevice controller", async () => {
        await request(app).delete("/devices/1");

        expect(deviceController.deleteDevice).toHaveBeenCalled();
    });

    it("PUT /devices/:id should call updateDevice controller", async () => {
        await request(app)
            .put("/devices/1")
            .send({ name: "Switch" });

        expect(deviceController.updateDevice).toHaveBeenCalled();
    });

    it("PATCH /devices/:id/updateDevice should call updateDevicePosition controller", async () => {
        await request(app)
            .patch("/devices/1/updateDevice")
            .send({ position_x: 10, position_y: 20 });

        expect(deviceController.updateDevicePosition).toHaveBeenCalled();
    });

});