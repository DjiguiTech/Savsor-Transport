import heroPhoto from "../../assets/image4.jpeg"

export function NosFormulesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-savsor-blue text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Formules de déménagement SAVSOR — comparaison Éco, Standard et Luxe"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-savsor-blue/94 from-0% via-savsor-blue/55 via-55% to-transparent to-100%"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-savsor-green-light sm:text-sm">
          Éco · Standard · Luxe
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Nos <span className="text-savsor-green-light">formules</span> de
          déménagement
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
          Visualisez la répartition de la prestation avec le curseur ci-dessous,
          puis explorez le tableau comparatif interactif pour trancher entre
          l&apos;offre Économique, Standard ou Luxe.
        </p>
      </div>
    </section>
  )
}
