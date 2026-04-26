import { createContact, getContacts } from "./contacts.service.js";

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
    return res.status(201).json({ status: "success", data });
  } catch (error) {
    return next(error);
  }
}
