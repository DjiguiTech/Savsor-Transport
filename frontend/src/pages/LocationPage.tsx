import { Helmet } from "react-helmet-async"
import { HomeCtaBand } from "../components/home/HomeCtaBand"
import { LocationHero } from "../components/location/LocationHero"
import { LocationSections } from "../components/location/LocationSections"

export function LocationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Location de camion et utilitaires",
    description:
      "Location de camion et utilitaires avec ou sans chauffeur. Plusieurs gabarits disponibles pour vos besoins de transport et déménagement.",
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
          Location camion avec ou sans chauffeur | Val-d&apos;Oise & Île-de-France
        </title>
        <meta
          name="description"
          content="Location de camion et utilitaires avec ou sans chauffeur. Plusieurs gabarits disponibles. Basés en Val-d'Oise (95310), nous servons l'Île-de-France et au-delà. Devis rapide."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/location" />

        <meta
          property="og:title"
          content="Location camion avec ou sans chauffeur | SAVSOR TRANSPORT"
        />
        <meta
          property="og:description"
          content="Plusieurs gabarits disponibles, avec ou sans chauffeur. Devis rapide et flexible."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/location" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content="Location camion avec ou sans chauffeur | SAVSOR TRANSPORT"
        />
        <meta
          name="twitter:description"
          content="Plusieurs gabarits disponibles, avec ou sans chauffeur. Devis rapide et flexible."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <LocationHero />
      <LocationSections />
      <HomeCtaBand />
    </>
  )
}
