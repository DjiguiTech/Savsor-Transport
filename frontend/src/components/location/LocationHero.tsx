import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"
import heroPhoto from "../../assets/image3.jpeg"

export function LocationHero() {
  const { openDevis } = useDevisModal()

  return (
    <section className="relative isolate overflow-hidden bg-savsor-blue text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Location de camion et véhicules utilitaires — SAVSOR Transport Val-d'Oise"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-savsor-blue/93 from-0% via-savsor-blue/52 via-52% to-transparent to-100%"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-savsor-green-light sm:text-sm">
          Val-d&apos;Oise (95) · Île-de-France
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Location de camion{" "}
          <span className="text-savsor-green-light">avec ou sans chauffeur</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
          Besoin d&apos;un gabarit adapté à votre chargement, pour une journée ou
          une mission plus longue ? Basés à Saint-Ouen-l&apos;Aumône, nous
          proposons la location de véhicules utilitaires et de camions selon
          disponibilité — avec un conducteur expérimenté si vous préférez vous
          concentrer sur la déchargement.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={openDevis}
            className="inline-flex items-center justify-center rounded-md bg-savsor-green px-6 py-3 font-display text-sm font-extrabold text-white shadow-lg transition hover:bg-savsor-green-dark sm:text-base"
          >
            Demander une location
          </button>
          <Link
            to="/transport"
            className="inline-flex items-center justify-center rounded-md border-2 border-white/35 bg-white/5 px-6 py-3 font-display text-sm font-extrabold backdrop-blur transition hover:border-white/55 hover:bg-white/10 sm:text-base"
          >
            Transport clé en main
          </Link>
        </div>
      </div>
    </section>
  )
}
