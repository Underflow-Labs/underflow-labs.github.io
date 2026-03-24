import { Link } from "react-router-dom";
import { BOOK_CALL_URL } from "../../config/links";
import { SplitHeading } from "../ui/SplitHeading";

const marqueeItems = Array(10).fill("Hablemos");
const allItems = [...marqueeItems, ...marqueeItems];

export function HomeFinalCtaSection() {
  return (
    <section className="relative overflow-hidden section-spacing-lg">
      {/* Ghost background text */}
      <span
        className="pointer-events-none select-none absolute -left-4 top-1/2 -translate-y-1/2 font-heading font-bold leading-none text-text-primary"
        style={{ fontSize: "clamp(6rem, 28vw, 18rem)", opacity: 0.038, letterSpacing: "-0.05em" }}
        aria-hidden="true"
      >
        START
      </span>

      {/* Contact marquee — reversed direction */}
      <div
        className="mb-16 overflow-hidden border-y border-border-base/40 py-5 select-none sm:mb-20"
        aria-hidden="true"
      >
        <div className="marquee-inner-reverse flex items-center whitespace-nowrap">
          {allItems.map((word, i) => (
            <span
              key={i}
              className="marquee-word font-heading text-3xl font-bold uppercase tracking-tight sm:text-5xl"
            >
              {word}
              <span className="mx-6 text-lg text-accent-primary sm:mx-10">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="site-container relative z-10">
        <SplitHeading
          as="h2"
          className="max-w-3xl font-heading text-[clamp(2.8rem,7vw,7rem)] font-bold leading-[0.88] tracking-tight text-text-primary"
          delay={0.1}
        >
          Tu empresa puede operar mejor y vender más.
        </SplitHeading>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            to={BOOK_CALL_URL}
            className="signal-sweep inline-flex items-center gap-2.5 rounded-xl bg-accent-primary px-7 py-4 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Agendar llamada"
          >
            Agendar llamada
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href="#que-hacemos"
            className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
