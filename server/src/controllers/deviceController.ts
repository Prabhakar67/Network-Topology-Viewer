import { Request, Response } from "express";
import * as deviceService from "../services/deviceService";

export const getDevices = async (req: Request, res: Response) => {
    try {
        const devices = await deviceService.getAllDevices();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch devices" });
    }
};

export const createDevice = async (req: Request, res: Response) => {
    try {
        const device = await deviceService.createDevice(req.body);
        res.status(201).json(device);
    } catch (error) {
        res.status(500).json({ error: "Failed to create device" });
    }
};

export const deleteDevice = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await deviceService.deleteDevice(id);
        res.json({ message: "Device deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete device" });
    }
};


export const updateDevice = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const device = await deviceService.updateDevice(
            id,
            req.body
        );
        res.json(device);
    } catch (error) {
        res.status(500).json({ error: "Failed to update device" });
    }
};

export const updateDevicePosition = async (req: Request, res: Response) => {
    try {
        const { position_x, position_y } = req.body;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const device = await deviceService.updateDevicePosition(
            id,
            position_x,
            position_y
        );

        res.json(device);
    } catch (error) {
        res.status(500).json({ error: "Failed to update position" });
    }
};



export const getDeviceById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid device id" });
        }

        const device = await deviceService.getDeviceById(id);

        if (!device) {
            return res.status(404).json({ error: "Device not found" });
        }

        res.json(device);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch device" });
    }
};
