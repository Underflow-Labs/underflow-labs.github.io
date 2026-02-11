import { ServiceDetailSection } from "../components/sections/ServiceDetailSection";
import { PageMeta } from "../components/seo/PageMeta";
import { websitesService } from "../content/es/services";

export function WebsitesServicePage() {
  return (
    <>
      <PageMeta
        title="Servicio de Websites | Underflow Labs"
        description="Rediseñamos o construimos websites rápidos, confiables y orientados a conversión para empresas en crecimiento."
        path="/servicios/websites"
      />
      <ServiceDetailSection {...websitesService} />
    </>
  );
}
