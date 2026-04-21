import { Helmet } from "react-helmet-async"
import { HomeCouverture } from "../components/home/HomeCouverture"
import { HomeGalleryStrip } from "../components/home/HomeGalleryStrip"
import { HomeCtaBand } from "../components/home/HomeCtaBand"
import { HomeFaq } from "../components/home/HomeFaq"
import { HomeFormulesSlider } from "../components/home/HomeFormulesSlider"
import { HomeGarantie } from "../components/home/HomeGarantie"
import { HomeHero } from "../components/home/HomeHero"
import { HomeSolutions } from "../components/home/HomeSolutions"

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>
          SAVSOR TRANSPORT — Déménagement Val-d&apos;Oise (95) & Île-de-France
        </title>
        <meta
          name="description"
          content="Déménagement particuliers et pros, transport de marchandises, location de camion avec ou sans chauffeur à Saint-Ouen-l'Aumône (95310). Devis sous 24h."
        />
      </Helmet>

      <HomeHero />
      <HomeGarantie />
      <HomeCouverture />
      <HomeGalleryStrip />
      <HomeFormulesSlider />
      <HomeSolutions />
      <HomeFaq />
      <HomeCtaBand />
    </>
  )
}
