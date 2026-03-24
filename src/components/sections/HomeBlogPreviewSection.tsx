import { Link } from "react-router-dom";
import { getRecentBlogPosts } from "../../lib/blog";
import { BlogPostCard } from "../blog/BlogPostCard";
import { SectionHeading } from "../ui/SectionHeading";

export function HomeBlogPreviewSection() {
  const latestPosts = getRecentBlogPosts(3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing border-t border-border-base/50">
      <div className="site-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Contenido pensado para GEO, SEO y demanda organica real."
            body="Publicamos articulos para atacar preguntas de alta intencion, reforzar autoridad tematica y conectar el contenido editorial con los servicios."
          />

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-border-base px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-hover hover:bg-bg-surface"
          >
            Ver todos los articulos
            <span aria-hidden="true">{"->"}</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
