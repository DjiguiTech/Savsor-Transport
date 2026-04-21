const PHONE_PRIMARY = "tel:+33624800205"
const PHONE_SECONDARY = "tel:+33641392463"

export function TopBar() {
  return (
    <div className="bg-savsor-green-dark text-white text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 sm:justify-between">
        <p className="text-center font-body text-white/95">
          Devis sous 24h —{" "}
          <a
            href={PHONE_PRIMARY}
            className="font-semibold underline-offset-2 hover:underline"
          >
            06 24 80 02 05
          </a>
          <span className="mx-2 text-white/50" aria-hidden>
            /
          </span>
          <a
            href={PHONE_SECONDARY}
            className="font-semibold underline-offset-2 hover:underline"
          >
            06 41 39 24 63
          </a>
        </p>
        <a
          href="mailto:savsortransport@gmail.com"
          className="hidden font-body text-white/90 hover:text-white sm:inline"
        >
          savsortransport@gmail.com
        </a>
      </div>
    </div>
  )
}
