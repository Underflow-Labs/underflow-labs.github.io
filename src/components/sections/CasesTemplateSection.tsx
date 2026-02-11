import { caseStudyTemplate, testimonialTemplate } from "../../content/es/cases";
import { Panel } from "../ui/Panel";

export function CasesTemplateSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="site-container grid gap-4 lg:grid-cols-2">
        <Panel>
          <p className="inline-flex rounded-full border border-border-base bg-bg-elevated px-3 py-1 text-xs text-text-secondary">
            Placeholder
          </p>
          <h2 className="mt-4 font-heading text-2xl">Template de caso de estudio</h2>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            {caseStudyTemplate.sections.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-accent-primary">{caseStudyTemplate.note}</p>
        </Panel>

        <Panel>
          <p className="inline-flex rounded-full border border-border-base bg-bg-elevated px-3 py-1 text-xs text-text-secondary">
            Placeholder
          </p>
          <h2 className="mt-4 font-heading text-2xl">Template de testimonio</h2>
          <blockquote className="mt-4 border-l-2 border-accent-primary pl-4 text-sm text-text-secondary">
            “{testimonialTemplate.quote}”
          </blockquote>
          <p className="mt-4 text-sm text-text-muted">{testimonialTemplate.attribution}</p>
        </Panel>
      </div>
    </section>
  );
}
