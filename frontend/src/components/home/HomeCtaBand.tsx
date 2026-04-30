import { useDevisModal } from "../../context/DevisModalContext"

export function HomeCtaBand() {
  const { openDevis } = useDevisModal()

  return (
    <section className="bg-savsor-green-dark py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-xl font-extrabold sm:text-2xl">
            Un projet en tête ?
          </p>
          <p className="mt-1 font-body text-sm text-white/85">
            Devis rapide, sans engagement — réponse sous 24h.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="tel:+33624800205"
            className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/10 px-6 py-3 font-display text-sm font-extrabold backdrop-blur transition hover:bg-white/20"
          >
            06 24 80 02 05
          </a>
          <button
            type="button"
            onClick={openDevis}
            className="inline-flex items-center justify-center rounded-md bg-savsor-red px-6 py-3 font-display text-sm font-extrabold text-white shadow transition hover:bg-savsor-red-dark"
          >
            Devis en ligne
          </button>
        </div>
      </div>
    </section>
  )
}
