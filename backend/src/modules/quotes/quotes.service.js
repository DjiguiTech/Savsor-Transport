import pool from "../../db.js";

export async function createQuote(payload) {
  const query = `
    INSERT INTO quotes (
      name, email, phone, service_type, departure_address,
      arrival_address, preferred_date, details, accept_privacy, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
    RETURNING
      id,
      name,
      email,
      phone,
      service_type AS "serviceType",
      departure_address AS "departureAddress",
      arrival_address AS "arrivalAddress",
      preferred_date AS "preferredDate",
      details,
      accept_privacy AS "acceptPrivacy",
      status,
      created_at AS "createdAt"
  `;
  const values = [
    payload.name,
    payload.email,
    payload.phone,
    payload.serviceType,
    payload.departureAddress,
    payload.arrivalAddress || null,
    payload.preferredDate || null,
    payload.details,
    payload.acceptPrivacy,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getQuotes() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      email,
      phone,
      service_type AS "serviceType",
      departure_address AS "departureAddress",
      arrival_address AS "arrivalAddress",
      preferred_date AS "preferredDate",
      details,
      accept_privacy AS "acceptPrivacy",
      status,
      created_at AS "createdAt"
    FROM quotes
    ORDER BY created_at DESC
  `);
  return result.rows;
}

export async function updateQuoteStatus(id, status) {
  const result = await pool.query(
    `
      UPDATE quotes
      SET status = $2
      WHERE id = $1
      RETURNING
        id,
        name,
        email,
        phone,
        service_type AS "serviceType",
        departure_address AS "departureAddress",
        arrival_address AS "arrivalAddress",
        preferred_date AS "preferredDate",
        details,
        accept_privacy AS "acceptPrivacy",
        status,
        created_at AS "createdAt"
    `,
    [Number(id), status],
  );
  return result.rows[0] ?? null;
}
