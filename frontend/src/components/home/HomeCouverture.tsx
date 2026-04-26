import { Link } from "react-router-dom"
import couverturePhoto from "../../assets/image2.jpeg"

export function HomeCouverture() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-savsor-blue sm:text-4xl">
              Une base en <span className="text-savsor-green">Val-d&apos;Oise</span>,
              {" "}
              une intervention{" "}
              <span className="text-savsor-green">partout où vous allez</span>
            </h2>
            <p className="mt-5 max-w-3xl font-body text-lg text-gray-600">
              Livraisons et déménagements en Île-de-France au quotidien, avec
              possibilité d&apos;organiser des flux vers d&apos;autres régions.
              Une organisation serrée pour des créneaux fiables et un suivi
              transparent.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex rounded-md border border-savsor-blue/15 bg-savsor-blue px-6 py-3 font-display text-sm font-extrabold text-white transition hover:bg-savsor-blue-mid"
              >
                Trouver une solution
              </Link>
              <Link
                to="/qui-sommes-nous"
                className="inline-flex rounded-md border border-gray-200 px-6 py-3 font-display text-sm font-extrabold text-savsor-blue transition hover:bg-gray-50"
              >
                Qui sommes-nous
              </Link>
            </div>
          </div>
          <div className="relative min-h-[240px] lg:min-h-0">
            <img
              src={couverturePhoto}
              alt="Intervention SAVSOR Transport en Île-de-France"
              className="h-full w-full object-cover"
              width={900}
              height={700}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
