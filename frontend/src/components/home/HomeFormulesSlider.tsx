import { useId, useState } from "react"
import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"
import { FORMULE_SLIDER } from "../formules/formulesComparisonData"

const FORMULES = FORMULE_SLIDER

export function HomeFormulesSlider() {
  const id = useId()
  const { openDevis } = useDevisModal()
  const [index, setIndex] = useState(1)
  const f = FORMULES[index]!

  return (
    <section className="border-y border-gray-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Nos formules
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-savsor-blue sm:text-4xl">
            Trouvez rapidement la prestation qui vous correspond
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-gray-600">
            Inspiré du curseur central des{" "}
            <a
              href="https://www.demenageurs-bretons.fr/"
              className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Déménageurs Bretons
            </a>
            : ajustez le curseur pour visualiser la répartition entre votre
            participation et notre équipe.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <label
            htmlFor={`${id}-range`}
            className="sr-only"
          >
            Choisir une formule
          </label>
          <div className="flex items-center justify-between gap-4 font-display text-xs font-bold uppercase tracking-wide text-gray-500">
            <span>Éco</span>
            <span>Standard</span>
            <span>Luxe</span>
          </div>
          <input
            id={`${id}-range`}
            type="range"
            min={0}
            max={FORMULES.length - 1}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            className="formules-range mt-3 h-3 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-savsor-green"
            aria-valuetext={f.name}
          />
        </div>

        <article className="mx-auto mt-10 max-w-xl rounded-2xl border border-gray-100 bg-gray-50/80 p-8 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-savsor-blue">
                {f.name}
              </h3>
              <p className="mt-1 font-body text-sm font-medium text-savsor-green">
                {f.hint}
              </p>
            </div>
            <p className="rounded-full bg-white px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-savsor-blue shadow-sm ring-1 ring-gray-100">
              Sur devis
            </p>
          </div>

          <p className="mt-5 font-body text-gray-700">{f.desc}</p>

          <div className="mt-8">
            <p className="text-center font-display text-xs font-extrabold uppercase tracking-wide text-gray-500">
              Répartition indicative
            </p>
            <div className="mt-2 flex h-12 overflow-hidden rounded-lg font-display text-xs font-extrabold text-white shadow-inner">
              <div
                className="flex items-center justify-center bg-savsor-blue-mid transition-[width] duration-300"
                style={{ width: `${f.vous}%` }}
              >
                <span className="px-1 text-center leading-tight">
                  Vous
                  <br />
                  {f.vous}%
                </span>
              </div>
              <div
                className="flex items-center justify-center bg-savsor-green transition-[width] duration-300"
                style={{ width: `${f.nous}%` }}
              >
                <span className="px-1 text-center leading-tight">
                  Nous
                  <br />
                  {f.nous}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openDevis}
              className="flex-1 rounded-md bg-savsor-green py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark"
            >
              Obtenir mon devis
            </button>
            <Link
              to="/nos-formules#comparatif"
              className="flex-1 rounded-md border border-gray-200 bg-white py-3 text-center font-display text-sm font-extrabold text-savsor-blue transition hover:bg-gray-50"
            >
              Tableau comparatif
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
