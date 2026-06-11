import {
  createReview,
  getApprovedReviews,
  getPendingReviews,
  updateReviewStatus,
  deleteReview,
  checkRateLimitByIp,
  checkRateLimitByEmail,
} from "./reviews.service.js";

export async function submitReview(req, res, next) {
  try {
    const { name, email, rating, comment } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Validation des champs
    if (!name || !email || !rating || !comment) {
      return res.status(400).json({
        status: "error",
        message: "name, email, rating et comment sont requis",
      });
    }

    // Validation du rating
    if (![1, 2, 3, 4, 5].includes(Number(rating))) {
      return res.status(400).json({
        status: "error",
        message: "rating doit être entre 1 et 5",
      });
    }

    // Validation de la longueur du commentaire
    if (comment.length < 10 || comment.length > 1000) {
      return res.status(400).json({
        status: "error",
        message: "Le commentaire doit faire entre 10 et 1000 caractères",
      });
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Email invalide",
      });
    }

    // Rate limiting par IP
    const ipCount = await checkRateLimitByIp(ipAddress);
    if (ipCount >= 1) {
      return res.status(429).json({
        status: "error",
        message: "Vous avez déjà soumis un avis aujourd'hui. Réessayez demain.",
      });
    }

    // Rate limiting par email
    const emailCount = await checkRateLimitByEmail(email);
    if (emailCount >= 2) {
      return res.status(429).json({
        status: "error",
        message:
          "Trop d'avis soumis avec cet email. Veuillez attendre 24 heures.",
      });
    }

    const data = await createReview({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rating: Number(rating),
      comment: comment.trim(),
      ipAddress,
    });

    return res.status(201).json({
      status: "success",
      message: "Avis soumis avec succès. En attente de modération.",
      data,
    });
  } catch (error) {
    return next(error);
  }
}

export async function listPublicReviews(_req, res, next) {
  try {
    const data = await getApprovedReviews();
    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function listAllReviews(_req, res, next) {
  try {
    const data = await getPendingReviews();
    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function approveReview(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id est requis",
      });
    }

    const data = await updateReviewStatus(id, "approved");
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Avis non trouvé",
      });
    }

    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function rejectReview(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id est requis",
      });
    }

    const data = await updateReviewStatus(id, "rejected");
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Avis non trouvé",
      });
    }

    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function removeReview(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id est requis",
      });
    }

    const data = await deleteReview(id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Avis non trouvé",
      });
    }

    return res.json({ status: "success", message: "Avis supprimé" });
  } catch (error) {
    return next(error);
  }
}
