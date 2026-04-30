import { Link } from "react-router-dom"
import logoSavsor from "../../assets/Logo.jpeg"

export function Footer() {
  return (
    <footer className="mt-auto bg-savsor-green-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:py-8">
        <div>
          <Link
            to="/"
            className="inline-block rounded-md bg-white/95 p-1.5 ring-1 ring-white/20"
          >
            <img
              src={logoSavsor}
              alt=""
              width={200}
              height={56}
              className="h-9 w-auto max-w-[190px] object-contain sm:h-10"
              loading="lazy"
              decoding="async"
            />
            <span className="sr-only">SAVSOR TRANSPORT — Accueil</span>
          </Link>
          <p className="mt-2 max-w-sm font-body text-xs leading-snug text-white/85 sm:text-sm">
            Déménagement, livraison et location de camion avec ou sans chauffeur —
            partout en france (95) et au-delà.
          </p>
        </div>
        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-wide text-white/90">
            Liens
          </p>
          <ul className="mt-2 space-y-1 font-body text-xs text-white/85 sm:text-sm">
            <li>
              <Link className="hover:text-white hover:underline" to="/contact">
                Contact & devis
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white hover:underline"
                to="/qui-sommes-nous"
              >
                Qui sommes-nous
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" to="/mentions-legales">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white hover:underline"
                to="/politique-confidentialite"
              >
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-wide text-white/90">
            Coordonnées
          </p>
          <address className="mt-2 not-italic font-body text-xs leading-relaxed text-white/85 sm:text-sm">
            11 avenue du Général de Gaulle
            <br />
            95310 partout en france
            <br />
            <a className="mt-1 inline-block hover:underline" href="tel:+33624800205">
              06 24 80 02 05
            </a>
            <br />
            <a className="hover:underline" href="mailto:savsortransport@gmail.com">
              savsortransport@gmail.com
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-2.5 text-center font-body text-[11px] text-white/60 sm:text-xs">
        © {new Date().getFullYear()} SAVSOR TRANSPORT — Tous droits réservés.
      </div>
    </footer>
  )
}
