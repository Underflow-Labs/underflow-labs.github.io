import { Link } from "react-router-dom";
import { serviceCards } from "../../content/es/home";
import { Panel } from "../ui/Panel";
import { SectionHeading } from "../ui/SectionHeading";

export function ServicesDualSection() {
  return (
    <section id="servicios" className="py-16 sm:py-20">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="Servicios"
          title="Dos líneas claras para mejorar ventas y operación."
          body="Elegí el frente más urgente. Podemos trabajar en uno o combinar ambos."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {serviceCards.map((service) => (
            <Panel
              key={service.title}
              className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-border-hover"
            >
              <h3 className="font-heading text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={service.path}
                className="mt-6 inline-block text-sm font-semibold text-accent-primary hover:underline"
              >
                {service.cta}
              </Link>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
