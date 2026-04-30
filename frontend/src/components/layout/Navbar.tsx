import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useDevisModal } from "../../context/DevisModalContext"
import logoSavsor from "../../assets/Logo.jpeg"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "font-display text-sm font-bold tracking-wide transition-colors",
    isActive ? "text-savsor-green" : "text-savsor-blue hover:text-savsor-green",
  ].join(" ")

const routes = [
  { to: "/", label: "Accueil" },
  { to: "/demenagement", label: "Déménagement" },
  { to: "/transport", label: "Transport" },
  { to: "/location", label: "Location" },
  { to: "/nos-formules", label: "Nos formules" },
  { to: "/contact", label: "Contact" },
  { to: "/qui-sommes-nous", label: "Qui sommes-nous" },
] as const

export function Navbar() {
  const { openDevis } = useDevisModal()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          title="SAVSOR TRANSPORT — Accueil"
        >
          <img
            src={logoSavsor}
            alt=""
            width={180}
            height={48}
            className="h-10 w-auto max-w-[min(200px,45vw)] object-contain sm:h-11"
            decoding="async"
          />
          <span className="sr-only">SAVSOR TRANSPORT — Accueil</span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Navigation principale"
        >
          {routes.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openDevis}
            className="hidden rounded-md bg-savsor-red px-4 py-2 font-display text-sm font-extrabold text-white shadow-sm transition hover:bg-savsor-red-dark sm:inline-flex"
          >
            Demander un devis
          </button>
          <button
            type="button"
            className="inline-flex rounded-md border border-savsor-blue/15 p-2 text-savsor-blue lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden"
        >
          <div className="mt-3 flex flex-col gap-3">
            {routes.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openDevis()
              }}
              className="mt-2 rounded-md bg-savsor-red px-4 py-3 text-center font-display text-sm font-extrabold text-white"
            >
              Demander un devis
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
