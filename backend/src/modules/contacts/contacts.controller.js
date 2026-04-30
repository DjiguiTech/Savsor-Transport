import { createContact, getContacts } from "./contacts.service.js";
import { sendContactEmails } from "../../services/email.service.js";

export async function listContacts(_req, res, next) {
  try {
    const data = await getContacts();
    return res.json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}

export async function addContact(req, res, next) {
  try {
    const { name, email, phone, topic, message, acceptPrivacy } = req.body;
    if (!name || !email || !phone || !topic || !message || !acceptPrivacy) {
      return res.status(400).json({
        status: "error",
        message:
          "name, email, phone, topic, message et acceptPrivacy sont requis",
      });
    }

    const data = await createContact({
      name,
      email,
      phone,
      topic,
      message,
      acceptPrivacy,
    });

    try {
      await sendContactEmails(data);
    } catch (mailError) {
      console.error("Erreur envoi e-mails contact:", mailError);
      return res.status(502).json({
        status: "error",
        message:
          "Votre demande est enregistree, mais l'envoi d'e-mail a echoue. Nous revenons vers vous rapidement.",
      });
    }

    return res.status(201).json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}
