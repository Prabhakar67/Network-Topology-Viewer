import { Router } from "express";
import * as deviceController from "../controllers/deviceController";

const router = Router();

router.get("/", deviceController.getDevices);
router.get("/:id", deviceController.getDeviceById);
router.post("/", deviceController.createDevice);
router.delete("/:id", deviceController.deleteDevice);
router.put("/:id", deviceController.updateDevice);
router.patch("/:id/updateDevice", deviceController.updateDevicePosition);


export default router;
