import { Helmet } from "react-helmet-async"
import { AboutGallery } from "../components/about/AboutGallery"
import { AboutHero } from "../components/about/AboutHero"
import { AboutStory } from "../components/about/AboutStory"
import { AboutValues } from "../components/about/AboutValues"
import { HomeCtaBand } from "../components/home/HomeCtaBand"

export function QuiSommesNousPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SAVSOR TRANSPORT",
    url: "https://www.savsor-transport.com",
    logo: "https://www.savsor-transport.com/favicon.jpg",
    description:
      "Entreprise de déménagement, transport de marchandises et location de camion basée en Val-d'Oise. Nous servons particuliers, professionnels et entreprises en Île-de-France et au-delà.",
    telephone: ["+33624800205", "+33641392463"],
    email: "contact@savsor-transport.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 avenue du Général de Gaulle",
      postalCode: "95310",
      addressLocality: "Saint-Ouen-l'Aumône",
      addressCountry: "FR",
    },
    foundingDate: "2015",
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
    sameAs: [
      "https://www.google.com/maps/search/?api=1&query=11+Avenue+du+G%C3%A9n%C3%A9ral+de+Gaulle,+95310+Saint-Ouen-l%27Aum%C3%B4ne",
    ],
  }

  return (
    <>
      <Helmet>
        <title>
          Qui sommes-nous | Entreprise de déménagement en Val-d&apos;Oise | SAVSOR TRANSPORT
        </title>
        <meta
          name="description"
          content="SAVSOR TRANSPORT : entreprise de déménagement, transport de marchandises et location de camion. Nos valeurs, notre équipe et nos engagements. Basés à Saint-Ouen-l'Aumône (95310)."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/qui-sommes-nous" />

        <meta
          property="og:title"
          content="Qui sommes-nous | SAVSOR TRANSPORT"
        />
        <meta
          property="og:description"
          content="Entreprise de déménagement depuis 2015. Nos valeurs, notre équipe, nos engagements."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/qui-sommes-nous" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Qui sommes-nous | SAVSOR TRANSPORT" />
        <meta
          name="twitter:description"
          content="Entreprise de déménagement depuis 2015. Nos valeurs, notre équipe, nos engagements."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutGallery />
      <HomeCtaBand />
    </>
  )
}
