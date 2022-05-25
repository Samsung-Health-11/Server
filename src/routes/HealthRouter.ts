import { Router } from "express";
import { HealthController } from "../controllers";
import { body } from "express-validator/check";

const router: Router = Router();

router.post('/weight', [
    body('weight.weight').notEmpty()
], HealthController.createHealth);

export default router;