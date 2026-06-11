import pool from "../../db.js";

export async function createReview(payload) {
  const query = `
    INSERT INTO reviews (name, email, rating, comment, status, ip_address)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      name,
      email,
      rating,
      comment,
      status,
      created_at AS "createdAt"
  `;
  const values = [
    payload.name,
    payload.email,
    payload.rating,
    payload.comment,
    "pending",
    payload.ipAddress || null,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getApprovedReviews() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      email,
      rating,
      comment,
      status,
      created_at AS "createdAt"
    FROM reviews
    WHERE status = 'approved'
    ORDER BY created_at DESC
  `);
  return result.rows;
}

export async function getPendingReviews() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      email,
      rating,
      comment,
      status,
      created_at AS "createdAt"
    FROM reviews
    ORDER BY status DESC, created_at DESC
  `);
  return result.rows;
}

export async function updateReviewStatus(id, status) {
  const result = await pool.query(
    `
      UPDATE reviews
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        name,
        email,
        rating,
        comment,
        status,
        created_at AS "createdAt"
    `,
    [Number(id), status],
  );
  return result.rows[0] ?? null;
}

export async function deleteReview(id) {
  const result = await pool.query(
    `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING id
    `,
    [Number(id)],
  );
  return result.rows[0] ?? null;
}

export async function checkRateLimitByIp(ipAddress) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const result = await pool.query(
    `
      SELECT COUNT(*) as count
      FROM reviews
      WHERE ip_address = $1
      AND created_at > $2
    `,
    [ipAddress, oneDayAgo],
  );
  return parseInt(result.rows[0]?.count || 0, 10);
}

export async function checkRateLimitByEmail(email) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const result = await pool.query(
    `
      SELECT COUNT(*) as count
      FROM reviews
      WHERE email = $1
      AND created_at > $2
    `,
    [email, oneDayAgo],
  );
  return parseInt(result.rows[0]?.count || 0, 10);
}
