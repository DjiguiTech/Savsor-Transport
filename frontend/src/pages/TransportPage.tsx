import { Helmet } from "react-helmet-async"
import { HomeCtaBand } from "../components/home/HomeCtaBand"
import { TransportHero } from "../components/transport/TransportHero"
import { TransportSections } from "../components/transport/TransportSections"

export function TransportPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Transport de marchandises",
    description:
      "Livraison et transport de marchandises pour professionnels et particuliers. Flux B2B, liaisons nationales, marchandises fragiles. Basés en Île-de-France.",
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
          Transport de marchandises Île-de-France & national | SAVSOR TRANSPORT
        </title>
        <meta
          name="description"
          content="Livraison et transport de marchandises pour professionnels : Île-de-France, Val-d'Oise, flux B2B, liaisons nationales. Basés à Saint-Ouen-l'Aumône (95310)."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/transport" />

        <meta
          property="og:title"
          content="Transport de marchandises Île-de-France & national | SAVSOR TRANSPORT"
        />
        <meta
          property="og:description"
          content="Livraison professionnelle, flux B2B, liaisons nationales. Transport fiable et sécurisé."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/transport" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content="Transport de marchandises Île-de-France & national | SAVSOR TRANSPORT"
        />
        <meta
          name="twitter:description"
          content="Livraison professionnelle, flux B2B, liaisons nationales. Transport fiable et sécurisé."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <TransportHero />
      <TransportSections />
      <HomeCtaBand />
    </>
  )
}
