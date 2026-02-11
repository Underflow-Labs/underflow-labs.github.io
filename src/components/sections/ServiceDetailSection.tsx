import { Link } from "react-router-dom";
import { BOOK_CALL_URL } from "../../config/links";
import { Button } from "../ui/Button";

type ServiceDetailProps = {
  eyebrow: string;
  title: string;
  description: string;
  outcomesTitle: string;
  outcomes: string[];
  deliverablesTitle: string;
  deliverables: string[];
  cta: string;
  useCasesTitle?: string;
  useCases?: string[];
};

export function ServiceDetailSection({
  eyebrow,
  title,
  description,
  outcomesTitle,
  outcomes,
  deliverablesTitle,
  deliverables,
  cta,
  useCasesTitle,
  useCases,
}: ServiceDetailProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary">{description}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-border-base bg-bg-surface p-6">
            <h2 className="font-heading text-2xl">{outcomesTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border-base bg-bg-surface p-6">
            <h2 className="font-heading text-2xl">{deliverablesTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {useCasesTitle && useCases ? (
          <article className="mt-4 rounded-2xl border border-border-base bg-bg-surface p-6">
            <h2 className="font-heading text-2xl">{useCasesTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
              {useCases.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={BOOK_CALL_URL}>
            <Button variant="primary">{cta}</Button>
          </a>
          <Link to="/contacto">
            <Button variant="outline">Hablar con el equipo</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
