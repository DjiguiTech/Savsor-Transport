import { getDashboardStats } from "./admin.service.js";

export async function dashboardStats(_req, res, next) {
  try {
    const data = await getDashboardStats();
    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}
