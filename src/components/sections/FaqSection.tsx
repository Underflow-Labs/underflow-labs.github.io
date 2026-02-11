import { faqs } from "../../content/es/home";
import { SectionHeading } from "../ui/SectionHeading";

export function FaqSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Respuestas rápidas a dudas comunes antes de empezar."
          body="Si necesitás más detalle, lo resolvemos en llamada."
        />

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-border-base bg-bg-surface p-5 open:border-border-hover"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-text-primary">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
