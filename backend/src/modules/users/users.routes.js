import { Router } from "express";
import { getUser, listUsers } from "./users.controller.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUser);

export default router;
