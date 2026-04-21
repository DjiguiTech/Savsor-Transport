import { Link } from "react-router-dom"

const items = [
  {
    to: "/demenagement",
    title: "Déménagement",
    desc: "Particuliers & entreprises, toutes formules.",
    abbr: "D",
  },
  {
    to: "/transport",
    title: "Transport & livraison",
    desc: "Marchandises, flux pro, IDF & national.",
    abbr: "T",
  },
  {
    to: "/location",
    title: "Location de camion",
    desc: "Avec ou sans chauffeur, gabarits adaptés.",
    abbr: "L",
  },
  {
    to: "/demenagement",
    title: "Manutention",
    desc: "Objets lourds, montage / démontage.",
    abbr: "M",
  },
] as const

export function HomeSolutions() {
  return (
    <section className="bg-savsor-blue py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          Nos solutions pour aller plus loin
        </h2>
        <p className="mt-3 max-w-2xl font-body text-white/85">
          Des blocs clairs, façon vitrine pro : chaque carte renvoie vers une
          page détaillée pour le référencement et la conversion.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ to, title, desc, abbr }) => (
            <li key={`${to}-${abbr}`}>
              <Link
                to={to}
                className="flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-savsor-green-light/50 hover:bg-white/10"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-savsor-green/20 font-display text-xl font-black text-savsor-green-light"
                  aria-hidden
                >
                  {abbr}
                </span>
                <span className="mt-4 font-display text-lg font-extrabold">
                  {title}
                </span>
                <span className="mt-2 font-body text-sm text-white/80">
                  {desc}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold text-savsor-green-light">
                  En savoir plus
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
