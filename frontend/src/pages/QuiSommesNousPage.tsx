import { Helmet } from "react-helmet-async"
import { AboutGallery } from "../components/about/AboutGallery"
import { AboutHero } from "../components/about/AboutHero"
import { AboutStory } from "../components/about/AboutStory"
import { AboutValues } from "../components/about/AboutValues"
import { HomeCtaBand } from "../components/home/HomeCtaBand"

export function QuiSommesNousPage() {
  return (
    <>
      <Helmet>
        <title>
          Qui sommes-nous — société de déménagement Saint-Ouen-l&apos;Aumône |
          SAVSOR TRANSPORT
        </title>
        <meta
          name="description"
          content="SAVSOR TRANSPORT : déménagement, transport de marchandises et location de camion avec ou sans chauffeur. Valeurs, équipe et engagements — 95 & Île-de-France."
        />
      </Helmet>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutGallery />
      <HomeCtaBand />
    </>
  )
}
