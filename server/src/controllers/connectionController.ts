import { Request, Response } from "express";
import * as connectionService from "../services/connectionService";

export const getConnections = async (req: Request, res: Response) => {
    try {
        const connections = await connectionService.getAllConnections();
        res.json(connections);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch connections" });
    }
};

export const createConnection = async (req: Request, res: Response) => {
    try {
        const connection = await connectionService.createConnection(req.body);
        res.status(201).json(connection);
    } catch (error) {
        res.status(500).json({ error: "Failed to create connection" });
    }
};

export const deleteConnection = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await connectionService.deleteConnection(id);
        res.json({ message: "Connection deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete connection" });
    }
};
