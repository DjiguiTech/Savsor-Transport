import { Router } from "express";
import {
  submitReview,
  listPublicReviews,
  listAllReviews,
  approveReview,
  rejectReview,
  removeReview,
} from "./reviews.controller.js";

const router = Router();

// Public routes
router.get("/public", listPublicReviews);
router.post("/", submitReview);

// Admin routes (à protéger avec middleware d'authentification si nécessaire)
router.get("/", listAllReviews);
router.put("/:id/approve", approveReview);
router.put("/:id/reject", rejectReview);
router.delete("/:id", removeReview);

export default router;
