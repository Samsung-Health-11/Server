import { Router } from "express";
import HealthRouter from "./HealthRouter";

const router = Router();

router.use("/health", HealthRouter);

export default router;
