import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { processSteps as homeProcessSteps } from "../../content/es/home";

type ProcessStage = {
  step: string;
  title: string;
  body: string;
};

const stages: ProcessStage[] = homeProcessSteps.map((item) => ({
  step: item.step,
  title: item.title,
  body: item.body,
}));

const STAGE_COUNT = stages.length;
const SEGMENT_COUNT = Math.max(STAGE_COUNT - 1, 1);
const FILL_DURATION_SEC = 10;
const FULL_HOLD_SEC = 2;
const RESET_DURATION_SEC = 1.5;
const flowEase = [0.16, 1, 0.3, 1] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getActiveIndexFromProgress(value: number) {
  if (STAGE_COUNT <= 1) return 0;
  return clamp(Math.floor(value * SEGMENT_COUNT + 1e-4), 0, STAGE_COUNT - 1);
}

type RailNodeProps = {
  index: number;
  stageKey: string;
  progress: MotionValue<number>;
  activeIndex: number;
  isResetting: boolean;
  isFullHold: boolean;
  reducedMotion: boolean;
};

function RailNode({
  index,
  stageKey,
  progress,
  activeIndex,
  isResetting,
  isFullHold,
  reducedMotion,
}: RailNodeProps) {
  const isActive = index === activeIndex;
  const isPast = !isResetting && index < activeIndex;
  const isLast = index === STAGE_COUNT - 1;

  const segmentScale = useTransform(progress, (value) => {
    if (index >= STAGE_COUNT - 1) return 0;
    return clamp(value * SEGMENT_COUNT - index, 0, 1);
  });

  return (
    <div className="relative h-8">
      {index < STAGE_COUNT - 1 ? (
        <>
          <span
            className="pointer-events-none absolute left-1/2 top-[calc(50%+6px)] z-0 h-[2px] w-[calc(100%+1rem)] -translate-y-1/2 rounded-full bg-border-base"
            aria-hidden="true"
          />
          <motion.span
            className="pointer-events-none absolute left-1/2 top-[calc(50%+6px)] z-10 h-[2px] w-[calc(100%+1rem)] -translate-y-1/2 origin-left rounded-full bg-accent-primary"
            style={{ scaleX: segmentScale }}
            animate={
              isFullHold && !reducedMotion
                ? {
                    opacity: [1, 0.52, 1],
                    boxShadow: [
                      "0 0 0 rgba(232,255,89,0)",
                      "0 0 10px rgba(232,255,89,0.42)",
                      "0 0 0 rgba(232,255,89,0)",
                    ],
                  }
                : {
                    opacity: 1,
                    boxShadow: "0 0 0 rgba(232,255,89,0)",
                  }
            }
            transition={
              isFullHold && !reducedMotion
                ? { duration: 0.82, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            aria-hidden="true"
          />
        </>
      ) : null}

      <motion.span
        key={stageKey}
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-primary/60"
        initial={false}
        animate={{
          scale: isActive ? 1.14 : 1,
          backgroundColor: isActive
            ? "rgba(232,255,89,0.96)"
            : isPast
              ? "rgba(232,255,89,0.62)"
              : "rgba(240,237,232,0.16)",
          boxShadow:
            isFullHold && isLast && !reducedMotion
              ? [
                  "0 0 14px rgba(232,255,89,0.26)",
                  "0 0 22px rgba(232,255,89,0.46)",
                  "0 0 14px rgba(232,255,89,0.26)",
                ]
              : isActive
                ? "0 0 14px rgba(232,255,89,0.28)"
                : "0 0 0 rgba(232,255,89,0)",
        }}
        transition={
          isFullHold && isLast && !reducedMotion
            ? { duration: 0.82, repeat: Infinity, ease: "easeInOut" }
            : reducedMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: flowEase }
        }
        aria-hidden="true"
      />
    </div>
  );
}

export function ProcessStepsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.35, once: true });
  const reducedMotion = !!useReducedMotion();
  const progress = useMotionValue(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isFullHold, setIsFullHold] = useState(false);
  const resetPhaseRef = useRef(false);

  useEffect(() => {
    if (isInView) setHasEntered(true);
  }, [isInView]);

  useMotionValueEvent(progress, "change", (value) => {
    if (!hasEntered || reducedMotion || resetPhaseRef.current) return;

    const nextIndex = getActiveIndexFromProgress(value);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  useEffect(() => {
    if (!hasEntered || reducedMotion || STAGE_COUNT <= 1) return;

    let cancelled = false;
    let controls: ReturnType<typeof animate> | null = null;
    let waitTimer: number | null = null;

    const runCycle = async () => {
      while (!cancelled) {
        setIsResetting(false);
        setIsFullHold(false);
        resetPhaseRef.current = false;

        controls = animate(progress, 1, {
          duration: FILL_DURATION_SEC,
          ease: "linear",
        });
        await controls;
        if (cancelled) break;

        setActiveIndex(STAGE_COUNT - 1);
        setIsFullHold(true);

        await new Promise<void>((resolve) => {
          waitTimer = window.setTimeout(() => resolve(), FULL_HOLD_SEC * 1000);
        });
        if (cancelled) break;

        setIsResetting(true);
        setIsFullHold(false);
        resetPhaseRef.current = true;
        setActiveIndex(STAGE_COUNT - 1);

        controls = animate(progress, 0, {
          duration: RESET_DURATION_SEC,
          ease: [0.4, 0, 1, 1],
        });
        await controls;
        if (cancelled) break;

        setActiveIndex(0);
      }
    };

    runCycle();

    return () => {
      cancelled = true;
      if (waitTimer) window.clearTimeout(waitTimer);
      controls?.stop();
    };
  }, [hasEntered, progress, reducedMotion]);

  useEffect(() => {
    if (!hasEntered || !reducedMotion) return;

    progress.set(0);
    setActiveIndex(0);
    setIsResetting(false);
    setIsFullHold(false);
    resetPhaseRef.current = false;
  }, [hasEntered, progress, reducedMotion]);

  return (
    <section id="como-trabajamos" ref={sectionRef} className="section-spacing">
      <motion.div
        className="site-container"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={hasEntered || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease: flowEase }}
      >
        <h2 className="max-w-3xl font-heading text-3xl leading-tight text-text-primary sm:text-4xl">Cómo trabajamos</h2>

        <div className="mt-10">
          <div className="mb-8 hidden grid-cols-4 gap-4 lg:grid" aria-hidden="true">
            {stages.map((stage, index) => (
              <RailNode
                key={stage.step}
                stageKey={stage.step}
                index={index}
                progress={progress}
                activeIndex={activeIndex}
                isResetting={isResetting}
                isFullHold={isFullHold}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <ol className="grid gap-4 lg:grid-cols-4" aria-label="Proceso de trabajo">
            {stages.map((stage, index) => {
              const isActive = index === activeIndex;
              const isPast = !isResetting && index < activeIndex;

              return (
                <li key={stage.step} aria-current={isActive ? "step" : undefined}>
                  <motion.article
                    className="h-full rounded-2xl border bg-bg-surface p-5"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.9 : 0.72,
                      y: isActive ? -2 : 0,
                      scale: isActive ? 1.01 : 1,
                      borderColor: isActive
                        ? "rgba(232, 255, 89, 0.42)"
                        : isPast
                          ? "rgba(240, 237, 232, 0.16)"
                          : "rgba(240, 237, 232, 0.08)",
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(232, 255, 89, 0.15), 0 16px 30px rgba(0, 0, 0, 0.2)"
                        : "0 8px 18px rgba(0, 0, 0, 0.14)",
                      filter: isActive
                        ? "saturate(1) brightness(1)"
                        : isPast
                          ? "saturate(0.92) brightness(0.98)"
                          : "saturate(0.8) brightness(0.92)",
                    }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 220, damping: 26, mass: 0.75 }
                    }
                  >
                    <motion.p
                      className="font-mono text-xs tracking-[0.2em] text-accent-alt"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : isPast ? 0.75 : 0.45 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: flowEase }}
                    >
                      {stage.step}
                    </motion.p>
                    <h3 className="mt-2 font-heading text-2xl leading-tight text-text-primary">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{stage.body}</p>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
