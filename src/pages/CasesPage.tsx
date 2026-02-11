import { CasesTemplateSection } from "../components/sections/CasesTemplateSection";
import { PageMeta } from "../components/seo/PageMeta";
import { casesPage } from "../content/es/cases";

export function CasesPage() {
  return (
    <>
      <PageMeta
        title="Casos | Underflow Labs"
        description="Plantilla de casos y testimonios para documentar resultados reales de websites y automatizaciones."
        path="/casos"
      />
      <header className="border-b border-border-base py-16 sm:py-20">
        <div className="site-container">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">{casesPage.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight sm:text-5xl">{casesPage.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-text-secondary">{casesPage.description}</p>
        </div>
      </header>
      <CasesTemplateSection />
    </>
  );
}
