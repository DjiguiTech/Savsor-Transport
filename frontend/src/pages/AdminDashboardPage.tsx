import { Helmet } from "react-helmet-async"

type StatCard = {
  label: string
  value: string
  delta: string
}

const stats: StatCard[] = [
  { label: "Demandes de devis", value: "124", delta: "+12% ce mois" },
  { label: "Nouveaux contacts", value: "38", delta: "+6 cette semaine" },
  { label: "Réservations location", value: "17", delta: "+3 aujourd'hui" },
  { label: "Taux de conversion", value: "31%", delta: "+4 pts" },
]

const pendingItems = [
  "6 demandes de devis en attente de réponse",
  "3 clients à rappeler aujourd'hui",
  "2 formulaires incomplets à relancer",
]

const quickActions = [
  "Publier une offre promotionnelle",
  "Mettre à jour les formules",
  "Consulter les nouveaux messages",
  "Exporter les demandes en CSV",
]

export function AdminDashboardPage() {
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
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
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
              <ul className="mt-4 space-y-3">
                {pendingItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Actions rapides</h2>
              <div className="mt-4 grid gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-savsor-blue hover:text-savsor-blue"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
