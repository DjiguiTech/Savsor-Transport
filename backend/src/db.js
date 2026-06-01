import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

let pool;

if (databaseUrl) {
  // Use DATABASE_URL directly (from Render or other cloud providers)
  pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
} else {
  // Use individual env variables (for local development)
  pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || "savsor_transport",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
}

export async function checkDatabaseConnection() {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
  } catch (error) {
    throw error;
  }
}

export default pool;
