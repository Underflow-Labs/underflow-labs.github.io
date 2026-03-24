import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { BOOK_CALL_URL } from "../../config/links";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

function lineTransition(delay: number, reduced: boolean) {
  return reduced ? { duration: 0 } : { duration: 0.95, delay, ease: easing };
}

export function HomeHeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;

  return (
    <section className="hero-video-section relative flex min-h-screen flex-col overflow-hidden">
      {/* ── Video background ── */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/video_silence.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay layers — warm tones ── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(26, 24, 20, 0.58)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,24,20,1) 0%, rgba(26,24,20,0.3) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(26,24,20,0.75) 0%, rgba(26,24,20,0.3) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="site-container relative z-20 flex flex-1 flex-col justify-end pb-16 pt-32 sm:pb-20 lg:pb-28">

        {/* Eyebrow pill with pulse dot */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={lineTransition(0.2, reduced)}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-border-base bg-bg-surface/50 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-pulse" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
            Underflow Labs — Agencia digital
          </span>
        </motion.div>

        {/* Headline — line 1 */}
        <div className="overflow-hidden">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 72 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lineTransition(0.35, reduced)}
            className="font-heading text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight text-text-primary"
          >
            Ingeniería digital
          </motion.h1>
        </div>

        {/* Headline — line 2 (accent) */}
        <div className="overflow-hidden">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 72 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lineTransition(0.52, reduced)}
            className="block font-heading text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight text-accent-primary"
          >
            para crecer en serio.
          </motion.span>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={lineTransition(0.78, reduced)}
          className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-xs text-sm leading-relaxed text-text-primary/65 sm:text-base">
            Diseñamos websites que convierten, automatizamos procesos y desarrollamos
            software a medida para que tu empresa venda más y opere mejor.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to={BOOK_CALL_URL}
              className="signal-sweep inline-flex items-center justify-center rounded-lg bg-accent-primary px-6 py-3.5 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Agendar diagnóstico gratuito"
            >
              Agendar diagnóstico gratuito
            </Link>
            <a
              href="#que-hacemos"
              className="inline-flex items-center justify-center rounded-lg border border-border-base bg-transparent px-6 py-3.5 text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-border-hover hover:bg-bg-surface"
              aria-label="Ver servicios"
            >
              Ver servicios
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-muted">
          Scroll
        </span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
