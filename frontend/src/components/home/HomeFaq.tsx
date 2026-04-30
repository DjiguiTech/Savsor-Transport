import { useId, useState } from "react"
import { Link } from "react-router-dom"

const FAQ = [
  {
    q: "Combien de temps pour recevoir un devis ?",
    a: "Nous visons une réponse sous 24h ouvrées. Pour les dossiers complexes (accès, volume, créneaux serrés), un échange téléphonique permet d’affiner rapidement.",
  },
  {
    q: "Qu’est-ce qui influence le prix d’un déménagement ?",
    a: "La distance, le volume (mobilier / cartons), les objets fragiles ou lourds, les étages et l’accès (ascenseur, portage), ainsi que la période. Nous détaillons chaque poste dans notre proposition.",
  },
  {
    q: "Proposez-vous des cartons et du matériel ?",
    a: "Oui, selon la formule choisie. Nous pouvons fournir cartons, protections et housse matelas — indiquez-le dans votre demande de devis.",
  },
  {
    q: "Intervenez-vous uniquement dans le 95 ?",
    a: "Notre base est partout en france : nous couvrons l’Île-de-France au quotidien et organisons des missions au-delà selon vos besoins.",
  },
] as const

export function HomeFaq() {
  const baseId = useId()
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-savsor-blue sm:text-4xl">
            Vos questions, nos réponses
          </h2>
          <p className="mt-4 font-body text-gray-600">
            Un aperçu des questions fréquentes — le bloc complet pourra être
            enrichi ou déplacé sur une page dédiée selon votre stratégie SEO.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex font-display text-sm font-extrabold text-savsor-blue-mid underline-offset-2 hover:underline"
          >
            Poser une autre question
          </Link>
        </div>
        <div className="mt-10 space-y-3 lg:col-span-8 lg:mt-0">
          {FAQ.map((item, i) => {
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-btn-${i}`
            const expanded = open === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-extrabold text-savsor-blue transition hover:bg-gray-50"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : i)}
                  >
                    {item.q}
                    <span
                      className="text-savsor-green transition-transform"
                      style={{ transform: expanded ? "rotate(45deg)" : "none" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!expanded}
                  className="border-t border-gray-100 px-5 py-4"
                >
                  <p className="font-body text-sm leading-relaxed text-gray-600">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
