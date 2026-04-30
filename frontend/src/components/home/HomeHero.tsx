import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"
import heroPhoto from "../../assets/hero.jpeg"

export function HomeHero() {
  const { openDevis } = useDevisModal()

  return (
    <section className="relative isolate overflow-hidden bg-savsor-blue text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Véhicule et équipe SAVSOR Transport pour déménagement et livraisons"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
        {/* Léger assombrissement global + dégradé latéral : la photo reste lisible à droite */}
        <div className="absolute inset-0 bg-black/20" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-savsor-blue/88 from-0% via-savsor-blue/40 via-45% to-transparent to-100%"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/45 from-0% via-transparent via-40% to-black/15 to-100%"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(48vh,420px)] max-w-6xl flex-col justify-center px-4 py-10 sm:min-h-[min(44vh,400px)] sm:py-12 lg:py-14">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-savsor-green-light sm:text-sm">
          Particuliers &amp; professionnels · Devis sous 24h
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          Des professionnels pour{" "}
          <span className="text-savsor-green-light">votre déménagement</span>
          <span className="text-white"> et vos transports</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/88 sm:text-lg">
          Partout en france : une équipe
          structurée, du matériel adapté, et la même obsession du détail — du
          premier carton à la dernière porte refermée.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={openDevis}
            className="inline-flex items-center justify-center rounded-md bg-savsor-red px-6 py-2.5 text-center font-display text-sm font-extrabold text-white shadow-lg shadow-black/20 transition hover:bg-savsor-red-dark sm:text-base"
          >
            Obtenir mon devis
          </button>
          <button
            type="button"
            onClick={openDevis}
            className="inline-flex items-center justify-center rounded-md border-2 border-white/35 bg-white/5 px-6 py-2.5 text-center font-display text-sm font-extrabold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 sm:text-base"
          >
            Rappel gratuit
          </button>
          <Link
            to="/nos-formules"
            className="inline-flex items-center justify-center px-2 py-2 font-display text-sm font-bold text-white/90 underline-offset-4 hover:text-white hover:underline sm:px-4"
          >
            Voir nos formules
          </Link>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4 sm:mt-8">
          {[
            "Assurance & précautions renforcées",
            "Manutention & montage de mobilier",
            "Location avec ou sans chauffeur",
          ].map((label) => (
            <li
              key={label}
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-xs text-white/90 sm:text-sm"
            >
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-savsor-green text-xs font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
