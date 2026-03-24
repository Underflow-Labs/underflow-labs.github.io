const items = [
  "Websites",
  "Automatización",
  "Software",
  "Estrategia",
  "Crecimiento",
  "Resultados",
  "Impacto",
];

const allItems = [...items, ...items];

export function MarqueeBanner() {
  return (
    <div
      className="overflow-hidden border-y border-border-base/50 py-5 select-none"
      aria-hidden="true"
    >
      <div className="marquee-inner flex items-center whitespace-nowrap">
        {allItems.map((item, i) => (
          <span key={i} className="marquee-word font-heading text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            {item}
            <span className="mx-6 text-lg text-accent-primary sm:mx-10">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
