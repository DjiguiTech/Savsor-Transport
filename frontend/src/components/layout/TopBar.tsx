const PHONE_HREF = "tel:+33641392463"

export function TopBar() {
  return (
    <div className="bg-savsor-green-dark text-white text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 sm:justify-between">
        <p className="text-center font-body text-white/95">
          Devis sous 24h —{" "}
          <a
            href={PHONE_HREF}
            className="font-semibold underline-offset-2 hover:underline"
          >
            06 41 39 24 63
          </a>
        </p>
        <a
          href="mailto:Contact@savsortransport.com"
          className="hidden font-body text-white/90 hover:text-white sm:inline"
        >
          Contact@savsortransport.com
        </a>
      </div>
    </div>
  )
}
