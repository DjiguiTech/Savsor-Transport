import { Helmet } from "react-helmet-async"
import { HomeCouverture } from "../components/home/HomeCouverture"
import { HomeGalleryStrip } from "../components/home/HomeGalleryStrip"
import { HomeCtaBand } from "../components/home/HomeCtaBand"
import { HomeFaq } from "../components/home/HomeFaq"
import { HomeFormulesSlider } from "../components/home/HomeFormulesSlider"
import { HomeGarantie } from "../components/home/HomeGarantie"
import { HomeHero } from "../components/home/HomeHero"
import { HomeSolutions } from "../components/home/HomeSolutions"
import { HomeAvis } from "../components/home/HomeAvis"

export function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "SAVSOR TRANSPORT",
    url: "https://www.savsor-transport.com",
    telephone: ["+33624800205", "+33641392463"],
    email: "contact@savsor-transport.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 avenue du Général de Gaulle",
      postalCode: "95310",
      addressLocality: "Saint-Ouen-l'Aumône",
      addressCountry: "FR",
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    description:
      "Déménagement particuliers et professionnels, transport de marchandises et location de camion avec ou sans chauffeur — Val-d'Oise (95) et Île-de-France.",
    image: "https://www.savsor-transport.com/og-image.jpg",
    priceRange: "€€",
    sameAs: [
      "https://www.google.com/maps/search/?api=1&query=11+Avenue+du+G%C3%A9n%C3%A9ral+de+Gaulle,+95310+Saint-Ouen-l%27Aum%C3%B4ne",
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien de temps pour recevoir un devis ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nous visons une réponse sous 24h ouvrées. Pour les dossiers complexes (accès, volume, créneaux serrés), un échange téléphonique permet d'affiner rapidement.",
        },
      },
      {
        "@type": "Question",
        name: "Qu'est-ce qui influence le prix d'un déménagement ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La distance, le volume (mobilier / cartons), les objets fragiles ou lourds, les étages et l'accès (ascenseur, portage), ainsi que la période. Nous détaillons chaque poste dans notre proposition.",
        },
      },
      {
        "@type": "Question",
        name: "Proposez-vous des cartons et du matériel ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, selon la formule choisie. Nous pouvons fournir cartons, protections et housse matelas — indiquez-le dans votre demande de devis.",
        },
      },
      {
        "@type": "Question",
        name: "Intervenez-vous uniquement en Val-d'Oise ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre base est à Saint-Ouen-l'Aumône (95310) : nous couvrons l'Île-de-France au quotidien et organisons des missions au-delà selon vos besoins.",
        },
      },
    ],
  }

  return (
    <>
      <Helmet>
        <title>
          SAVSOR TRANSPORT — Déménagement, Transport & Location | Val-d&apos;Oise
        </title>
        <meta
          name="description"
          content="Déménagement particuliers et professionnels, transport de marchandises, location de camion avec ou sans chauffeur. Basés en Val-d'Oise (95310), nous intervenons partout en Île-de-France et au-delà. Devis sous 24h."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/" />

        <meta property="og:title" content="SAVSOR TRANSPORT — Déménagement & Transport en Val-d'Oise" />
        <meta
          property="og:description"
          content="Déménagement particuliers et professionnels, transport de marchandises et location de camion. Devis gratuit sous 24h."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="SAVSOR TRANSPORT — Déménagement & Transport en Val-d'Oise" />
        <meta
          name="twitter:description"
          content="Déménagement particuliers et professionnels, transport de marchandises et location de camion. Devis gratuit sous 24h."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <HomeHero />
      <HomeGarantie />
      <HomeCouverture />
      <HomeGalleryStrip />
      <HomeFormulesSlider />
      <HomeSolutions />
      <HomeAvis />
      <HomeFaq />
      <HomeCtaBand />
    </>
  )
}
