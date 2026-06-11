import { Helmet } from "react-helmet-async"
import { DemenagementFormulesDetail } from "../components/demenagement/DemenagementFormulesDetail"
import { DemenagementHero } from "../components/demenagement/DemenagementHero"
import { DemenagementPourquoi } from "../components/demenagement/DemenagementPourquoi"
import { HomeCtaBand } from "../components/home/HomeCtaBand"

export function DemenagementPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Déménagement",
    description:
      "Services de déménagement pour particuliers et professionnels avec trois formules : Éco, Standard et Luxe. Manutention professionnelle, emballage et installation.",
    provider: {
      "@type": "Organization",
      name: "SAVSOR TRANSPORT",
      url: "https://www.savsor-transport.com",
      telephone: "+33624800205",
      address: {
        "@type": "PostalAddress",
        streetAddress: "11 avenue du Général de Gaulle",
        postalCode: "95310",
        addressLocality: "Saint-Ouen-l'Aumône",
        addressCountry: "FR",
      },
    },
    areaServed: [
      {
        "@type": "State",
        name: "Val-d'Oise",
      },
      {
        "@type": "State",
        name: "Île-de-France",
      },
      {
        "@type": "Country",
        name: "France",
      },
    ],
    image: "https://www.savsor-transport.com/og-image.jpg",
  }

  return (
    <>
      <Helmet>
        <title>
          Déménagement Val-d&apos;Oise (95) & Île-de-France | Formules Éco, Standard, Luxe
        </title>
        <meta
          name="description"
          content="Déménagement particuliers et professionnels en Val-d'Oise et Île-de-France. Trois formules détaillées : Éco, Standard, Luxe avec manutention professionnelle, emballage et installation. Devis gratuit sous 24h."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/demenagement" />

        <meta
          property="og:title"
          content="Déménagement Val-d'Oise & Île-de-France | SAVSOR TRANSPORT"
        />
        <meta
          property="og:description"
          content="Formules Éco, Standard, Luxe avec manutention professionnelle. Devis gratuit sous 24h."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/demenagement" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content="Déménagement Val-d'Oise & Île-de-France | SAVSOR TRANSPORT"
        />
        <meta
          name="twitter:description"
          content="Formules Éco, Standard, Luxe avec manutention professionnelle. Devis gratuit sous 24h."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <DemenagementHero />
      <DemenagementPourquoi />
      <DemenagementFormulesDetail />
      <HomeCtaBand />
    </>
  )
}
