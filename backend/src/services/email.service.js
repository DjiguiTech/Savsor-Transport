import nodemailer from "nodemailer";

let transporterPromise = null;

function toBool(value) {
  if (typeof value !== "string") return false;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEmailConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    EMAIL_FROM,
    EMAIL_NOTIFICATION_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Configuration SMTP incomplète");
  }
  if (!EMAIL_FROM || !EMAIL_NOTIFICATION_TO) {
    throw new Error("Configuration e-mail incomplète");
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: toBool(SMTP_SECURE),
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    from: EMAIL_FROM,
    notificationTo: EMAIL_NOTIFICATION_TO,
  };
}

async function getTransporter() {
  if (!transporterPromise) {
    const config = getEmailConfig();
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth,
      }),
    );
  }
  return transporterPromise;
}

function buildAdminContactHtml(contact) {
  return `
    <h2>Nouvelle demande de contact</h2>
    <p><strong>Nom :</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(contact.email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(contact.phone)}</p>
    <p><strong>Sujet :</strong> ${escapeHtml(contact.topic)}</p>
    <p><strong>Message :</strong><br/>${escapeHtml(contact.message).replaceAll("\n", "<br/>")}</p>
    <p><strong>Date :</strong> ${new Date(contact.createdAt).toLocaleString("fr-FR")}</p>
  `;
}

function buildClientContactHtml(contact) {
  return `
    <p>Bonjour ${escapeHtml(contact.name)},</p>
    <p>Nous avons bien reçu votre message et nous vous répondrons rapidement.</p>
    <p><strong>Récapitulatif :</strong></p>
    <ul>
      <li>Sujet : ${escapeHtml(contact.topic)}</li>
      <li>Téléphone : ${escapeHtml(contact.phone)}</li>
    </ul>
    <p>Merci pour votre confiance,<br/>SAVSOR TRANSPORT</p>
  `;
}

function buildAdminQuoteHtml(quote) {
  return `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom :</strong> ${escapeHtml(quote.name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(quote.email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(quote.phone)}</p>
    <p><strong>Prestation :</strong> ${escapeHtml(quote.serviceType)}</p>
    <p><strong>Adresse départ :</strong> ${escapeHtml(quote.departureAddress)}</p>
    <p><strong>Adresse arrivée :</strong> ${escapeHtml(quote.arrivalAddress || "Non précisée")}</p>
    <p><strong>Date souhaitée :</strong> ${escapeHtml(quote.preferredDate || "Non précisée")}</p>
    <p><strong>Détails :</strong><br/>${escapeHtml(quote.details).replaceAll("\n", "<br/>")}</p>
    <p><strong>Date :</strong> ${new Date(quote.createdAt).toLocaleString("fr-FR")}</p>
  `;
}

function buildClientQuoteHtml(quote) {
  return `
    <p>Bonjour ${escapeHtml(quote.name)},</p>
    <p>Votre demande de devis a bien été reçue par notre équipe.</p>
    <p><strong>Récapitulatif :</strong></p>
    <ul>
      <li>Prestation : ${escapeHtml(quote.serviceType)}</li>
      <li>Départ : ${escapeHtml(quote.departureAddress)}</li>
      <li>Arrivée : ${escapeHtml(quote.arrivalAddress || "Non précisée")}</li>
      <li>Date souhaitée : ${escapeHtml(quote.preferredDate || "Non précisée")}</li>
    </ul>
    <p>Nous revenons vers vous sous 24h en général.<br/>SAVSOR TRANSPORT</p>
  `;
}

export async function sendContactEmails(contact) {
  const config = getEmailConfig();
  const transporter = await getTransporter();

  await Promise.all([
    transporter.sendMail({
      from: config.from,
      to: config.notificationTo,
      replyTo: contact.email,
      subject: `Nouveau contact - ${contact.topic}`,
      html: buildAdminContactHtml(contact),
    }),
    transporter.sendMail({
      from: config.from,
      to: contact.email,
      subject: "Confirmation de votre demande - SAVSOR TRANSPORT",
      html: buildClientContactHtml(contact),
    }),
  ]);
}

export async function sendQuoteEmails(quote) {
  const config = getEmailConfig();
  const transporter = await getTransporter();

  await Promise.all([
    transporter.sendMail({
      from: config.from,
      to: config.notificationTo,
      replyTo: quote.email,
      subject: `Nouveau devis - ${quote.serviceType}`,
      html: buildAdminQuoteHtml(quote),
    }),
    transporter.sendMail({
      from: config.from,
      to: quote.email,
      subject: "Confirmation de votre demande de devis - SAVSOR TRANSPORT",
      html: buildClientQuoteHtml(quote),
    }),
  ]);
}
