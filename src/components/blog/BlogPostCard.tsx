import { Link } from "react-router-dom";
import { formatDateLabel } from "../../lib/date";
import type { BlogPostSummary } from "../../lib/blog-types";

type BlogPostCardProps = {
  post: BlogPostSummary;
  variant?: "default" | "featured";
};

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={[
        "group h-full rounded-3xl border border-border-base bg-bg-surface transition-transform duration-200 hover:-translate-y-1",
        isFeatured ? "p-8 sm:p-10" : "p-6",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-muted">
        <span className="rounded-full border border-border-base px-3 py-1 text-accent-primary">
          {post.category}
        </span>
        <span>{formatDateLabel(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min</span>
      </div>

      <h3
        className={[
          "mt-5 font-heading font-bold leading-tight text-text-primary",
          isFeatured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl",
        ].join(" ")}
      >
        <Link to={post.path} className="hover:text-accent-primary">
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

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border-base/80 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={post.path}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-primary transition-colors hover:text-text-primary"
      >
        Leer articulo
        <span aria-hidden="true">{"->"}</span>
      </Link>
    </article>
  );
}
