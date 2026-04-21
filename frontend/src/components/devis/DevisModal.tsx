import { useEffect, useId, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { formStyles } from "../forms/formStyles"

export type DevisFormValues = {
  name: string
  email: string
  phone: string
  serviceType: string
  departureAddress: string
  arrivalAddress: string
  preferredDate: string
  details: string
  acceptPrivacy: boolean
}

const SERVICE_OPTIONS = [
  { value: "", label: "Type de prestation" },
  { value: "demenagement", label: "Déménagement" },
  { value: "transport", label: "Transport / livraison" },
  { value: "location", label: "Location de véhicule" },
  { value: "autre", label: "Autre" },
] as const

type DevisModalProps = {
  open: boolean
  onClose: () => void
}

export function DevisModal({ open, onClose }: DevisModalProps) {
  const titleId = useId()

  const [submitOk, setSubmitOk] = useState(false)
  const [thanksFirst, setThanksFirst] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DevisFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      departureAddress: "",
      arrivalAddress: "",
      preferredDate: "",
      details: "",
      acceptPrivacy: false,
    },
  })

  useEffect(() => {
    if (!open) return
    reset()
    /* Réinit à chaque ouverture : légitime pour un modal (règle react-hooks) */
    /* eslint-disable react-hooks/set-state-in-effect */
    setThanksFirst("")
    setSubmitOk(false)
    /* eslint-enable react-hooks/set-state-in-effect */
    const t = window.setTimeout(() => {
      document.getElementById("devis-name")?.focus()
    }, 100)
    return () => window.clearTimeout(t)
  }, [open, reset])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  async function onSubmit(data: DevisFormValues) {
    try {
      /** POST /api/devis — JSON.stringify(data) */
      await new Promise((r) => setTimeout(r, 650))
      const first = data.name.trim().split(/\s+/)[0] ?? ""
      setThanksFirst(first)
      setSubmitOk(true)
      reset()
    } catch {
      setSubmitOk(false)
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Fermer la fenêtre"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col rounded-t-xl bg-white shadow-xl sm:rounded-xl">
        <div className="shrink-0 border-b border-gray-100 px-5 pb-4 pt-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id={titleId}
                className="font-display text-xl font-extrabold text-savsor-blue"
              >
                Demande de devis
              </h2>
              <p className="mt-1 font-body text-sm text-gray-600">
                {submitOk
                  ? "Votre demande a bien été enregistrée."
                  : "Réponse sous 24h en général. Tous les champs avec * sont obligatoires."}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-savsor-blue hover:bg-gray-100"
              aria-label="Fermer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6">
          {submitOk ? (
            <div className="py-2">
              <p
                className="rounded-xl bg-savsor-green/10 px-4 py-4 font-body text-sm leading-relaxed text-savsor-green-dark"
                role="status"
              >
                Merci{thanksFirst ? `, ${thanksFirst}` : ""} : votre demande est
                enregistrée côté interface. L&apos;envoi automatique vers notre
                boîte mail sera branché sur{" "}
                <code className="rounded bg-white/80 px-1 text-xs">
                  POST /api/devis
                </code>{" "}
                (phase serveur Node + Nodemailer).
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitOk(false)
                    reset()
                    window.setTimeout(
                      () => document.getElementById("devis-name")?.focus(),
                      80,
                    )
                  }}
                  className="rounded-md bg-savsor-green px-5 py-2.5 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark"
                >
                  Nouvelle demande
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-200 px-5 py-2.5 font-display text-sm font-bold text-savsor-blue hover:bg-gray-50"
                >
                  Fermer
                </button>
              </div>
              <p className="mt-6 border-t border-gray-100 pt-4 font-body text-xs text-gray-500">
                Besoin d&apos;écrire plus en détail ?{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
                  onClick={onClose}
                >
                  Page Contact
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
          <form
            className="space-y-3 sm:space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="devis-name" className={formStyles.label}>
                Nom &amp; prénom <span className="text-red-600">*</span>
              </label>
              <input
                id="devis-name"
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

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="devis-email" className={formStyles.label}>
                  E-mail <span className="text-red-600">*</span>
                </label>
                <input
                  id="devis-email"
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
                <label htmlFor="devis-phone" className={formStyles.label}>
                  Téléphone <span className="text-red-600">*</span>
                </label>
                <input
                  id="devis-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className={formStyles.input}
                  aria-invalid={errors.phone ? "true" : "false"}
                  {...register("phone", {
                    required: "Numéro obligatoire pour vous rappeler.",
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
              <label htmlFor="devis-service" className={formStyles.label}>
                Prestation souhaitée <span className="text-red-600">*</span>
              </label>
              <select
                id="devis-service"
                className={formStyles.select}
                aria-invalid={errors.serviceType ? "true" : "false"}
                {...register("serviceType", {
                  validate: (v) =>
                    v !== "" || "Choisissez un type de prestation.",
                })}
              >
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o.label} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className={formStyles.error} role="alert">
                  {errors.serviceType.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="devis-departure" className={formStyles.label}>
                Adresse de départ (ou lieu de prise en charge){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                id="devis-departure"
                type="text"
                autoComplete="street-address"
                className={formStyles.input}
                placeholder="Ville, code postal, étage / ascenseur si utile"
                aria-invalid={errors.departureAddress ? "true" : "false"}
                {...register("departureAddress", {
                  required: "Indiquez au moins le lieu de départ.",
                  minLength: {
                    value: 5,
                    message: "Précisez un peu plus le lieu de départ.",
                  },
                })}
              />
              {errors.departureAddress && (
                <p className={formStyles.error} role="alert">
                  {errors.departureAddress.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="devis-arrival" className={formStyles.label}>
                Adresse d&apos;arrivée (si connue)
              </label>
              <input
                id="devis-arrival"
                type="text"
                autoComplete="street-address"
                className={formStyles.input}
                placeholder="Optionnel — à compléter si vous la connaissez déjà"
                {...register("arrivalAddress")}
              />
            </div>

            <div>
              <label htmlFor="devis-date" className={formStyles.label}>
                Date souhaitée (indicative)
              </label>
              <input
                id="devis-date"
                type="date"
                className={formStyles.input}
                {...register("preferredDate")}
              />
            </div>

            <div>
              <label htmlFor="devis-details" className={formStyles.label}>
                Détails du projet <span className="text-red-600">*</span>
              </label>
              <textarea
                id="devis-details"
                rows={4}
                className={formStyles.textarea}
                placeholder="Volume approximatif, accès difficiles, objets lourds ou fragiles, créneaux horaires…"
                aria-invalid={errors.details ? "true" : "false"}
                {...register("details", {
                  required: "Décrivez brièvement votre besoin.",
                  minLength: {
                    value: 20,
                    message: "Au moins 20 caractères pour un premier arbitrage.",
                  },
                })}
              />
              {errors.details && (
                <p className={formStyles.error} role="alert">
                  {errors.details.message}
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
                      "Vous devez accepter la politique de confidentialité.",
                  })}
                />
                <span>
                  J&apos;accepte la{" "}
                  <Link
                    to="/politique-confidentialite"
                    className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
                    onClick={onClose}
                  >
                    politique de confidentialité
                  </Link>{" "}
                  <span className="text-red-600">*</span>
                </span>
              </label>
              {errors.acceptPrivacy && (
                <p className={formStyles.error} role="alert">
                  {errors.acceptPrivacy.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-savsor-green py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:px-8"
              >
                {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-md border border-gray-200 py-2.5 font-display text-sm font-bold text-savsor-blue hover:bg-gray-50 sm:w-auto sm:px-4"
              >
                Fermer
              </button>
            </div>
          </form>

          <p className="mt-4 border-t border-gray-100 pt-4 font-body text-xs text-gray-500">
            Une demande plus longue ? Utilisez aussi la{" "}
            <Link
              to="/contact"
              className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
              onClick={onClose}
            >
              page Contact
            </Link>
            .
          </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
