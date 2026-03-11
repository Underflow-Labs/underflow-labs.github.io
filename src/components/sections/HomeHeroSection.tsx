import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { BOOK_CALL_URL } from "../../config/links";
import { WavyBackground } from "../ui/wavy-background";

const primaryCtaClasses =
  "signal-sweep inline-flex items-center justify-center rounded-xl bg-accent-primary px-5 py-3 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5";

const secondaryCtaClasses =
  "inline-flex items-center justify-center rounded-xl border border-border-base bg-transparent px-5 py-3 text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-border-hover hover:bg-bg-surface";

const heroWaveColors = [
  "rgba(175, 220, 101, 0.96)",
  "rgba(175, 220, 101, 0.88)",
  "rgba(119, 207, 186, 0.82)",
  "rgba(254, 255, 255, 0.58)",
  "rgba(175, 220, 101, 0.72)",
];

export function HomeHeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const getTransition = (delay = 0) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.52, delay, ease: easing };

  return (
    <section className="relative overflow-hidden border-b border-border-base/80">
      <WavyBackground
        containerClassName="hero-surface absolute inset-0 pointer-events-none"
        colors={heroWaveColors}
        waveWidth={56}
        backgroundFill="#0c0d0e"
        blur={8}
        speed={prefersReducedMotion ? "slow" : "fast"}
        waveOpacity={0.26}
        aria-hidden="true"
      />

      <div className="hero-readability-mask absolute inset-0 z-10" aria-hidden="true" />
      <div className="hero-readability-vignette absolute inset-0 z-10" aria-hidden="true" />

      <div className="site-container relative z-20 flex min-h-[62vh] flex-col justify-center py-16 sm:py-20 lg:min-h-[72vh]">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition()}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-transparent" aria-hidden="true">
            HOME
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight sm:text-6xl">
            Ingeniería digital para empresas que quieren crecer en serio.
          </h1>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(0.08)}
        >
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Diseñamos websites que convierten, automatizamos procesos y desarrollamos software a medida para que tu
            empresa venda más y opere mejor.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(0.16)}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to={BOOK_CALL_URL} className={primaryCtaClasses} aria-label="Agendar diagnóstico gratuito">
            Agendar diagnóstico gratuito
          </Link>
          <a href="#que-hacemos" className={secondaryCtaClasses} aria-label="Ver servicios">
            Ver servicios
          </a>
        </motion.div>
      </div>
    </section>
  );
}
