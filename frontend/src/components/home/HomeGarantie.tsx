import { useDevisModal } from "../../context/DevisModalContext"
import garantiePhoto from "../../assets/image1.jpeg"

const points = [
  "Protection de vos biens : méthodes de calage, couvertures et matériel pro.",
  "Interlocuteur unique : planning clair, créneaux respectés, coordination logistique.",
  "Moins de stress : nous anticipons accès difficiles, objets lourds et fragiles.",
]

export function HomeGarantie() {
  const { openDevis } = useDevisModal()

  return (
    <section className="border-y border-gray-100 bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
            Au bout du compte
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-savsor-blue sm:text-4xl">
            Un transporteur pro,{" "}
            <span className="text-savsor-green">c&apos;est une garantie.</span>
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-gray-600">
            Comme sur les sites de référence du secteur, l&apos;idée est simple :
            vous achetez la tranquillité. Chez SAVSOR, la rigueur opérationnelle
            prime : équipe formée, véhicules adaptés, démarches expliquées
            clairement avant le jour J.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((t) => (
              <li key={t} className="flex gap-3 font-body text-gray-700">
                <span
                  className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-savsor-green"
                  aria-hidden
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openDevis}
            className="mt-10 inline-flex rounded-md bg-savsor-red px-6 py-3 font-display text-sm font-extrabold text-white shadow-sm transition hover:bg-savsor-red-dark"
          >
            Obtenir mon devis
          </button>
        </div>

        <div className="relative pb-14 sm:pb-16">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
            <img
              src={garantiePhoto}
              alt="Matériel professionnel et prise en charge SAVSOR Transport"
              className="h-full w-full object-cover"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-savsor-blue/90 via-savsor-blue/25 to-transparent"
              aria-hidden
            />
            {/* Texte : bas gauche sur mobile ; bas droite à partir de sm pour libérer le bas-gauche (carte) */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-start p-6 pb-8 text-white sm:justify-end sm:p-8 sm:pb-9">
              <div className="max-w-md sm:max-w-[min(20rem,calc(100%-10rem))] sm:text-right">
                <p className="font-display text-2xl font-extrabold leading-tight drop-shadow-sm">
                  Matériel adapté.
                  <br />
                  Équipe à l&apos;écoute.
                </p>
                <p className="mt-2 font-body text-sm text-white/90 drop-shadow-sm">
                  Du cartonnage au chargement : nous sécurisons chaque étape avec
                  du matériel adapté à vos biens.
                </p>
              </div>
            </div>
          </div>
          {/* Même carte : sous la photo sur mobile, chevauchante bas-gauche dès sm (comme avant) */}
          <div className="relative z-20 mt-4 w-fit max-w-[calc(100%-0.5rem)] rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:absolute sm:-bottom-5 sm:left-4 sm:mt-0 sm:max-w-none">
            <p className="font-display text-xs font-extrabold uppercase tracking-wide text-savsor-blue">
              Engagement
            </p>
            <p className="mt-1 font-display text-2xl font-black text-savsor-green">
              24h
            </p>
            <p className="font-body text-xs text-gray-500">
              pour répondre à votre demande
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
