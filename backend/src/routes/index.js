import { Router } from "express";
import pool from "../db.js";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import contactsRoutes from "../modules/contacts/contacts.routes.js";
import quotesRoutes from "../modules/quotes/quotes.routes.js";
import reviewsRoutes from "../modules/reviews/reviews.routes.js";
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
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: "Impossible d'interroger PostgreSQL",
      details: error.message || error.toString(),
      code: error.code,
    });
  }
});

router.get("/config", (_req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL ? "✓ Définie" : "✗ Non définie",
    dbHost: process.env.DB_HOST || "non défini",
    dbPort: process.env.DB_PORT || "non défini",
    dbName: process.env.DB_NAME || "non défini",
    dbUser: process.env.DB_USER || "non défini",
  });
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/contacts", contactsRoutes);
router.use("/contact", contactsRoutes);
router.use("/quotes", quotesRoutes);
router.use("/devis", quotesRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/admin", adminRoutes);

export default router;
