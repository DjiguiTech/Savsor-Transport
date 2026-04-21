import { useDevisModal } from "../../context/DevisModalContext"

const FORMULES = [
  {
    key: "eco",
    name: "Économique",
    tag: "Budget maîtrisé",
    included: [
      "Livraison préalable de cartons et adhésifs à votre demande",
      "Protection du mobilier (couvertures Supertrans, bulkratt, housses spéciales)",
      "Protection des tableaux et miroirs (Bulpack et cartonnage renforcé)",
      "Mise sous housses neuves de la literie",
      "Mise en penderies des effets sur cintres",
      "Protection des sols et parties communes si nécessaire",
    ],
    gratuit: [
      "Déconnexion et reconnexion de tous les appareils électriques",
    ],
    options: [
      "Montage et démontage du mobilier",
      "Emballage/déballage des effets fragiles et non fragiles",
    ],
  },
  {
    key: "standard",
    name: "Standard",
    tag: "L’équilibre le plus demandé",
    included: [
      "Tout ce qui est inclus dans la formule Économique",
      "Emballage et déballage des objets fragiles (vaisselle, verreries, bibelots…)",
      "Démontage et remontage du mobilier si nécessaire",
      "Formalités pour la réservation de stationnement si nécessaire",
      "Retrait des protections et emballages en fin de prestation",
    ],
    gratuit: [
      "Déconnexion et reconnexion de tous les appareils électriques",
    ],
    options: [] as string[],
  },
  {
    key: "luxe",
    name: "Luxe",
    tag: "Confort maximal",
    included: [
      "Tout ce qui est inclus dans la formule Standard",
      "Emballage et mise en cartons de tous les effets (fragiles et non fragiles)",
      "Formalités de stationnement au chargement et à la livraison",
      "Déballage complet inclus",
    ],
    gratuit: [
      "Déconnexion et reconnexion de tous les appareils électriques",
    ],
    options: [] as string[],
  },
] as const

function List({
  title,
  items,
  accent,
}: {
  title: string
  items: readonly string[]
  accent: "default" | "muted"
}) {
  return (
    <div>
      <p
        className={`font-display text-xs font-extrabold uppercase tracking-wide ${accent === "muted" ? "text-gray-500" : "text-savsor-blue"}`}
      >
        {title}
      </p>
      <ul className="mt-2 space-y-2 font-body text-sm text-gray-700">
        {items.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-1.5 shrink-0 text-savsor-green" aria-hidden>
              ●
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DemenagementFormulesDetail() {
  const { openDevis } = useDevisModal()

  return (
    <section className="border-y border-gray-100 bg-gray-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Nos trois formules
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-savsor-blue sm:text-4xl">
            Détail des prestations Éco, Standard et Luxe
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-gray-600">
            Chaque offre est chiffrée sur devis selon le volume, les accès et la
            distance. Les formules ci-dessous reprennent fidèlement le périmètre
            de nos interventions.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {FORMULES.map((f) => (
            <article
              key={f.key}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-savsor-blue">
                    {f.name}
                  </h3>
                  <p className="mt-1 font-body text-sm font-medium text-savsor-green">
                    {f.tag}
                  </p>
                </div>
                <span className="rounded-full bg-gray-50 px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-savsor-blue ring-1 ring-gray-100">
                  Sur devis
                </span>
              </div>

              <div className="mt-5 flex flex-1 flex-col gap-6">
                <List title="Inclus dans notre service" items={f.included} accent="default" />
                <List title="Service offert (gratuit)" items={f.gratuit} accent="muted" />
                {f.options.length > 0 && (
                  <List title="Options en supplément" items={f.options} accent="default" />
                )}
              </div>

              <button
                type="button"
                onClick={openDevis}
                className="mt-8 w-full rounded-md bg-savsor-green py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark"
              >
                Obtenir un devis — {f.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
