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
          Nos formules Éco, Standard &amp; Luxe — tableau comparatif | SAVSOR
          TRANSPORT
        </title>
        <meta
          name="description"
          content="Comparez les formules Éco, Standard et Luxe : curseur interactif, tableau détaillé des prestations incluses. Déménagement Val-d'Oise et Île-de-France — devis sous 24h."
        />
      </Helmet>
      <NosFormulesHero />
      <HomeFormulesSlider />
      <FormulesComparisonTable />
      <HomeCtaBand />
    </>
  )
}
