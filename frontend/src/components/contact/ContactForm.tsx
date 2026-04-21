import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { formStyles } from "../forms/formStyles"
import { useDevisModal } from "../../context/DevisModalContext"

const TOPICS = [
  { value: "", label: "Sélectionnez un sujet" },
  { value: "demenagement", label: "Déménagement" },
  { value: "transport", label: "Transport de marchandises" },
  { value: "location", label: "Location de camion" },
  { value: "autre", label: "Autre demande" },
] as const

export type ContactFormValues = {
  name: string
  email: string
  phone: string
  topic: string
  message: string
  acceptPrivacy: boolean
}

export function ContactForm() {
  const { openDevis } = useDevisModal()
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  )
  const [thanksFirst, setThanksFirst] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
      acceptPrivacy: false,
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setSubmitState("idle")
    try {
      /** Branchement prévu : POST /api/contact — corps : JSON.stringify(data) */
      await new Promise((r) => setTimeout(r, 600))
      const first = data.name.trim().split(/\s+/)[0] ?? ""
      setThanksFirst(first)
      setSubmitState("success")
      reset()
    } catch {
      setSubmitState("error")
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-xl font-extrabold text-savsor-blue sm:text-2xl">
        Formulaire de contact
      </h2>
      <p className="mt-2 font-body text-sm text-gray-600">
        Les champs marqués d&apos;un astérisque sont obligatoires.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label htmlFor="contact-name" className={formStyles.label}>
            Nom &amp; prénom <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={formStyles.input}
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", { required: "Indiquez votre nom." })}
          />
          {errors.name && (
            <p className={formStyles.error} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className={formStyles.label}>
              E-mail <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              className={formStyles.input}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Indiquez une adresse e-mail.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format d’e-mail invalide.",
                },
              })}
            />
            {errors.email && (
              <p className={formStyles.error} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-phone" className={formStyles.label}>
              Téléphone <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={formStyles.input}
              aria-invalid={errors.phone ? "true" : "false"}
              {...register("phone", {
                required: "Indiquez un numéro joignable.",
                minLength: { value: 8, message: "Numéro trop court." },
              })}
            />
            {errors.phone && (
              <p className={formStyles.error} role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-topic" className={formStyles.label}>
            Sujet <span className="text-red-600">*</span>
          </label>
          <select
            id="contact-topic"
            className={formStyles.select}
            aria-invalid={errors.topic ? "true" : "false"}
            {...register("topic", {
              validate: (v) =>
                v !== "" || "Choisissez un type de demande.",
            })}
          >
            {TOPICS.map((t) => (
              <option key={t.label} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p className={formStyles.error} role="alert">
              {errors.topic.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className={formStyles.label}>
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={formStyles.textarea}
            placeholder="Décrivez votre besoin (lieux, dates approximatives, volume…)"
            aria-invalid={errors.message ? "true" : "false"}
            {...register("message", {
              required: "Saisissez votre message.",
              minLength: {
                value: 20,
                message: "Un peu plus de détail nous aide à vous répondre (20 caractères min.).",
              },
            })}
          />
          {errors.message && (
            <p className={formStyles.error} role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <label className="flex cursor-pointer gap-3 font-body text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-0.5 size-4 rounded border-gray-300 text-savsor-green accent-savsor-green"
              {...register("acceptPrivacy", {
                required:
                  "Vous devez accepter la politique de confidentialité pour envoyer le formulaire.",
              })}
            />
            <span>
              J&apos;ai pris connaissance de la{" "}
              <Link
                to="/politique-confidentialite"
                className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
              >
                politique de confidentialité
              </Link>{" "}
              et j&apos;accepte que mes données soient utilisées pour traiter ma
              demande. <span className="text-red-600">*</span>
            </span>
          </label>
          {errors.acceptPrivacy && (
            <p className={formStyles.error} role="alert">
              {errors.acceptPrivacy.message}
            </p>
          )}
        </div>

        {submitState === "success" && (
          <p
            className="rounded-lg bg-savsor-green/10 px-3 py-2 font-body text-sm text-savsor-green-dark"
            role="status"
          >
            Merci{thanksFirst ? `, ${thanksFirst}` : ""} : votre message a bien été
            enregistré côté interface. L&apos;envoi par e-mail sera activé dès
            connexion à l&apos;API (phase serveur).
          </p>
        )}
        {submitState === "error" && (
          <p className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-700" role="alert">
            Envoi impossible pour le moment. Préférez nous joindre par téléphone.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-savsor-green py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {isSubmitting ? "Envoi…" : "Envoyer le message"}
        </button>
      </form>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <p className="font-body text-sm text-gray-600">
          Besoin d&apos;un devis chiffré rapidement ?
        </p>
        <button
          type="button"
          onClick={openDevis}
          className="mt-2 text-left font-display text-sm font-extrabold text-savsor-blue-mid underline-offset-2 hover:underline"
        >
          Ouvrir le formulaire de devis →
        </button>
      </div>
    </div>
  )
}
