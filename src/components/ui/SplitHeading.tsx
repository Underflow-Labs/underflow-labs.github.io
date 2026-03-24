import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

type HeadingTag = "h1" | "h2" | "h3";

type SplitHeadingProps = {
  as?: HeadingTag;
  className?: string;
  children: string;
  delay?: number;
};

function WordList({
  words,
  inView,
  reduced,
  delay,
}: {
  words: string[];
  inView: boolean;
  reduced: boolean;
  delay: number;
}) {
  return (
    <>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", lineHeight: "1.15" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={reduced ? false : { y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.72, delay: delay + i * 0.058, ease: easing }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function SplitHeading({ as = "h2", className, children, delay = 0 }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = !!useReducedMotion();
  const words = children.split(" ");

  const shared = {
    ref,
    className,
  };
  const content = <WordList words={words} inView={inView} reduced={reduced} delay={delay} />;

  if (as === "h1") return <h1 {...shared}>{content}</h1>;
  if (as === "h3") return <h3 {...shared}>{content}</h3>;
  return <h2 {...shared}>{content}</h2>;
}
