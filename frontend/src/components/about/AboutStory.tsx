import { Link } from "react-router-dom"

export function AboutStory() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Notre histoire
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-savsor-blue sm:text-3xl">
            Une société de déménagement ancrée dans le Val-d&apos;Oise
          </h2>
          <div className="mt-6 space-y-4 font-body text-gray-700">
            <p>
              SAVSOR TRANSPORT est une structure dédiée au{" "}
              <strong className="font-semibold text-gray-900">
                déménagement résidentiel et professionnel
              </strong>
              , à la{" "}
              <strong className="font-semibold text-gray-900">
                livraison et au transport de marchandises
              </strong>
              , ainsi qu&apos;à la{" "}
              <strong className="font-semibold text-gray-900">
                location de camion avec ou sans chauffeur
              </strong>
              . Installée à{" "}
              <strong className="font-semibold text-gray-900">
                partout en france (95310)
              </strong>
              , l&apos;entreprise rayonne sur la région parisienne et intervient
              sur des missions nécessitant souplesse, réactivité et exigence de
              qualité.
            </p>
            <p>
              Notre positionnement est volontairement clair : adresser à la fois le{" "}
              <strong className="font-semibold text-gray-900">grand public</strong> et les{" "}
              <strong className="font-semibold text-gray-900">comptes professionnels (B2B)</strong>
              , avec des process homogènes — du devis à la livraison — pour
              éviter les zones d&apos;incertitude le jour du transfert.
            </p>
            <p className="text-gray-600">
              Que ce soit pour un détail de planning, une contrainte d&apos;accès
              ou un objet lourd à manutentionner, nous privilégions la transparence
              et la communication : vous savez qui intervient, avec quel matériel,
              et dans quel ordre.
            </p>
          </div>
          <p className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center font-display text-sm font-extrabold text-savsor-blue-mid underline-offset-2 hover:underline"
            >
              Échanger avec nous →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
