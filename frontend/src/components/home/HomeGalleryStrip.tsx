import photoA from "../../assets/image3.jpeg"
import photoB from "../../assets/image4.jpeg"

export function HomeGalleryStrip() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-2xl font-extrabold text-savsor-blue sm:text-3xl">
          Sur le terrain
        </h2>
        <p className="mt-2 max-w-2xl font-body text-gray-600">
          Manutention, chargement, logistique : des missions concrètes avec la
          même exigence de qualité.
        </p>
        <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start sm:gap-6">
          <figure className="relative aspect-4/3 w-full min-w-0 overflow-hidden rounded-2xl bg-gray-100 shadow-md ring-1 ring-black/5">
            <img
              src={photoA}
              alt="Équipe SAVSOR lors d'une manutention et d'un chargement"
              className="absolute inset-0 size-full object-cover object-[center_35%]"
              width={960}
              height={720}
              sizes="(min-width: 640px) min(50vw - 2rem, 36rem), 100vw"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="relative aspect-4/3 w-full min-w-0 overflow-hidden rounded-2xl bg-gray-100 shadow-md ring-1 ring-black/5">
            <img
              src={photoB}
              alt="Véhicule et matériel SAVSOR Transport pour livraison et déménagement"
              className="absolute inset-0 size-full object-cover object-[center_35%]"
              width={960}
              height={720}
              sizes="(min-width: 640px) min(50vw - 2rem, 36rem), 100vw"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
