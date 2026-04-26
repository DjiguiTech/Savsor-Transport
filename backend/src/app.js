import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route introuvable",
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    status: "error",
    message: "Erreur interne du serveur",
  });
});

export default app;
