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
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-heading text-3xl leading-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{body}</p>
      ) : null}
    </div>
  );
}
