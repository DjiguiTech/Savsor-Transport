import pool from "../../db.js";

export async function getDashboardStats() {
  const [
    quotesCount,
    contactsCount,
    usersCount,
    pendingQuotesCount,
    reviewsCount,
    pendingReviewsCount,
    approvedReviewsCount,
  ] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM quotes"),
    pool.query("SELECT COUNT(*)::int AS count FROM contacts"),
    pool.query("SELECT COUNT(*)::int AS count FROM users"),
    pool.query(
      "SELECT COUNT(*)::int AS count FROM quotes WHERE status = 'pending'",
    ),
    pool.query("SELECT COUNT(*)::int AS count FROM reviews"),
    pool.query(
      "SELECT COUNT(*)::int AS count FROM reviews WHERE status = 'pending'",
    ),
    pool.query(
      "SELECT COUNT(*)::int AS count FROM reviews WHERE status = 'approved'",
    ),
  ]);

  return {
    quotesCount: quotesCount.rows[0].count,
    contactsCount: contactsCount.rows[0].count,
    usersCount: usersCount.rows[0].count,
    pendingQuotesCount: pendingQuotesCount.rows[0].count,
    reviewsCount: reviewsCount.rows[0].count,
    pendingReviewsCount: pendingReviewsCount.rows[0].count,
    approvedReviewsCount: approvedReviewsCount.rows[0].count,
  };
}
