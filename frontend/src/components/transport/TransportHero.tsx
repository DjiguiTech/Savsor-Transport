import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"
import heroPhoto from "../../assets/image2.jpeg"

export function TransportHero() {
  const { openDevis } = useDevisModal()

  return (
    <section className="relative isolate overflow-hidden bg-savsor-blue text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Flotte et interventions SAVSOR — transport de marchandises en Île-de-France"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-savsor-blue/92 from-0% via-savsor-blue/50 via-55% to-transparent to-100%"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-savsor-green-light sm:text-sm">
          Livraison · Transport · Île-de-France &amp; national
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Transport de{" "}
          <span className="text-savsor-green-light">marchandises</span> pour les{" "}
          <span className="text-white">professionnels</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
          Depuis partout en france, nous organisons vos flux B2B :
          enlèvements, livraisons directes, tournées et liaisons au-delà
          d&apos;Île-de-France lorsque votre planning l&apos;exige. Tarifs et
          créneaux sur devis.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={openDevis}
            className="inline-flex items-center justify-center rounded-md bg-savsor-red px-6 py-3 font-display text-sm font-extrabold text-white shadow-lg transition hover:bg-savsor-red-dark sm:text-base"
          >
            Devis transport
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border-2 border-white/35 bg-white/5 px-6 py-3 font-display text-sm font-extrabold backdrop-blur transition hover:border-white/55 hover:bg-white/10 sm:text-base"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
