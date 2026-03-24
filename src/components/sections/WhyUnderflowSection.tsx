import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SplitHeading } from "../ui/SplitHeading";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const differentiators = [
  { num: "01", text: 'No hacemos "solo diseño": construimos sistemas.' },
  { num: "02", text: "Base técnica sólida y escalable desde el día uno." },
  { num: "03", text: "Pensado para crecimiento a largo plazo." },
  { num: "04", text: "Integraciones reales con tu operación." },
];

export function WhyUnderflowSection() {
  const listRef = useRef<HTMLUListElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-5% 0px" });
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden section-spacing">
      {/* Ghost background text */}
      <span
        className="pointer-events-none select-none absolute -right-4 top-1/2 -translate-y-1/2 font-heading font-bold leading-none text-text-primary"
        style={{ fontSize: "clamp(5rem, 22vw, 13rem)", opacity: 0.042, letterSpacing: "-0.04em" }}
        aria-hidden="true"
      >
        WHY
      </span>

      <div className="site-container">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-24">
          {/* Left: heading + description */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent-alt">
              Por qué elegirnos
            </p>
            <SplitHeading
              as="h2"
              className="font-heading text-3xl font-bold leading-tight text-text-primary sm:text-4xl"
            >
              Por qué Underflow Labs
            </SplitHeading>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-text-primary/65">
              Somos un equipo de ingenieros en sistemas enfocados en resultados reales. No solo
              diseñamos interfaces: construimos soluciones escalables, medibles y bien
              arquitecturadas.
            </p>
          </div>

          {/* Right: feature list */}
          <ul ref={listRef} className="space-y-0" aria-label="Diferenciales de Underflow Labs">
            {differentiators.map((item, i) => (
              <motion.li
                key={item.num}
                initial={reduced ? false : { opacity: 0, x: 18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.52, delay: i * 0.09, ease: easing }}
                className="flex items-start gap-4 border-b border-border-base/60 py-5 first:border-t first:border-border-base/60"
              >
                <span className="mt-0.5 w-7 shrink-0 font-mono text-xs text-text-muted">
                  {item.num}
                </span>
                <p className="text-base leading-relaxed text-text-primary">{item.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
