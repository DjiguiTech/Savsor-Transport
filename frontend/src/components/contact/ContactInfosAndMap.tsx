const ADDRESS_LINES = [
  "11 avenue du Général de Gaulle",
  "95310 Saint-Ouen-l'Aumône",
] as const

const MAP_EMBED =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(
    "11 avenue du Général de Gaulle, 95310 Saint-Ouen-l'Aumône, France",
  ) +
  "&hl=fr&z=16&ie=UTF8&iwloc=&output=embed"

export function ContactInfosAndMap() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-gray-100 bg-gray-50/90 p-6 sm:p-8">
        <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
          Coordonnées
        </p>
        <address className="mt-4 not-italic">
          <p className="font-display text-lg font-extrabold text-savsor-blue">
            SAVSOR TRANSPORT
          </p>
          {ADDRESS_LINES.map((line) => (
            <p key={line} className="mt-2 font-body text-sm text-gray-700">
              {line}
            </p>
          ))}
        </address>
        <ul className="mt-6 space-y-3 font-body text-sm">
          <li>
            <span className="font-semibold text-gray-800">Téléphone</span>
            <br />
            <a
              className="text-savsor-blue-mid underline-offset-2 hover:underline"
              href="tel:+33624800205"
            >
              06 24 80 02 05
            </a>
            <span className="text-gray-400"> · </span>
            <a
              className="text-savsor-blue-mid underline-offset-2 hover:underline"
              href="tel:+33641392463"
            >
              06 41 39 24 63
            </a>
          </li>
          <li>
            <span className="font-semibold text-gray-800">E-mail</span>
            <br />
            <a
              className="break-all text-savsor-blue-mid underline-offset-2 hover:underline"
              href="mailto:savsortransport@gmail.com"
            >
              savsortransport@gmail.com
            </a>
          </li>
        </ul>
        <p className="mt-6 font-body text-xs text-gray-500">
          Horaires d&apos;accueil téléphonique indicatifs : du lundi au
          vendredi, 8h–18h (réponse sous 24h aux messages hors créneau).
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <p className="sr-only" id="map-heading">
          Plan d&apos;accès — SAVSOR TRANSPORT
        </p>
        <iframe
          title="Carte Google Maps — SAVSOR TRANSPORT, Saint-Ouen-l'Aumône"
          src={MAP_EMBED}
          className="aspect-[4/3] min-h-[240px] w-full border-0 sm:aspect-video sm:min-h-[280px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-labelledby="map-heading"
        />
        <p className="border-t border-gray-100 bg-white px-4 py-2 font-body text-xs text-gray-500">
          <a
            href="https://www.google.com/maps/search/?api=1&query=11+Avenue+du+G%C3%A9n%C3%A9ral+de+Gaulle,+95310+Saint-Ouen-l'Aum%C3%B4ne"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
          >
            Ouvrir l&apos;itinéraire dans Google Maps
          </a>
        </p>
      </div>
    </div>
  )
}
