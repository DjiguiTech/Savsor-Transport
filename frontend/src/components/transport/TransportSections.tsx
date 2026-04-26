import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"

const FLUX = [
  {
    title: "Livraison directe",
    text: "Depôt vers client final ou chantier — créneaux communiqués en amont.",
  },
  {
    title: "Collecte & expédition",
    text: "Enlèvement chez un fournisseur, hub ou entrepôt, puis acheminement.",
  },
  {
    title: "Multi-sites & tournées",
    text: "Plusieurs dépôts ou livraisons sur une même vague logistique.",
  },
  {
    title: "Besoins ponctuels",
    text: "Pic d’activité, sinistre ou renfort — nous dimensionnons le véhicule au besoin réel.",
  },
] as const

const ETAPES = [
  {
    n: "1",
    title: "Brief & devis",
    text: "Volumes, adresses, contraintes d’accès et horaires : une proposition chiffrée claire.",
  },
  {
    n: "2",
    title: "Validation & planning",
    text: "Confirmation du créneau, préparation du matériel de manutention et d’arrimage.",
  },
  {
    n: "3",
    title: "Chargement",
    text: "Prise en charge sous vos consignes, sécurisation des colis et du véhicule.",
  },
  {
    n: "4",
    title: "Livraison & suivi",
    text: "Remise au destinataire, traçabilité selon accord — points de contact identifiés.",
  },
] as const

export function TransportSections() {
  const { openDevis } = useDevisModal()

  return (
    <>
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-3xl font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
            Une offre pensée pour les flux professionnels
          </h2>
          <p className="mt-4 max-w-3xl font-body text-gray-600">
            Le transport de marchandises en{" "}
            <strong className="font-semibold text-gray-800">
              Île-de-France
            </strong>{" "}
            représente le cœur de notre activité ; nous pouvons également couvrir
            des liaisons au{" "}
            <strong className="font-semibold text-gray-800">national</strong>{" "}
            selon vos projets. Artisans, commerces, PME, logistique légère : nous
            adaptons le dispositif à votre niveau d’exigence et à vos délais.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {FLUX.map(({ title, text }) => (
              <li
                key={title}
                className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-extrabold text-savsor-blue">
                  {title}
                </h3>
                <p className="mt-2 font-body text-sm text-gray-700">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Processus
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
            Prise en charge de A à Z
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map(({ n, title, text }) => (
              <li key={n} className="relative">
                <span
                  className="font-display text-4xl font-black leading-none text-savsor-green/35"
                  aria-hidden
                >
                  {n}
                </span>
                <h3 className="mt-2 font-display text-lg font-extrabold text-savsor-blue">
                  {title}
                </h3>
                <p className="mt-2 font-body text-sm text-gray-700">{text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-2xl border border-savsor-green/25 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div>
              <h3 className="font-display text-lg font-extrabold text-savsor-blue">
                Besoin d&apos;un véhicule seul ou avec chauffeur ?
              </h3>
              <p className="mt-2 max-w-xl font-body text-sm text-gray-600">
                Notre page{" "}
                <Link
                  to="/location"
                  className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
                >
                  location de camion
                </Link>{" "}
                détaille les gabarits disponibles — idéal pour compléter un
                transport organisé en interne.
              </p>
            </div>
            <Link
              to="/location"
              className="mt-4 inline-flex shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-5 py-2.5 font-display text-sm font-extrabold text-savsor-blue transition hover:bg-gray-100 sm:mt-0"
            >
              Voir la location
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
                Pourquoi confier vos transports à SAVSOR ?
              </h2>
              <ul className="mt-6 space-y-3 font-body text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>
                    Véhicules adaptés et équipes habituées à la manutention en
                    milieu urbain (livraisons Paris et petite couronne incluses).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>
                    Devis transparent : pas de surprise sur les options essentielles
                    une fois le périmètre défini.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>
                    Réactivité alignée sur votre production — réponse sous 24h
                    sur les demandes entrantes habituelles.
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-savsor-blue p-6 text-white sm:p-8">
              <p className="font-display text-lg font-extrabold">
                Tarifs et créneaux sur mesure
              </p>
              <p className="mt-2 font-body text-sm text-white/85">
                Indiquez routes, volumes approximatifs et fenêtres horaires : nous
                vous proposons une solution chiffrée adaptée à votre dossier.
              </p>
              <button
                type="button"
                onClick={openDevis}
                className="mt-6 rounded-md bg-savsor-green px-5 py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-light"
              >
                Demander un devis transport
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
