import { Helmet } from "react-helmet-async"
import { ContactForm } from "../components/contact/ContactForm"
import { ContactHero } from "../components/contact/ContactHero"
import { ContactInfosAndMap } from "../components/contact/ContactInfosAndMap"

export function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
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
    },
  }

  return (
    <>
      <Helmet>
        <title>Contact &amp; devis gratuit | SAVSOR TRANSPORT</title>
        <meta
          name="description"
          content="Contactez SAVSOR TRANSPORT : formulaire en ligne, téléphone, e-mail. Adresse : 11 avenue du Général de Gaulle, 95310 Saint-Ouen-l'Aumône. Réponse sous 24h."
        />
        <link rel="canonical" href="https://www.savsor-transport.com/contact" />

        <meta property="og:title" content="Contact &amp; devis gratuit | SAVSOR TRANSPORT" />
        <meta
          property="og:description"
          content="Formulaire, téléphone, e-mail. Devis gratuit sans engagement sous 24h."
        />
        <meta property="og:url" content="https://www.savsor-transport.com/contact" />
        <meta property="og:image" content="https://www.savsor-transport.com/og-image.jpg" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Contact &amp; devis gratuit | SAVSOR TRANSPORT" />
        <meta
          name="twitter:description"
          content="Formulaire, téléphone, e-mail. Devis gratuit sans engagement sous 24h."
        />
        <meta name="twitter:image" content="https://www.savsor-transport.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>
      <ContactHero />
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <ContactInfosAndMap />
          </div>
        </div>
      </section>
    </>
  )
}
