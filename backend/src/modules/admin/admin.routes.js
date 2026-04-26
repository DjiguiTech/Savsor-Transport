import { Router } from "express";
import { dashboardStats } from "./admin.controller.js";

const router = Router();

router.get("/dashboard-stats", dashboardStats);

export default router;
