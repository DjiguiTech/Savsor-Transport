import dotenv from "dotenv";
import app from "./app.js";
import { checkDatabaseConnection } from "./db.js";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

app.listen(PORT, async () => {
  try {
    await checkDatabaseConnection();
    console.log(`API backend démarrée sur http://localhost:${PORT}`);
    console.log("Connexion PostgreSQL réussie.");
  } catch (error) {
    console.error("Échec de connexion PostgreSQL:", error.message);
  }
});
