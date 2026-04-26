import { createQuote, getQuotes, updateQuoteStatus } from "./quotes.service.js";

export async function listQuotes(_req, res, next) {
  try {
    const data = await getQuotes();
    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function addQuote(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      departureAddress,
      arrivalAddress,
      preferredDate,
      details,
      acceptPrivacy,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !serviceType ||
      !departureAddress ||
      !details ||
      !acceptPrivacy
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "name, email, phone, serviceType, departureAddress, details et acceptPrivacy sont requis",
      });
    }

    const data = await createQuote({
      name,
      email,
      phone,
      serviceType,
      departureAddress,
      arrivalAddress,
      preferredDate,
      details,
      acceptPrivacy,
    });

    return res.status(201).json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

const ALLOWED_STATUSES = ["pending", "processing", "done", "cancelled"];

export async function patchQuoteStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "status invalide",
      });
    }

    const data = await updateQuoteStatus(req.params.id, status);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Devis introuvable",
      });
    }

    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}
