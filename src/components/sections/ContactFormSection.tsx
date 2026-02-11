import { FormEvent, useState } from "react";
import { contactContent } from "../../content/es/contact";
import { BOOK_CALL_URL, CONTACT_EMAIL } from "../../config/links";
import { Button } from "../ui/Button";

type FormState = "idle" | "busy" | "done";

export function ContactFormSection() {
  const [state, setState] = useState<FormState>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("busy");
    window.setTimeout(() => setState("done"), 1000);
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="site-container grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border-base bg-bg-surface p-6 sm:p-8">
          <h2 className="font-heading text-2xl">{contactContent.formTitle}</h2>
          <p className="mt-2 text-sm text-text-secondary">{contactContent.formIntro}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-text-secondary">Nombre</span>
              <input
                required
                className="w-full rounded-lg border border-border-base bg-bg-elevated px-3 py-2 text-text-primary outline-none transition-colors focus:border-border-hover"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-text-secondary">Email corporativo</span>
              <input
                required
                type="email"
                className="w-full rounded-lg border border-border-base bg-bg-elevated px-3 py-2 text-text-primary outline-none transition-colors focus:border-border-hover"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-text-secondary">Empresa</span>
              <input
                required
                className="w-full rounded-lg border border-border-base bg-bg-elevated px-3 py-2 text-text-primary outline-none transition-colors focus:border-border-hover"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-text-secondary">Servicio de interés</span>
              <select
                required
                className="w-full rounded-lg border border-border-base bg-bg-elevated px-3 py-2 text-text-primary outline-none transition-colors focus:border-border-hover"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                <option value="websites">Websites</option>
                <option value="automatizaciones">Automatizaciones</option>
                <option value="ambos">Ambos</option>
              </select>
            </label>
          </div>

          <label className="mt-4 block space-y-2 text-sm">
            <span className="text-text-secondary">¿Qué querés mejorar?</span>
            <textarea
              required
              rows={5}
              className="w-full rounded-lg border border-border-base bg-bg-elevated px-3 py-2 text-text-primary outline-none transition-colors focus:border-border-hover"
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" isBusy={state === "busy"} type="submit">
              Enviar consulta
            </Button>
            <a href={BOOK_CALL_URL}>
              <Button variant="outline" type="button">
                Agendar llamada
              </Button>
            </a>
          </div>

          {state === "done" ? (
            <p className="mt-4 text-sm text-accent-primary">{contactContent.success}</p>
          ) : null}
        </form>

        <aside className="space-y-4">
          <article className="rounded-2xl border border-border-base bg-bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">Qué sigue</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text-secondary">
              <li>Revisión de tu caso y objetivos.</li>
              <li>Respuesta con propuesta de próximo paso.</li>
              <li>Definición de alcance y cronograma.</li>
            </ol>
          </article>
          <article className="rounded-2xl border border-border-base bg-bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">Contacto directo</p>
            <p className="mt-3 text-sm text-text-secondary">
              Si preferís, escribinos a <a className="text-accent-primary" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
}
