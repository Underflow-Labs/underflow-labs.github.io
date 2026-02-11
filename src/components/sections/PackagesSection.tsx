import { packages } from "../../content/es/home";
import { BOOK_CALL_URL } from "../../config/links";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

export function PackagesSection() {
  return (
    <section className="border-y border-border-base bg-bg-elevated py-16 sm:py-20">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="Paquetes"
          title="Opciones de trabajo productizadas para avanzar sin fricción."
          body="Mostramos alcance y tiempos estimados. El detalle final se ajusta a tu contexto."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="rounded-2xl border border-border-base bg-bg-surface p-6">
              <p className="font-heading text-2xl text-text-primary">{item.name}</p>
              <p className="mt-1 text-sm text-accent-primary">{item.duration}</p>
              <p className="mt-4 text-sm text-text-secondary">{item.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {item.includes.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <a href={BOOK_CALL_URL} className="inline-flex">
          <Button variant="outline">Quiero evaluar el paquete correcto</Button>
        </a>
      </div>
    </section>
  );
}
