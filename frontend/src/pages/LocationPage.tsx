import { Helmet } from "react-helmet-async"
import { HomeCtaBand } from "../components/home/HomeCtaBand"
import { LocationHero } from "../components/location/LocationHero"
import { LocationSections } from "../components/location/LocationSections"

export function LocationPage() {
  return (
    <>
      <Helmet>
        <title>
          Location camion avec ou sans chauffeur (95) — SAVSOR TRANSPORT
        </title>
        <meta
          name="description"
          content="Location de camion et utilitaires : avec ou sans chauffeur, plusieurs gabarits. Val-d'Oise, Saint-Ouen-l'Aumône, Île-de-France. Devis rapide."
        />
      </Helmet>
      <LocationHero />
      <LocationSections />
      <HomeCtaBand />
    </>
  )
}
