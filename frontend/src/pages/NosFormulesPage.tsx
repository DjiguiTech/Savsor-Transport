import { Helmet } from "react-helmet-async"
import { FormulesComparisonTable } from "../components/formules/FormulesComparisonTable"
import { NosFormulesHero } from "../components/formules/NosFormulesHero"
import { HomeFormulesSlider } from "../components/home/HomeFormulesSlider"
import { HomeCtaBand } from "../components/home/HomeCtaBand"

export function NosFormulesPage() {
  return (
    <>
      <Helmet>
        <title>
          Formules Éco, Standard &amp; Luxe | Tableau comparatif | SAVSOR TRANSPORT
        </title>
        <meta
          name="description"
          content="Comparez nos trois formules de déménagement : Éco, Standard et Luxe. Tableau détaillé des prestations incluses (manutention, emballage, assurance). Déménagement Val-d'Oise et Île-de-France — devis gratuit sous 24h."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/nos-formules" />

        <meta
          property="og:title"
          content="Formules Éco, Standard & Luxe | SAVSOR TRANSPORT"
        />
        <meta
          property="og:description"
          content="Comparez nos trois formules de déménagement : tableau détaillé et curseur interactif."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/nos-formules" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Formules Éco, Standard & Luxe | SAVSOR TRANSPORT" />
        <meta
          name="twitter:description"
          content="Comparez nos trois formules de déménagement : tableau détaillé et curseur interactif."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />
      </Helmet>
      <NosFormulesHero />
      <HomeFormulesSlider />
      <FormulesComparisonTable />
      <HomeCtaBand />
    </>
  )
}
