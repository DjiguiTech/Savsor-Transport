import { Router } from "express";
import { addQuote, listQuotes, patchQuoteStatus } from "./quotes.controller.js";

const router = Router();

router.get("/", listQuotes);
router.post("/", addQuote);
router.patch("/:id/status", patchQuoteStatus);

export default router;
