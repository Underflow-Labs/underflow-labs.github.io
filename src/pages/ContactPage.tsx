import { ContactFormSection } from "../components/sections/ContactFormSection";
import { PageMeta } from "../components/seo/PageMeta";
import { contactContent } from "../content/es/contact";

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contacto | Underflow Labs"
        description="Escribinos para evaluar websites orientados a conversión o automatizaciones para tu operación."
        path="/contacto"
      />
      <header className="border-b border-border-base py-16 sm:py-20">
        <div className="site-container">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">{contactContent.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight sm:text-5xl">{contactContent.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-text-secondary">{contactContent.description}</p>
        </div>
      </header>
      <ContactFormSection />
    </>
  );
}
