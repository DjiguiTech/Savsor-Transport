import { Router } from "express";
import { addContact, listContacts } from "./contacts.controller.js";

const router = Router();

router.get("/", listContacts);
router.post("/", addContact);

export default router;
