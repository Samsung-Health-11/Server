import { Router } from "express";
import { check } from "express-validator";
import { HealthController } from "../controllers";

const router: Router = Router();

// router.get("/", HealthController.getHealth);
router.get("/", HealthController.getAllHealth);
router.post("/weight", [check("weight").notEmpty()], HealthController.createWeight);
router.put("/water", [check("type").notEmpty()], HealthController.updateWater);

export default router;
