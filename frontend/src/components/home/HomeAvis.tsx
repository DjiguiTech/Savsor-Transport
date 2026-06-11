import { useEffect, useState } from "react";
import { apiUrl } from "../../lib/apiBase";
import { ReviewFormModal } from "./ReviewFormModal";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

interface DisplayReview extends Review {
  texte?: string;
  auteur?: string;
  contexte?: string;
}

const AVIS_EXEMPLES: DisplayReview[] = [
  {
    id: -1,
    name: "Sophie M.",
    rating: 5,
    comment:
      "Intervention ponctuelle pour un transport de mobilier vers le sud : équipe sérieuse, horaires tenus et matériel propre. Je recommande pour un usage pro comme perso.",
    auteur: "Sophie M.",
    contexte: "Particulier — Île-de-France",
  },
  {
    id: -2,
    name: "Karim B.",
    rating: 5,
    comment:
      "Devis clair et rapide. Le jour J, tout s’est enchaîné sans mauvaise surprise : démontage, emballage et installation au bon étage. Très bon contact commercial.",
    auteur: "Karim B.",
    contexte: "Déménagement appartement",
  },
  {
    id: -3,
    name: "Atelier Nord 95",
    rating: 5,
    comment:
      "Nous avons loué un utilitaire avec chauffeur pour une livraison en urgence : réactivité au téléphone et conduite prudente avec la marchandise fragile. Merci encore.",
    auteur: "Atelier Nord 95",
    contexte: "Professionnel — Val-d’Oise",
  },
];

export function HomeAvis() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl("/api/reviews/public"));
      if (response.ok) {
        const data = await response.json();
        setReviews(data.data || []);
      }
    } catch (err) {
      console.error("Erreur chargement avis:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const displayedReviews: DisplayReview[] =
    reviews.length > 0 ? reviews : AVIS_EXEMPLES;

  const handleFormSuccess = () => {
    setSuccessMessage("Merci ! Votre avis a été soumis avec succès et sera affiché après modération.");
    setTimeout(() => setSuccessMessage(""), 5000);
    loadReviews();
  };

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
            transport ou location.
          </p>
        </div>

        {successMessage && (
          <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-800">
            {successMessage}
          </div>
        )}

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <li className="col-span-full text-center text-gray-500">
              Chargement des avis...
            </li>
          ) : (
            displayedReviews.map((avis, index) => (
              <li key={index}>
                <figure className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-sm transition hover:border-savsor-green/30 hover:shadow-md">
                  <div
                    className="flex gap-0.5 text-savsor-green"
                    aria-label={`Note ${avis.rating} sur 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className={`text-lg leading-none ${
                          i < avis.rating ? "text-savsor-green" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1">
                    <p className="font-body text-sm leading-relaxed text-gray-700">
                      « {avis.comment} »
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-gray-200 pt-4">
                    <p className="font-display text-sm font-extrabold text-savsor-blue">
                      {avis.name}
                    </p>
                    {avis.createdAt && (
                      <p className="mt-1 font-body text-xs text-gray-500">
                        {new Date(avis.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                    {avis.contexte && (
                      <p className="mt-1 font-body text-xs text-gray-500">
                        {avis.contexte}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))
          )}
        </ul>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setIsFormOpen(true)}
            className="rounded-lg bg-savsor-green px-6 py-3 font-semibold text-white hover:bg-savsor-green/90 transition"
          >
            Laisser un avis
          </button>
        </div>
      </div>

      <ReviewFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />
    </section>
  );
}
