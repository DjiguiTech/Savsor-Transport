import pool from "../../db.js";

export async function getUsers() {
  const result = await pool.query(`
    SELECT id, first_name AS "firstName", last_name AS "lastName", email, role, created_at AS "createdAt"
    FROM users
    ORDER BY created_at DESC
  `);
  return result.rows;
}

export async function getUserById(id) {
  const result = await pool.query(
    `
      SELECT id, first_name AS "firstName", last_name AS "lastName", email, role, created_at AS "createdAt"
      FROM users
      WHERE id = $1
    `,
    [Number(id)],
  );
  return result.rows[0] ?? null;
}
