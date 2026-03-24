import { SplitHeading } from "./SplitHeading";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">
          {eyebrow}
        </p>
      ) : null}
      <SplitHeading
        as="h2"
        className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-tight text-text-primary"
      >
        {title}
      </SplitHeading>
      {body ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{body}</p>
      ) : null}
    </div>
  );
}
