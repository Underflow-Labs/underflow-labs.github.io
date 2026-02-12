import { FaqSection } from "../components/sections/FaqSection";
import { HomeFinalCtaSection } from "../components/sections/HomeFinalCtaSection";
import { HomeHeroSection } from "../components/sections/HomeHeroSection";
import { PackagesSection } from "../components/sections/PackagesSection";
import { ProcessStepsSection } from "../components/sections/ProcessStepsSection";
import { ServicesDualSection } from "../components/sections/ServicesDualSection";
import { PageMeta } from "../components/seo/PageMeta";

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Underflow Labs | Websites que convierten y automatizaciones"
        description="Diseñamos websites orientados a conversión y automatizaciones con IA aplicada para reducir carga manual y acelerar resultados."
        path="/"
      />
      <HomeHeroSection />
      <ServicesDualSection />
      <ProcessStepsSection />
      <PackagesSection />
      <FaqSection />
      <HomeFinalCtaSection />
    </>
  );
}
