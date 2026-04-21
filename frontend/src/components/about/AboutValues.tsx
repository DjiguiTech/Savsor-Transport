const VALEURS = [
  {
    title: "Rigueur & ponctualité",
    text: "Des créneaux tenus et une préparation minutieuse avant le jour J — cœur de notre métier.",
  },
  {
    title: "Fiabilité",
    text: "Du matériel adapté aux consignes suivies sur tout le parcours de la prestation.",
  },
  {
    title: "Satisfaction client",
    text: "Un interlocuteur disponible et des devis lisibles pour éviter les ambiguïtés.",
  },
  {
    title: "Réactivité",
    text: "Demande de devis répondue sous 24h dans les conditions habituelles de demande.",
  },
  {
    title: "Respect & éthique",
    text: "Relations transparentes avec les clients, les riverains et les parties communes.",
  },
] as const

export function AboutValues() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Nos valeurs
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
            Ce qui guide nos équipes au quotidien
          </h2>
          <p className="mt-4 font-body text-gray-600">
            Ces engagements structurent notre manière de préparer les
            déménagements, les transports et les locations — sur le papier comme
            sur le terrain.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALEURS.map(({ title, text }) => (
            <li
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-extrabold text-savsor-blue">
                {title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-gray-700">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
