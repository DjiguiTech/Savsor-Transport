import { useId, useState } from "react"
import { Link } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"
import {
  type ComparisonCell,
  type ComparisonRow,
  COMPARISON_ROWS,
} from "./formulesComparisonData"

const COL_ORDER = ["eco", "standard", "luxe"] as const
const COL_LABELS: Record<(typeof COL_ORDER)[number], { title: string; short: string }> = {
  eco: { title: "Économique", short: "Éco" },
  standard: { title: "Standard", short: "Std." },
  luxe: { title: "Luxe", short: "Luxe" },
}

function CellDisplay({ cell }: { cell: ComparisonCell }) {
  if (cell.kind === "yes") {
    return (
      <span className="inline-flex justify-center text-lg font-bold text-savsor-green" aria-label="Inclus">
        ✓
      </span>
    )
  }
  if (cell.kind === "no") {
    return (
      <span className="text-gray-300" aria-label="Non inclus">
        —
      </span>
    )
  }
  if (cell.kind === "option") {
    return (
      <span className="font-body text-xs font-semibold text-savsor-blue-mid sm:text-sm">
        En option
      </span>
    )
  }
  return (
    <span className="font-body text-left text-xs leading-snug text-gray-700 sm:text-center sm:text-sm">
      {cell.label}
    </span>
  )
}

function pickCell(row: ComparisonRow, key: (typeof COL_ORDER)[number]): ComparisonCell {
  if (key === "eco") return row.eco
  if (key === "standard") return row.standard
  return row.luxe
}

export function FormulesComparisonTable() {
  const { openDevis } = useDevisModal()
  const tableId = useId()
  const [focusCol, setFocusCol] = useState<0 | 1 | 2>(1)

  return (
    <section
      id="comparatif"
      className="border-y border-gray-100 bg-gray-50 py-14 sm:py-20"
      aria-labelledby={`${tableId}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Tableau comparatif
          </p>
          <h2
            id={`${tableId}-heading`}
            className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-savsor-blue sm:text-4xl"
          >
            Comparez nos trois offres en un coup d&apos;œil
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-gray-600">
            Cliquez sur une formule pour la mettre en avant dans le tableau. Les
            prestations suivent le périmètre détaillé sur la page{" "}
            <Link
              to="/demenagement"
              className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
            >
              Déménagement
            </Link>
            .
          </p>
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {COL_ORDER.map((k, i) => (
            <button
              key={k}
              type="button"
              onClick={() => setFocusCol(i as 0 | 1 | 2)}
              className={`rounded-full px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide transition ${
                focusCol === i
                  ? "bg-savsor-green text-white shadow-md"
                  : "bg-white text-savsor-blue ring-1 ring-gray-200"
              }`}
            >
              {COL_LABELS[k].short}
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-center">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-20 min-w-[180px] bg-white px-3 py-4 text-left text-sm font-semibold text-gray-400 sm:min-w-[220px] sm:px-4"
                >
                  Prestation
                </th>
                {COL_ORDER.map((k, i) => (
                  <th
                    key={k}
                    scope="col"
                    className={`min-w-[120px] px-2 py-3 transition sm:min-w-[140px] sm:px-4 sm:py-4 ${
                      focusCol === i
                        ? "bg-savsor-green/12 ring-1 ring-savsor-green/30"
                        : "bg-gray-50/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFocusCol(i as 0 | 1 | 2)}
                      className={`w-full rounded-xl px-2 py-2 font-display text-sm font-extrabold transition sm:text-base ${
                        focusCol === i
                          ? "text-savsor-blue"
                          : "text-savsor-blue/70 hover:bg-white/80 hover:text-savsor-blue"
                      }`}
                      aria-pressed={focusCol === i}
                    >
                      {COL_LABELS[k].title}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-100 hover:bg-gray-50/90"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-3 py-3 text-left text-xs font-semibold text-gray-800 sm:px-4 sm:text-sm"
                  >
                    {row.label}
                  </th>
                  {COL_ORDER.map((k, i) => (
                    <td
                      key={k}
                      className={`px-2 py-3 align-middle sm:px-4 ${
                        focusCol === i
                          ? "bg-savsor-green/[0.07]"
                          : "bg-white/60"
                      }`}
                    >
                      <div className="flex min-h-8 items-center justify-center">
                        <CellDisplay cell={pickCell(row, k)} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-xs text-gray-500">
          ✓ Inclus · — Non prévu dans la formule · &quot;En option&quot; = possible en
          supplément selon devis.
        </p>

        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openDevis}
            className="flex-1 rounded-md bg-savsor-green py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark"
          >
            Obtenir mon devis
          </button>
          <Link
            to="/demenagement"
            className="flex-1 rounded-md border border-gray-200 bg-white py-3 text-center font-display text-sm font-extrabold text-savsor-blue transition hover:bg-gray-50"
          >
            Page déménagement
          </Link>
        </div>
      </div>
    </section>
  )
}
