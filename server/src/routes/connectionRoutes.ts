import { Router } from "express";
import * as connectionController from "../controllers/connectionController";

const router = Router();

router.get("/", connectionController.getConnections);
router.post("/", connectionController.createConnection);
router.put("/:id", connectionController.updateConnection);
router.delete("/:id", connectionController.deleteConnection);

export default router;
