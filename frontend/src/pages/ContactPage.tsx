import { Helmet } from "react-helmet-async"
import { ContactForm } from "../components/contact/ContactForm"
import { ContactHero } from "../components/contact/ContactHero"
import { ContactInfosAndMap } from "../components/contact/ContactInfosAndMap"

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact &amp; devis — SAVSOR TRANSPORT | Saint-Ouen-l&apos;Aumône (95)</title>
        <meta
          name="description"
          content="Contactez SAVSOR TRANSPORT : formulaire en ligne, téléphone, e-mail et plan d'accès. 11 avenue du Général de Gaulle, 95310 Saint-Ouen-l'Aumône. Réponse sous 24h."
        />
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
