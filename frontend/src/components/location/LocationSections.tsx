import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"

const MODES = [
  {
    title: "Avec chauffeur",
    text: "Idéal si vous visez la tranquillité d’esprit : le conducteur gère conduite, stationnement et manœuvres, vous coordonnez déchargement et accès.",
    points: [
      "Moins de stress sur les accès étroits ou Paris",
      "Gain de temps si l’équipe reste sur le chantier ou chez le client",
    ],
  },
  {
    title: "Sans chauffeur",
    text: "Vous avez déjà un conducteur habilité et le permis adapté : nous mettons le véhicule à disposition, avec l’essentiel pour charger correctement.",
    points: [
      "Maîtrise totale du planning côté conducteur interne",
      "Adapté aux équipes habituées à l’utilitaire de forte taille",
    ],
  },
] as const

const GABARITS = [
  {
    name: "Utilitaire compact & moyen",
    desc: "Courses urbaines, palettes légères, accès difficiles — polyvalence au quotidien.",
  },
  {
    name: "Fourgon grand volume",
    desc: "Volumes type déménagement partiel, stock mobile, livraisons volumineuses.",
  },
  {
    name: "Camion plateau / plateau ridelles",
    desc: "Poids lourds, matériaux longs, charges nécessitant arrimage latéral.",
  },
  {
    name: "Porteur selon besoin",
    desc: "Nous dimensionnons avec vous le bon compromis charge utile / hauteur / PTAC.",
  },
] as const

export function LocationSections() {
  const { openDevis } = useDevisModal()

  return (
    <>
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-3xl font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
            Avec ou sans chauffeur : deux façons de louer
          </h2>
          <p className="mt-4 max-w-3xl font-body text-gray-600">
            La{" "}
            <strong className="font-semibold text-gray-800">
              location de camion avec chauffeur dans le 95
            </strong>{" "}
            et en Île-de-France est une réponse fréquente pour les pros comme
            les particuliers exigeants. La formule{" "}
            <strong className="font-semibold text-gray-800">sans chauffeur</strong>{" "}
            convient lorsque votre équipe est déjà équipée et assurée pour ce type
            de véhicule.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {MODES.map(({ title, text, points }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-100 bg-gray-50/90 p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-display text-xl font-extrabold text-savsor-blue">
                  {title}
                </h3>
                <p className="mt-3 font-body text-sm text-gray-700">{text}</p>
                <ul className="mt-4 space-y-2 font-body text-sm text-gray-700">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-savsor-green" aria-hidden>
                        ●
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Gabarits
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
            Des véhicules adaptés à chaque chargement
          </h2>
          <p className="mt-4 max-w-2xl font-body text-gray-600">
            Les capacités exactes et la disponibilité sont confirmées sur devis
            selon la période et votre secteur (Val-d&apos;Oise, petit/moyen
            couronne, Paris). Indiquez poids approximatif, dimensions et lieux de
            chargement.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {GABARITS.map(({ name, desc }) => (
              <li
                key={name}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-lg font-extrabold text-savsor-blue">
                  {name}
                </h3>
                <p className="mt-2 font-body text-sm text-gray-700">{desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-savsor-blue/15 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div>
              <h3 className="font-display text-lg font-extrabold text-savsor-blue">
                Livraison complète plutôt que simple location ?
              </h3>
              <p className="mt-2 max-w-xl font-body text-sm text-gray-600">
                Si vous préférez confier route, manutention et déchargement, voir
                notre offre{" "}
                <Link
                  to="/transport"
                  className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
                >
                  transport de marchandises
                </Link>
                .
              </p>
            </div>
            <Link
              to="/transport"
              className="mt-4 inline-flex shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-5 py-2.5 font-display text-sm font-extrabold text-savsor-blue transition hover:bg-gray-100 sm:mt-0"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
                Réservation & conditions
              </h2>
              <ul className="mt-6 space-y-3 font-body text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>
                    Durée, kilométrage prévu et créneaux : précisés au devis pour
                    éviter les mauvaises surprises.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>
                    Caution et pièces : selon type de véhicule et assurance — nous
                    détaillons la liste lors de la réservation ferme.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>
                    Réactivité : demande analysée rapidement — même logique que
                    pour un devis transport ou déménagement.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-savsor-blue p-6 text-white sm:p-8">
              <p className="font-display text-lg font-extrabold">
                Prêt à cadrer votre besoin ?
              </p>
              <p className="mt-2 font-body text-sm text-white/85">
                Dates souhaitées, ville de départ et d&apos;arrivée, gabarit
                envisagé : nous revenons vers vous avec une proposition claire.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openDevis}
                  className="inline-flex justify-center rounded-md bg-savsor-green px-5 py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-light"
                >
                  Devis location
                </button>
                <a
                  href="tel:+33624800205"
                  className="inline-flex justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 font-display text-sm font-extrabold backdrop-blur transition hover:bg-white/20"
                >
                  06 24 80 02 05
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
