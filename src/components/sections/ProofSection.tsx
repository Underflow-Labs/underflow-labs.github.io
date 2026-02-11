import { proofTemplates } from "../../content/es/home";
import { Panel } from "../ui/Panel";
import { SectionHeading } from "../ui/SectionHeading";

export function ProofSection() {
  return (
    <section className="border-y border-border-base bg-bg-elevated py-16 sm:py-20">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="Proof"
          title="Estructura de casos lista para mostrar evidencia."
          body="No inventamos resultados. Estos bloques están preparados para reemplazarse por casos reales validados."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {proofTemplates.map((item) => (
            <Panel key={item.title} className="space-y-4">
              <div className="inline-flex rounded-full border border-border-base bg-bg-elevated px-3 py-1 text-xs text-text-secondary">
                {item.tag}
              </div>
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">Problema</p>
                <p className="mt-2 text-sm text-text-secondary">{item.challenge}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">Qué hicimos</p>
                <p className="mt-2 text-sm text-text-secondary">{item.approach}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary">Resultado</p>
                <p className="mt-2 text-sm text-text-primary">{item.outcome}</p>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
