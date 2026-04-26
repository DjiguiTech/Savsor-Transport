import crypto from "node:crypto";
import pool from "../../db.js";

export async function loginUser(email, password) {
  const result = await pool.query(
    `
      SELECT id, first_name AS "firstName", last_name AS "lastName", email, role, password_hash AS "passwordHash"
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  const user = result.rows[0];
  if (!user) {
    return null;
  }

  if (user.passwordHash !== password) {
    return null;
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    token: crypto.randomUUID(),
  };
}

export async function registerUser({ email, firstName, lastName, password }) {
  const result = await pool.query(
    `
      INSERT INTO users (email, first_name, last_name, password_hash, role)
      VALUES ($1, $2, $3, $4, 'admin')
      RETURNING id, email, first_name AS "firstName", last_name AS "lastName", role, created_at AS "createdAt"
    `,
    [email, firstName, lastName, password],
  );
  return result.rows[0];
}
