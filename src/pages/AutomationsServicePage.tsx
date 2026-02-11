import { ServiceDetailSection } from "../components/sections/ServiceDetailSection";
import { PageMeta } from "../components/seo/PageMeta";
import { automationsService } from "../content/es/services";

export function AutomationsServicePage() {
  return (
    <>
      <PageMeta
        title="Servicio de Automatizaciones | Underflow Labs"
        description="Automatizamos procesos con IA aplicada e integraciones para reducir trabajo manual y mejorar operación."
        path="/servicios/automatizaciones"
      />
      <ServiceDetailSection {...automationsService} />
    </>
  );
}
