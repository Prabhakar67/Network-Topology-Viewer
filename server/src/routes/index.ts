import { Router } from "express";
import deviceRoutes from "./deviceRoutes";
import connectionRoutes from "./connectionRoutes"

const router = Router();

router.use("/devices", deviceRoutes);
router.use("/connections", connectionRoutes);

export default router;
