import photo from "../../assets/image1.jpeg"

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-savsor-blue text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={photo}
          alt="SAVSOR Transport — équipement et prise en charge professionnelle sur le terrain"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-savsor-blue/93 from-0% via-savsor-blue/50 via-52% to-transparent to-100%"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-savsor-green-light sm:text-sm">
          Saint-Ouen-l&apos;Aumône · Val-d&apos;Oise (95)
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-savsor-green-light">Qui sommes-nous</span> ?
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
          SAVSOR TRANSPORT, c&apos;est une équipe de terrain et un réseau de
          partenaires fiables autour du déménagement, du transport de
          marchandises et de la location de véhicules — pour les particuliers
          comme pour les professionnels en Île-de-France et au-delà.
        </p>
      </div>
    </section>
  )
}
