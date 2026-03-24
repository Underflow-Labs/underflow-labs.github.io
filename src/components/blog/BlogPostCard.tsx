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
        "group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border-base bg-bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-hover",
        isFeatured ? "p-4 sm:p-5 lg:p-6" : "p-3 sm:p-4",
      ].join(" ")}
    >
      {isFeatured ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,420px)] lg:items-center">
          <div className="order-2 px-2 pb-2 pt-1 lg:order-1 lg:px-3 lg:pb-3">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-muted">
              <span className="rounded-full border border-border-base px-3 py-1 text-accent-primary">
                {post.category}
              </span>
              <span>{formatDateLabel(post.publishedAt)}</span>
              <span>{post.readingTimeMinutes} min</span>
            </div>

            <h3 className="mt-5 font-heading text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
              <Link to={post.path} className="transition-colors hover:text-accent-primary">
                {post.title}
              </Link>
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {post.excerpt}
            </p>

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

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border-base pt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Por {post.author}</p>
              <Link
                to={post.path}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary transition-colors hover:text-text-primary"
              >
                Leer articulo
                <span aria-hidden="true">{"->"}</span>
              </Link>
            </div>
          </div>

          <Link
            to={post.path}
            className="order-1 block overflow-hidden rounded-[1.75rem] border border-border-base bg-bg-primary lg:order-2"
          >
            <div className="aspect-[1.91/1]">
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </div>
      ) : (
        <>
          <Link
            to={post.path}
            className="block overflow-hidden rounded-[1.6rem] border border-border-base bg-bg-primary"
          >
            <div className="aspect-[1.91/1]">
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </Link>

          <div className="flex flex-1 flex-col px-2 pb-2 pt-5 sm:px-3 sm:pb-3">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-muted">
              <span className="rounded-full border border-border-base px-3 py-1 text-accent-primary">
                {post.category}
              </span>
              <span>{formatDateLabel(post.publishedAt)}</span>
              <span>{post.readingTimeMinutes} min</span>
            </div>

            <h3 className="mt-5 font-heading text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
              <Link to={post.path} className="transition-colors hover:text-accent-primary">
                {post.title}
              </Link>
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              {post.excerpt}
            </p>

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
          </div>
        </>
      )}
    </article>
  );
}
