import { Helmet } from "react-helmet-async"
import { DemenagementFormulesDetail } from "../components/demenagement/DemenagementFormulesDetail"
import { DemenagementHero } from "../components/demenagement/DemenagementHero"
import { DemenagementPourquoi } from "../components/demenagement/DemenagementPourquoi"
import { HomeCtaBand } from "../components/home/HomeCtaBand"

export function DemenagementPage() {
  return (
    <>
      <Helmet>
        <title>
          Déménagement Val-d&apos;Oise (95) &amp; Île-de-France — formules Éco,
          Standard, Luxe | SAVSOR TRANSPORT
        </title>
        <meta
          name="description"
          content="Déménagement particuliers et professionnels partout en france. Manutention professionnelle, trois formules détaillées — Éco, Standard, Luxe. Devis sous 24h."
        />
      </Helmet>
      <DemenagementHero />
      <DemenagementPourquoi />
      <DemenagementFormulesDetail />
      <HomeCtaBand />
    </>
  )
}
