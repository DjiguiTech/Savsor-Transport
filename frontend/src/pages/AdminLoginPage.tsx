import { Helmet } from "react-helmet-async"
import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"

const SESSION_TIMEOUT_MS = 30 * 60 * 1000
const SESSION_EXPIRY_KEY = "adminSessionExpiresAt"

type LoginPayload = {
  status?: string
  message?: string
  data?: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    token: string
  }
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const payload = (await response.json()) as LoginPayload
      if (!response.ok || !payload.data || payload.data.role !== "admin") {
        throw new Error(payload.message || "Identifiants invalides")
      }

      localStorage.setItem("adminSession", JSON.stringify(payload.data))
      localStorage.setItem(
        SESSION_EXPIRY_KEY,
        String(Date.now() + SESSION_TIMEOUT_MS),
      )
      navigate("/admin")
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message)
      } else {
        setError("Connexion impossible. Merci de reessayer.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Connexion Admin | SAVSOR TRANSPORT</title>
        <meta
          name="description"
          content="Page de connexion administrateur pour l'espace de gestion SAVSOR TRANSPORT."
        />
      </Helmet>

      <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-savsor-blue">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Connexion admin
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Connectez-vous pour acceder au tableau de bord.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-savsor-blue focus:outline-none"
                placeholder="admin@savsor.fr"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="admin-password">
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-savsor-blue focus:outline-none"
                placeholder="Votre mot de passe"
              />
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-savsor-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-savsor-blue-mid disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
