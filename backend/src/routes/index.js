import { Router } from "express";
import pool from "../db.js";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import contactsRoutes from "../modules/contacts/contacts.routes.js";
import quotesRoutes from "../modules/quotes/quotes.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      status: "ok",
      message: "Backend Node.js + PostgreSQL opérationnel",
      dbTime: result.rows[0]?.now ?? null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Impossible d'interroger PostgreSQL",
      details: error.message,
    });
  }
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/contacts", contactsRoutes);
router.use("/contact", contactsRoutes);
router.use("/quotes", quotesRoutes);
router.use("/devis", quotesRoutes);
router.use("/admin", adminRoutes);

export default router;
