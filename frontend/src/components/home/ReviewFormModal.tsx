import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../lib/apiBase";

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewFormModal({
  isOpen,
  onClose,
  onSuccess,
}: ReviewFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(apiUrl("/api/reviews"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          rating: Number(rating),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Erreur lors de la soumission");
        return;
      }

      reset();
      setRating(5);
      onSuccess();
      onClose();
    } catch (err) {
      setError("Erreur de connexion au serveur");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold text-savsor-blue">
            Votre avis
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Partagez votre expérience avec nos services
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Votre nom
            </label>
            <input
              type="text"
              placeholder="Sophie M."
              {...register("name", {
                required: "Le nom est requis",
                minLength: {
                  value: 2,
                  message: "Minimum 2 caractères",
                },
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-savsor-green focus:outline-none focus:ring-1 focus:ring-savsor-green"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Votre email
            </label>
            <input
              type="email"
              placeholder="sophie@example.com"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email invalide",
                },
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-savsor-green focus:outline-none focus:ring-1 focus:ring-savsor-green"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Votre note
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition ${
                    star <= rating
                      ? "text-savsor-green"
                      : "text-gray-300 hover:text-savsor-green/50"
                  }`}
                  aria-label={`Note ${star} étoiles`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {rating} sur 5 étoiles
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Votre commentaire
            </label>
            <textarea
              placeholder="Décrivez votre expérience..."
              rows={4}
              {...register("comment", {
                required: "Le commentaire est requis",
                minLength: {
                  value: 10,
                  message: "Minimum 10 caractères",
                },
                maxLength: {
                  value: 1000,
                  message: "Maximum 1000 caractères",
                },
              })}
              className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-savsor-green focus:outline-none focus:ring-1 focus:ring-savsor-green"
            />
            {errors.comment && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.comment.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {(register("comment").name || "").length || 0} /1000 caractères
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-savsor-green py-2 text-sm font-semibold text-white hover:bg-savsor-green/90 disabled:opacity-50"
            >
              {isSubmitting ? "Envoi..." : "Envoyer l'avis"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          Votre avis sera modéré avant publication
        </p>
      </div>
    </div>
  );
}
