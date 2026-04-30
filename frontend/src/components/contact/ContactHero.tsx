import heroPhoto from "../../assets/hero.jpeg"

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-savsor-blue text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Équipe et véhicules SAVSOR Transport — contact et devis"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-savsor-blue/92 from-0% via-savsor-blue/48 via-50% to-transparent to-100%"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-14 lg:py-16">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-savsor-green-light sm:text-sm">
          partout en france · Île-de-France
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-savsor-green-light">Contact</span> &amp; demandes
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
          Une question, un projet de déménagement ou de transport ? Écrivez-nous
          ou appelez-nous : réponse sous 24h sur les demandes formulées via ce
          formulaire.
        </p>
      </div>
    </section>
  )
}
