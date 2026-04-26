export function DemenagementPourquoi() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
              Particuliers, entreprises et manutention
            </h2>
            <p className="mt-4 font-body text-gray-600">
              Que vous prépariez un déménagement d&apos;entreprise en
              Île-de-France ou un projet personnel dans le Val-d&apos;Oise, nous
              adaptons les équipes, le matériel et le niveau de prestation à
              votre contrainte du jour J. Notre savoir-faire en manutention
              professionnelle sécurise les objets lourds, le mobilier sensible
              et les accès délicats.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-display font-extrabold text-savsor-green">
                  B2C
                </span>
                <span>
                  Appartements, maisons, résidences — même logique de qualité du
                  premier carton au rangement final.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-display font-extrabold text-savsor-green">
                  B2B
                </span>
                <span>
                  Transferts de bureaux, archives, réseaux IT : coordination et
                  discrétion pour limiter l&apos;impact sur votre activité.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 sm:p-8">
            <h3 className="font-display text-lg font-extrabold text-savsor-blue">
              Nos engagements
            </h3>
            <ul className="mt-4 space-y-3 font-body text-sm text-gray-700">
              {[
                "Rigueur, ponctualité et fiabilité sur chaque chantier",
                "Devis sous 24h — transparence des options et des ajustements",
                "Matériel professionnel adapté (protection, lifting, véhicules)",
                "Satisfaction client : une équipe à l’écoute du terrain",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-savsor-green" aria-hidden>
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
