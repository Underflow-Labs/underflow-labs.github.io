import { Link } from "react-router-dom";
import { homeHero } from "../../content/es/home";
import { BOOK_CALL_URL } from "../../config/links";
import { Button } from "../ui/Button";

export function HomeHeroSection() {
  return (
    <section className="border-b border-border-base py-20 sm:py-24">
      <div className="site-container">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-alt">{homeHero.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight sm:text-6xl">{homeHero.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {homeHero.body}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={BOOK_CALL_URL}>
            <Button variant="primary">{homeHero.primaryCta}</Button>
          </Link>
          <Link to="/servicios/websites">
            <Button variant="outline">{homeHero.secondaryCta}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
