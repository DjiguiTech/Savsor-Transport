import { loginUser, registerUser } from "./auth.service.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "email et password sont requis",
      });
    }

    const user = await loginUser(email, password);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Identifiants invalides",
      });
    }

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
}

export async function register(req, res, next) {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({
        status: "error",
        message: "email, firstName, lastName et password sont requis",
      });
    }

    const user = await registerUser({ email, firstName, lastName, password });
    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
}
