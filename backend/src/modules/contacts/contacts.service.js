import pool from "../../db.js";

export async function createContact(payload) {
  const query = `
    INSERT INTO contacts (name, email, phone, topic, message, accept_privacy)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, phone, topic, message, accept_privacy AS "acceptPrivacy", created_at AS "createdAt"
  `;
  const values = [
    payload.name,
    payload.email,
    payload.phone,
    payload.topic,
    payload.message,
    payload.acceptPrivacy,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getContacts() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      email,
      phone,
      topic,
      message,
      accept_privacy AS "acceptPrivacy",
      created_at AS "createdAt"
    FROM contacts
    ORDER BY created_at DESC
  `);
  return result.rows;
}
