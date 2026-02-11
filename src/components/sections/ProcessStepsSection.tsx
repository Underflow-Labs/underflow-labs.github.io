import { processSteps } from "../../content/es/home";
import { SectionHeading } from "../ui/SectionHeading";

export function ProcessStepsSection() {
  return (
    <section id="proceso" className="py-16 sm:py-20">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo trabajamos: simple, visible y enfocado en resultados."
          body="Un método corto para avanzar rápido sin perder calidad."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item) => (
            <article key={item.step} className="rounded-2xl border border-border-base bg-bg-surface p-5">
              <p className="font-mono text-xs tracking-[0.16em] text-accent-alt">{item.step}</p>
              <h3 className="mt-2 font-heading text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
