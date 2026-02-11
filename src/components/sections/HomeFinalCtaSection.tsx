import { Link } from "react-router-dom";
import { finalCta } from "../../content/es/home";
import { BOOK_CALL_URL } from "../../config/links";
import { Button } from "../ui/Button";

export function HomeFinalCtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <div className="rounded-2xl border border-border-base bg-bg-surface p-8 sm:p-10">
          <h2 className="max-w-4xl font-heading text-3xl leading-tight sm:text-4xl">{finalCta.title}</h2>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">{finalCta.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BOOK_CALL_URL}>
              <Button variant="primary">{finalCta.primaryCta}</Button>
            </a>
            <Link to="/contacto">
              <Button variant="outline">{finalCta.secondaryCta}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
