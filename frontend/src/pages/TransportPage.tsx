import { Helmet } from "react-helmet-async"
import { HomeCtaBand } from "../components/home/HomeCtaBand"
import { TransportHero } from "../components/transport/TransportHero"
import { TransportSections } from "../components/transport/TransportSections"

export function TransportPage() {
  return (
    <>
      <Helmet>
        <title>
          Transport de marchandises Île-de-France &amp; national — SAVSOR
          TRANSPORT (95)
        </title>
        <meta
          name="description"
          content="Livraison et transport de marchandises pour professionnels : Île-de-France, Val-d'Oise, flux B2B et liaisons nationales sur devis. Saint-Ouen-l'Aumône."
        />
      </Helmet>
      <TransportHero />
      <TransportSections />
      <HomeCtaBand />
    </>
  )
}
