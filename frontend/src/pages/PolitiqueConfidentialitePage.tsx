import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { LegalPageShell } from "../components/legal/LegalPageShell"

export function PolitiqueConfidentialitePage() {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité — SAVSOR TRANSPORT</title>
        <meta
          name="description"
          content="Politique de confidentialité et données personnelles : finalités, droits RGPD, cookies — SAVSOR TRANSPORT."
        />
      </Helmet>
      <LegalPageShell title="Politique de confidentialité">
        <p className="text-gray-600">
          La présente politique décrit la manière dont SAVSOR TRANSPORT collecte et
          traite les données personnelles dans le cadre de l&apos;utilisation du
          site <strong>www.savsor-transport.com</strong> et des formulaires de
          contact ou de demande de devis.
        </p>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            1. Responsable du traitement
          </h2>
          <p>
            <strong>SAVSOR TRANSPORT</strong> — 11 avenue du Général de Gaulle,
            95310 Saint-Ouen-l&apos;Aumône, France.
            <br />
            Contact :{" "}
            <a
              href="mailto:savsortransport@gmail.com"
              className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
            >
              savsortransport@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            2. Données collectées
          </h2>
          <p>Nous pouvons être amenés à collecter notamment :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              identité, coordonnées (nom, prénom, adresse e-mail, numéro de
              téléphone) ;
            </li>
            <li>contenu des messages envoyés via le formulaire de contact ;</li>
            <li>
              informations contenues dans une demande de devis (lieux, volumes,
              date souhaitée, etc.).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            3. Finalités et base légale
          </h2>
          <p>Ces données sont traitées pour :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>répondre à vos demandes de renseignements ou de devis ;</li>
            <li>assurer le suivi commercial et logistique de la relation ;</li>
            <li>respecter les obligations légales éventuellement applicables.</li>
          </ul>
          <p className="mt-3">
            La base légale repose notamment sur votre{" "}
            <strong>consentement</strong> lorsque vous soumettez un formulaire, et
            sur la <strong>nécessité des mesures précontractuelles</strong> ou
            l&apos;<strong>exécution du contrat</strong> lorsque vous passez une
            commande de prestation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            4. Durée de conservation
          </h2>
          <p>
            Les données issues des formulaires sont conservées pendant la durée
            nécessaire au traitement de votre demande, puis archivées au maximum
            pendant la durée légale applicable ou en base de prospection active,
            sauf opposition de votre part.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            5. Destinataires
          </h2>
          <p>
            Les données sont destinées aux services habilités de SAVSOR TRANSPORT
            et, le cas échéant, à des sous-traitants techniques strictement
            nécessaires à l&apos;hébergement du site ou à l&apos;envoi
            d&apos;emails (prestataire d&apos;envoi, hébergeur), dans le respect du
            RGPD.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            6. Vos droits (RGPD)
          </h2>
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, de limitation du traitement, de portabilité et
            d&apos;opposition dans les conditions prévues par la réglementation.
            Vous pouvez exercer ces droits en nous écrivant à l&apos;adresse
            indiquée ci-dessus. Réclamation auprès de la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            7. Cookies
          </h2>
          <p>
            Le site vise à limiter les cookies au strict nécessaire (fonctionnement
            technique, mesure d&apos;audience soumise à consentement si mise en
            œuvre). Toute bannière de consentement sera documentée lors de
            l&apos;activation d&apos;un outil d&apos;analytics tiers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold text-savsor-blue">
            8. Modifications
          </h2>
          <p>
            Cette politique peut être mise à jour ; la date de révision figure en
            bas de page.
          </p>
        </section>

        <p>
          Pour les informations sur l&apos;éditeur du site, voir les{" "}
          <Link
            to="/mentions-legales"
            className="font-semibold text-savsor-blue-mid underline-offset-2 hover:underline"
          >
            mentions légales
          </Link>
          .
        </p>

        <p className="text-xs text-gray-500">
          Dernière mise à jour : avril 2026.
        </p>
      </LegalPageShell>
    </>
  )
}
