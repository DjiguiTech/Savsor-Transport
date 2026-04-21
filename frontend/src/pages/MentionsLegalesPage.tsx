import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { LegalPageShell } from "../components/legal/LegalPageShell"

export function MentionsLegalesPage() {
  return (
    <>
      <Helmet>
        <title>Mentions légales — SAVSOR TRANSPORT</title>
        <meta
          name="description"
          content="Mentions légales du site savsor-transport.com : éditeur, hébergement, propriété intellectuelle."
        />
      </Helmet>
      <LegalPageShell title="Mentions légales">
        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            1. Éditeur du site
          </h2>
          <p>
            Le site internet accessible à l&apos;adresse{" "}
            <strong>www.savsor-transport.com</strong> (ci-après le « Site ») est
            édité par :
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1">
            <li>
              <strong>SAVSOR TRANSPORT</strong>
            </li>
            <li>11 avenue du Général de Gaulle, 95310 Saint-Ouen-l&apos;Aumône, France</li>
            <li>
              E-mail :{" "}
              <a
                href="mailto:savsortransport@gmail.com"
                className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
              >
                savsortransport@gmail.com
              </a>
            </li>
            <li>
              Téléphone :{" "}
              <a href="tel:+33624800205" className="text-savsor-blue-mid hover:underline">
                06 24 80 02 05
              </a>{" "}
              /{" "}
              <a href="tel:+33641392463" className="text-savsor-blue-mid hover:underline">
                06 41 39 24 63
              </a>
            </li>
          </ul>
          <p className="mt-3 text-gray-600">
            Les informations d&apos;immatriculation au Registre du Commerce et des
            Sociétés (RCS) ou au Répertoire des Entreprises (SIREN / SIRET), ainsi
            que la forme juridique précise de la société, peuvent être communiquées
            sur demande écrite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            2. Directeur de la publication
          </h2>
          <p>
            Le directeur de la publication est le représentant légal de SAVSOR
            TRANSPORT.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            3. Hébergement
          </h2>
          <p>
            Le Site est hébergé par le prestataire d&apos;hébergement utilisé en
            environnement de production (par exemple OVHcloud, Vercel, Netlify ou
            équivalent). L&apos;identité précise de l&apos;hébergeur et son adresse
            sont rappelées sur demande ou complétées ici lors de la mise en ligne
            définitive.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            4. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des éléments composant le Site (textes, visuels,
            graphismes, logo, structure, marques) est la propriété exclusive de
            SAVSOR TRANSPORT ou fait l&apos;objet d&apos;une autorisation
            d&apos;utilisation. Toute reproduction, représentation ou adaptation
            sans autorisation préalable et écrite est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            5. Données personnelles
          </h2>
          <p>
            Le traitement des données collectées via le Site est décrit dans la{" "}
            <Link
              to="/politique-confidentialite"
              className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </section>

        <p className="text-xs text-gray-500">
          Dernière mise à jour : avril 2026.
        </p>
      </LegalPageShell>
    </>
  )
}
