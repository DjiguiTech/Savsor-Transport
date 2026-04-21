const AVIS = [
  {
    texte:
      "Intervention ponctuelle pour un transport de mobilier vers le sud : équipe sérieuse, horaires tenus et matériel propre. Je recommande pour un usage pro comme perso.",
    auteur: "Sophie M.",
    contexte: "Particulier — Île-de-France",
  },
  {
    texte:
      "Devis clair et rapide. Le jour J, tout s’est enchaîné sans mauvaise surprise : démontage, emballage et installation au bon étage. Très bon contact commercial.",
    auteur: "Karim B.",
    contexte: "Déménagement appartement",
  },
  {
    texte:
      "Nous avons loué un utilitaire avec chauffeur pour une livraison en urgence : réactivité au téléphone et conduite prudente avec la marchandise fragile. Merci encore.",
    auteur: "Atelier Nord 95",
    contexte: "Professionnel — Val-d’Oise",
  },
] as const

export function HomeAvis() {
  return (
    <section className="border-y border-gray-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Avis clients
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-savsor-blue sm:text-4xl">
            Ils nous ont fait confiance
          </h2>
          <p className="mt-4 font-body text-gray-600">
            Retours de particuliers et professionnels après déménagement,
            transport ou location. Les textes ci-dessous sont des exemples de
            mise en page — remplacez-les par vos avis Google, mail ou
            témoignages validés.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AVIS.map((avis) => (
            <li key={avis.auteur}>
              <figure className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-sm transition hover:border-savsor-green/30 hover:shadow-md">
                <div
                  className="flex gap-0.5 text-savsor-green"
                  aria-label="Note 5 sur 5"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} aria-hidden className="text-lg leading-none">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1">
                  <p className="font-body text-sm leading-relaxed text-gray-700">
                    « {avis.texte} »
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-gray-200 pt-4">
                  <p className="font-display text-sm font-extrabold text-savsor-blue">
                    {avis.auteur}
                  </p>
                  <p className="mt-1 font-body text-xs text-gray-500">
                    {avis.contexte}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
