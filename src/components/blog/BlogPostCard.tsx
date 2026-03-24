import { Link } from "react-router-dom";
import { formatDateLabel } from "../../lib/date";
import type { BlogPostSummary } from "../../lib/blog-types";

type BlogPostCardProps = {
  post: BlogPostSummary;
  variant?: "default" | "featured";
};

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  const isFeatured = variant === "featured";
  const visibleTags = post.tags.slice(0, isFeatured ? 4 : 3);
  const hiddenTagsCount = Math.max(post.tags.length - visibleTags.length, 0);

  return (
    <article
      className={[
        "group flex h-full flex-col rounded-[2rem] border border-border-base bg-bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-hover",
        isFeatured ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-7",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-muted">
        <span className="rounded-full border border-border-base px-3 py-1 text-accent-primary">
          {post.category}
        </span>
        <span>{formatDateLabel(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min</span>
      </div>

      <div
        className={[
          isFeatured ? "mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end" : "mt-5",
        ].join(" ")}
      >
        <div>
          <h3
            className={[
              "font-heading font-bold leading-tight text-text-primary",
              isFeatured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl",
            ].join(" ")}
          >
            <Link to={post.path} className="transition-colors hover:text-accent-primary">
              {post.title}
            </Link>
          </h3>

          <p
            className={[
              "mt-4 max-w-3xl leading-relaxed text-text-secondary",
              isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base",
            ].join(" ")}
          >
            {post.excerpt}
          </p>
        </div>

        {isFeatured ? (
          <div className="rounded-2xl border border-border-base bg-bg-primary p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Lectura breve
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Un articulo corto para ordenar el tema, entender la oportunidad y bajarla a una
              implementacion concreta.
            </p>
            <p className="mt-4 text-sm font-semibold text-text-primary">Por {post.author}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border-base px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-text-secondary"
          >
            {tag}
          </span>
        ))}
        {hiddenTagsCount > 0 ? (
          <span className="rounded-full border border-border-base px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-text-muted">
            +{hiddenTagsCount}
          </span>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border-base pt-6">
        <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Por {post.author}</p>
        <Link
          to={post.path}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary transition-colors hover:text-text-primary"
        >
          Leer articulo
          <span aria-hidden="true">{"->"}</span>
        </Link>
      </div>
    </article>
  );
}
