import { HomeBlogPreviewSection } from "../components/sections/HomeBlogPreviewSection";
import { HomeFinalCtaSection } from "../components/sections/HomeFinalCtaSection";
import { HomeHeroSection } from "../components/sections/HomeHeroSection";
import { MarqueeBanner } from "../components/ui/MarqueeBanner";
import { PageMeta } from "../components/seo/PageMeta";
import { ProcessStepsSection } from "../components/sections/ProcessStepsSection";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { ServicesDualSection } from "../components/sections/ServicesDualSection";
import { TeamSection } from "../components/sections/TeamSection";
import { WhyUnderflowSection } from "../components/sections/WhyUnderflowSection";
import { buildProfessionalServiceSchema, buildWebsiteSchema } from "../lib/seo";

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Underflow Labs | Ingenieria digital para empresas"
        description="Disenamos websites que convierten, automatizamos procesos y desarrollamos software a medida para que tu empresa venda mas y opere mejor."
        path="/"
        keywords={["websites que convierten", "automatizacion", "software a medida", "GEO", "SEO"]}
        schema={[buildWebsiteSchema(), buildProfessionalServiceSchema()]}
      />

      <HomeHeroSection />

      <MarqueeBanner />

      <ServicesDualSection />

      <WhyUnderflowSection />

      <ScrollReveal width="100%" variant="slide" delay={0.04} amount={0.18}>
        <ProcessStepsSection />
      </ScrollReveal>

      <TeamSection />

      <HomeBlogPreviewSection />

      <HomeFinalCtaSection />
    </>
  );
}
