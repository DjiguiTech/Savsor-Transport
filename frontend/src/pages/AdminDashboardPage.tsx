import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SESSION_TIMEOUT_MS = 30 * 60 * 1000
const SESSION_EXPIRY_KEY = "adminSessionExpiresAt"

type StatCard = {
  label: string
  value: string
  delta: string
}

type DashboardStats = {
  quotesCount: number
  contactsCount: number
  usersCount: number
  pendingQuotesCount: number
}

type ContactItem = {
  id: number
  name: string
  email: string
  phone: string
  topic: string
  message: string
  createdAt: string
}

type QuoteStatus = "pending" | "processing" | "done" | "cancelled"

type QuoteItem = {
  id: number
  name: string
  email: string
  phone: string
  serviceType: string
  departureAddress: string
  arrivalAddress: string | null
  preferredDate: string | null
  details: string
  status: QuoteStatus
  createdAt: string
}

type QuoteStatusUpdatePayload = {
  status?: string
  message?: string
  data?: QuoteItem
}

const STATUS_LABELS: Record<QuoteStatus, string> = {
  pending: "En attente",
  processing: "En cours",
  done: "Traite",
  cancelled: "Annule",
}

const STATUS_STYLES: Record<QuoteStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  processing: "border-blue-200 bg-blue-50 text-blue-800",
  done: "border-emerald-200 bg-emerald-50 text-emerald-800",
  cancelled: "border-rose-200 bg-rose-50 text-rose-800",
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [contacts, setContacts] = useState<ContactItem[]>([])
  const [quotes, setQuotes] = useState<QuoteItem[]>([])
  const [quoteFilter, setQuoteFilter] = useState<"all" | QuoteStatus>("all")
  const [contactSearch, setContactSearch] = useState("")
  const [quoteSearch, setQuoteSearch] = useState("")
  const [contactsPage, setContactsPage] = useState(1)
  const [quotesPage, setQuotesPage] = useState(1)
  const [contactsSort, setContactsSort] = useState<"newest" | "oldest">("newest")
  const [quotesSort, setQuotesSort] = useState<"newest" | "oldest">("newest")
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function clearAdminSession() {
    localStorage.removeItem("adminSession")
    localStorage.removeItem(SESSION_EXPIRY_KEY)
  }

  useEffect(() => {
    const sessionRaw = localStorage.getItem("adminSession")
    const sessionExpiry = Number(localStorage.getItem(SESSION_EXPIRY_KEY) || "0")
    if (!sessionRaw) {
      navigate("/admin/login")
      return
    }
    if (!sessionExpiry || Date.now() > sessionExpiry) {
      clearAdminSession()
      navigate("/admin/login")
      return
    }

    try {
      const session = JSON.parse(sessionRaw) as { role?: string }
      if (session.role !== "admin") {
        clearAdminSession()
        navigate("/admin/login")
        return
      }
    } catch {
      clearAdminSession()
      navigate("/admin/login")
      return
    }

    async function loadDashboard() {
      try {
        const [statsRes, contactsRes, quotesRes] = await Promise.all([
          fetch("/api/admin/dashboard-stats"),
          fetch("/api/contact"),
          fetch("/api/devis"),
        ])

        if (!statsRes.ok || !contactsRes.ok || !quotesRes.ok) {
          throw new Error("Impossible de charger les donnees admin")
        }

        const statsPayload = (await statsRes.json()) as {
          data?: DashboardStats
        }
        const contactsPayload = (await contactsRes.json()) as {
          data?: ContactItem[]
        }
        const quotesPayload = (await quotesRes.json()) as {
          data?: QuoteItem[]
        }

        if (!statsPayload.data || !contactsPayload.data || !quotesPayload.data) {
          throw new Error("Réponse API invalide")
        }

        setStats(statsPayload.data)
        setContacts(contactsPayload.data)
        setQuotes(quotesPayload.data)
      } catch {
        setError("Impossible de charger les statistiques admin.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [navigate])

  useEffect(() => {
    const sessionRaw = localStorage.getItem("adminSession")
    if (!sessionRaw) {
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const forceLogout = () => {
      clearAdminSession()
      navigate("/admin/login")
    }

    const resetInactivityTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      localStorage.setItem(
        SESSION_EXPIRY_KEY,
        String(Date.now() + SESSION_TIMEOUT_MS),
      )
      timeoutId = setTimeout(forceLogout, SESSION_TIMEOUT_MS)
    }

    const activityEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ]

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer)
    })

    resetInactivityTimer()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer)
      })
    }
  }, [navigate])

  async function updateStatus(quoteId: number, status: QuoteStatus) {
    try {
      const response = await fetch(`/api/devis/${quoteId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      const payload = (await response.json()) as QuoteStatusUpdatePayload
      if (!response.ok) {
        throw new Error(payload.message || "Echec de mise a jour du statut")
      }
      if (!payload.data) {
        throw new Error("Reponse invalide du serveur")
      }
      const updatedQuote = payload.data

      setQuotes((prev) =>
        prev.map((quote) => (quote.id === quoteId ? updatedQuote : quote)),
      )
      setSelectedQuote((prev) => (prev?.id === quoteId ? updatedQuote : prev))
      setError(null)
    } catch {
      setError("Mise a jour du statut impossible.")
    }
  }

  function handleLogout() {
    clearAdminSession()
    navigate("/admin/login")
  }

  const cards: StatCard[] = [
    {
      label: "Demandes de devis",
      value: String(stats?.quotesCount ?? 0),
      delta: "Total en base",
    },
    {
      label: "Nouveaux contacts",
      value: String(stats?.contactsCount ?? 0),
      delta: "Total en base",
    },
    {
      label: "Utilisateurs",
      value: String(stats?.usersCount ?? 0),
      delta: "Comptes créés",
    },
    {
      label: "Devis en attente",
      value: String(stats?.pendingQuotesCount ?? 0),
      delta: "Statut pending",
    },
  ]

  const pendingItems = [
    `${stats?.pendingQuotesCount ?? 0} demande(s) de devis en attente`,
    `${stats?.contactsCount ?? 0} message(s) de contact reçus`,
  ]

  const ITEMS_PER_PAGE = 8

  const filteredContacts = contacts
    .filter((contact) => {
      const search = contactSearch.trim().toLowerCase()
      if (!search) return true
      return (
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.phone.toLowerCase().includes(search) ||
        contact.topic.toLowerCase().includes(search) ||
        contact.message.toLowerCase().includes(search)
      )
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime()
      const timeB = new Date(b.createdAt).getTime()
      return contactsSort === "newest" ? timeB - timeA : timeA - timeB
    })

  const filteredQuotes = quotes
    .filter((quote) => (quoteFilter === "all" ? true : quote.status === quoteFilter))
    .filter((quote) => {
      const search = quoteSearch.trim().toLowerCase()
      if (!search) return true
      return (
        quote.name.toLowerCase().includes(search) ||
        quote.email.toLowerCase().includes(search) ||
        quote.phone.toLowerCase().includes(search) ||
        quote.serviceType.toLowerCase().includes(search) ||
        quote.departureAddress.toLowerCase().includes(search) ||
        (quote.arrivalAddress ?? "").toLowerCase().includes(search) ||
        quote.details.toLowerCase().includes(search)
      )
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime()
      const timeB = new Date(b.createdAt).getTime()
      return quotesSort === "newest" ? timeB - timeA : timeA - timeB
    })

  const totalContactsPages = Math.max(1, Math.ceil(filteredContacts.length / ITEMS_PER_PAGE))
  const totalQuotesPages = Math.max(1, Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE))

  const safeContactsPage = Math.min(contactsPage, totalContactsPages)
  const safeQuotesPage = Math.min(quotesPage, totalQuotesPages)

  const paginatedContacts = filteredContacts.slice(
    (safeContactsPage - 1) * ITEMS_PER_PAGE,
    safeContactsPage * ITEMS_PER_PAGE,
  )
  const paginatedQuotes = filteredQuotes.slice(
    (safeQuotesPage - 1) * ITEMS_PER_PAGE,
    safeQuotesPage * ITEMS_PER_PAGE,
  )

  useEffect(() => {
    if (!selectedQuote) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedQuote(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedQuote])

  useEffect(() => {
    if (!selectedQuote) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedQuote])

  return (
    <>
      <Helmet>
        <title>Dashboard Admin | SAVSOR TRANSPORT</title>
        <meta
          name="description"
          content="Tableau de bord administrateur pour suivre les demandes, contacts et performances du site SAVSOR TRANSPORT."
        />
      </Helmet>

      <section className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-savsor-blue">
                  Administration
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Dashboard SAVSOR TRANSPORT
                </h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Vue globale de l&apos;activité du site, des demandes clients et des
                  actions prioritaires.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Se deconnecter
              </button>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((stat) => (
              <article
                key={stat.label}
                className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-emerald-600">{stat.delta}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">A traiter</h2>
              {loading && <p className="mt-4 text-sm text-slate-600">Chargement...</p>}
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              {!loading && !error && <ul className="mt-4 space-y-3">
                {pendingItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                  >
                    {item}
                  </li>
                ))}
              </ul>}
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Filtres devis</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => setQuoteFilter("all")} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-left text-sm font-medium text-slate-700">
                  Tous ({quotes.length})
                </button>
                <button type="button" onClick={() => setQuoteFilter("pending")} className={`rounded-lg border px-4 py-2 text-left text-sm font-medium ${STATUS_STYLES.pending}`}>
                  {STATUS_LABELS.pending}
                </button>
                <button type="button" onClick={() => setQuoteFilter("processing")} className={`rounded-lg border px-4 py-2 text-left text-sm font-medium ${STATUS_STYLES.processing}`}>
                  {STATUS_LABELS.processing}
                </button>
                <button type="button" onClick={() => setQuoteFilter("done")} className={`rounded-lg border px-4 py-2 text-left text-sm font-medium ${STATUS_STYLES.done}`}>
                  {STATUS_LABELS.done}
                </button>
                <button type="button" onClick={() => setQuoteFilter("cancelled")} className={`rounded-lg border px-4 py-2 text-left text-sm font-medium ${STATUS_STYLES.cancelled}`}>
                  {STATUS_LABELS.cancelled}
                </button>
              </div>
            </section>
          </div>

          <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Derniers contacts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={contactSearch}
                onChange={(e) => {
                  setContactSearch(e.target.value)
                  setContactsPage(1)
                }}
                placeholder="Rechercher nom, email, sujet..."
                className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={contactsSort}
                onChange={(e) => setContactsSort(e.target.value as "newest" | "oldest")}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
              </select>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-2 py-2">Nom</th>
                    <th className="px-2 py-2">Email</th>
                    <th className="px-2 py-2">Telephone</th>
                    <th className="px-2 py-2">Sujet</th>
                    <th className="px-2 py-2">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-slate-100 align-top">
                      <td className="px-2 py-2 font-medium text-slate-900">{contact.name}</td>
                      <td className="px-2 py-2">{contact.email}</td>
                      <td className="px-2 py-2">{contact.phone}</td>
                      <td className="px-2 py-2">{contact.topic}</td>
                      <td className="px-2 py-2 text-slate-600">{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <p>
                Page {safeContactsPage} / {totalContactsPages} ({filteredContacts.length} résultat(s))
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setContactsPage((p) => Math.max(1, p - 1))}
                  disabled={safeContactsPage === 1}
                  className="rounded border border-slate-200 px-3 py-1 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setContactsPage((p) => Math.min(totalContactsPages, p + 1))
                  }
                  disabled={safeContactsPage === totalContactsPages}
                  className="rounded border border-slate-200 px-3 py-1 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Demandes de devis</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={quoteSearch}
                onChange={(e) => {
                  setQuoteSearch(e.target.value)
                  setQuotesPage(1)
                }}
                placeholder="Rechercher client, email, prestation..."
                className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={quotesSort}
                onChange={(e) => setQuotesSort(e.target.value as "newest" | "oldest")}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
              </select>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-2 py-2">Client</th>
                    <th className="px-2 py-2">Prestation</th>
                    <th className="px-2 py-2">Depart</th>
                    <th className="px-2 py-2">Date</th>
                    <th className="px-2 py-2">Statut</th>
                    <th className="px-2 py-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuotes.map((quote) => (
                    <tr key={quote.id} className="border-b border-slate-100 align-top">
                      <td className="px-2 py-2">
                        <p className="font-medium text-slate-900">{quote.name}</p>
                        <p className="text-slate-600">{quote.email}</p>
                        <p className="text-slate-600">{quote.phone}</p>
                      </td>
                      <td className="px-2 py-2">{quote.serviceType}</td>
                      <td className="px-2 py-2 text-slate-600">{quote.departureAddress}</td>
                      <td className="px-2 py-2">{quote.preferredDate || "-"}</td>
                      <td className="px-2 py-2">
                        <select
                          className={`rounded-md border px-2 py-1 font-medium ${STATUS_STYLES[quote.status]}`}
                          value={quote.status}
                          onChange={(e) =>
                            updateStatus(quote.id, e.target.value as QuoteStatus)
                          }
                        >
                          <option value="pending">{STATUS_LABELS.pending}</option>
                          <option value="processing">{STATUS_LABELS.processing}</option>
                          <option value="done">{STATUS_LABELS.done}</option>
                          <option value="cancelled">{STATUS_LABELS.cancelled}</option>
                        </select>
                      </td>
                      <td className="px-2 py-2">
                        <button
                          type="button"
                          onClick={() => setSelectedQuote(quote)}
                          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Voir details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <p>
                Page {safeQuotesPage} / {totalQuotesPages} ({filteredQuotes.length} résultat(s))
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setQuotesPage((p) => Math.max(1, p - 1))}
                  disabled={safeQuotesPage === 1}
                  className="rounded border border-slate-200 px-3 py-1 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={() => setQuotesPage((p) => Math.min(totalQuotesPages, p + 1))}
                  disabled={safeQuotesPage === totalQuotesPages}
                  className="rounded border border-slate-200 px-3 py-1 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </section>

        </div>
      </section>

      {selectedQuote ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setSelectedQuote(null)}
          role="presentation"
        >
          <section
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Detail de la demande #{selectedQuote.id}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Recu le {new Date(selectedQuote.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Fermer
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client</p>
                <p className="mt-2 text-sm text-slate-800">{selectedQuote.name}</p>
                <p className="text-sm text-slate-700">{selectedQuote.email}</p>
                <p className="text-sm text-slate-700">{selectedQuote.phone}</p>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prestation</p>
                <p className="mt-2 text-sm text-slate-800">{selectedQuote.serviceType}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Statut</p>
                <p
                  className={`mt-1 inline-flex rounded-md border px-2 py-1 text-sm font-semibold ${STATUS_STYLES[selectedQuote.status]}`}
                >
                  {STATUS_LABELS[selectedQuote.status]}
                </p>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Depart</p>
                <p className="mt-2 text-sm text-slate-800">{selectedQuote.departureAddress}</p>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Arrivee / Date</p>
                <p className="mt-2 text-sm text-slate-800">{selectedQuote.arrivalAddress || "-"}</p>
                <p className="mt-1 text-sm text-slate-700">{selectedQuote.preferredDate || "-"}</p>
              </article>
            </div>

            <article className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message du client</p>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-800">
                {selectedQuote.details || "Aucun detail fourni."}
              </p>
            </article>
          </section>
        </div>
      ) : null}
    </>
  )
}
