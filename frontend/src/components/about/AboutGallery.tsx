import { useDevisModal } from "../../context/DevisModalContext"
import photoA from "../../assets/image2.jpeg"
import photoB from "../../assets/image3.jpeg"
import photoC from "../../assets/image4.jpeg"

const PHOTOS = [
  {
    src: photoA,
    alt: "Intervention SAVSOR — logistique et couverture géographique",
  },
  {
    src: photoB,
    alt: "Équipe et véhicules pour déménagement et transports",
  },
  {
    src: photoC,
    alt: "Flotte et matériel pour déménagements et livraisons",
  },
] as const

export function AboutGallery() {
  const { openDevis } = useDevisModal()

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-extrabold uppercase tracking-widest text-savsor-green">
              L&apos;équipe &amp; le terrain
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
              Des professionnels à votre côté
            </h2>
            <p className="mt-4 font-body text-gray-600">
              Manutention, conduite, coordination : les missions varient, mais
              l&apos;exigence reste la même — protéger vos biens, respecter les
              délais annoncés et rester disponibles lorsque le terrain impose des
              ajustements.
            </p>
          </div>
          <button
            type="button"
            onClick={openDevis}
            className="shrink-0 rounded-md bg-savsor-green px-5 py-2.5 font-display text-sm font-extrabold text-white transition hover:bg-savsor-green-dark lg:self-end"
          >
            Demander un devis
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {PHOTOS.map(({ src, alt }) => (
            <figure
              key={alt}
              className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100 shadow-md ring-1 ring-black/5"
            >
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 size-full object-cover object-center"
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
