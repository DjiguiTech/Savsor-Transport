import { getUserById, getUsers } from "./users.service.js";

export async function listUsers(_req, res, next) {
  try {
    const data = await getUsers();
    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Utilisateur introuvable",
      });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    return next(error);
  }
}
