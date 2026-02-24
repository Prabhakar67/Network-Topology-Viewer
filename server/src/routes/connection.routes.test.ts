import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

import router from "../routes/connectionRoutes";
import * as connectionController from "../controllers/connectionController";

vi.mock("../controllers/connectionController", () => ({
    getConnections: vi.fn((req, res) => res.status(200).json([])),
    createConnection: vi.fn((req, res) => res.status(201).json({ id: 1 })),
    updateConnection: vi.fn((req, res) => res.status(200).json({ id: 1 })),
    deleteConnection: vi.fn((req, res) => res.status(204).send()),
}));

beforeEach(() => {
    vi.clearAllMocks();
});


const app = express();
app.use(express.json());
app.use("/connections", router);

describe("Connection Routes", () => {

    it("GET /connections should call getConnections controller", async () => {
        await request(app).get("/connections");

        expect(connectionController.getConnections).toHaveBeenCalled();
    });


    it("POST /connections should call createConnection controller", async () => {
        await request(app)
            .post("/connections")
            .send({ source_device_id: 1 });

        expect(connectionController.createConnection).toHaveBeenCalled();
    });

    it("PUT /connections/:id should call updateConnection controller", async () => {
        await request(app)
            .put("/connections/1")
            .send({ label: "Updated" });

        expect(connectionController.updateConnection).toHaveBeenCalled();
    });


    it("DELETE /connections/:id should call deleteConnection controller", async () => {
        await request(app).delete("/connections/1");

        expect(connectionController.deleteConnection).toHaveBeenCalled();
    });

});