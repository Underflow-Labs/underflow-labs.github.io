import { Link, useParams } from "react-router-dom";
import { BlogPostCard } from "../components/blog/BlogPostCard";
import { PageMeta } from "../components/seo/PageMeta";
import { getBlogAuthor } from "../content/blog/authors";
import { getBlogPost, getBlogPostSummary, getRelatedBlogPosts } from "../lib/blog";
import { formatDateLabel } from "../lib/date";
import { buildBlogPostingSchema, buildBreadcrumbSchema } from "../lib/seo";

function getServiceRecommendation(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("automat")) {
    return {
      path: "/servicios/automatizaciones",
      label: "Ver servicio de automatizaciones",
    };
  }

  if (normalized.includes("website")) {
    return {
      path: "/servicios/websites",
      label: "Ver servicio de websites",
    };
  }

  return {
    path: "/servicios",
    label: "Ver todos los servicios",
  };
}

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const summary = getBlogPostSummary(slug);
  const post = summary ? getBlogPost(summary.slug) : null;
  const author = post?.authorProfile ?? (summary ? getBlogAuthor(summary.author) : null);
  const relatedPosts = summary ? getRelatedBlogPosts(summary.slug, 3) : [];
  const serviceRecommendation = summary ? getServiceRecommendation(summary.category) : null;

  if (!summary || !author || !serviceRecommendation) {
    return (
      <>
        <PageMeta
          title="Articulo no encontrado | Underflow Labs"
          description="El articulo que buscas no existe o fue movido."
          path="/blog"
          robots="noindex,follow"
        />

        <section className="section-spacing">
          <div className="site-container max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-alt">
              Blog
            </p>
            <h1 className="mt-4 font-heading text-4xl text-text-primary sm:text-5xl">
              No encontramos ese articulo.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-text-secondary">
              Puede que la URL haya cambiado o que el contenido haya sido retirado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/blog"
                className="signal-sweep inline-flex items-center justify-center rounded-xl bg-accent-primary px-5 py-3 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5"
              >
                Volver al blog
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-xl border border-border-base px-5 py-3 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:border-border-hover hover:bg-bg-surface"
              >
                Hablar con el equipo
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={`${summary.title} | Underflow Labs`}
        description={summary.description}
        path={summary.path}
        type="article"
        author={author.name}
        publishedTime={summary.publishedAt}
        modifiedTime={summary.updatedAt}
        keywords={summary.tags}
        schema={[
          buildBlogPostingSchema(summary, author),
          buildBreadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: summary.title, path: summary.path },
          ]),
        ]}
      />

      <section className="border-b border-border-base py-16 sm:py-20">
        <div className="site-container max-w-5xl">
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-accent-primary"
          >
            {"<- Volver al blog"}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-muted">
            <span className="rounded-full border border-border-base px-3 py-1 text-accent-primary">
              {summary.category}
            </span>
            <span>{formatDateLabel(summary.publishedAt)}</span>
            <span>{summary.readingTimeMinutes} min de lectura</span>
          </div>

          <h1 className="mt-6 max-w-4xl font-heading text-4xl leading-tight text-text-primary sm:text-6xl">
            {summary.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {summary.description}
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article className="min-w-0">
            <div className="rounded-3xl border border-border-base bg-bg-surface p-6 sm:p-8 lg:p-10">
              {post ? (
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              ) : (
                <p className="text-base leading-relaxed text-text-secondary">
                  No pudimos cargar el contenido del articulo en este momento.
                </p>
              )}
            </div>
          </article>

          <aside className="space-y-4">
            <section className="rounded-3xl border border-border-base bg-bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Autor
              </p>
              <div className="mt-4 flex items-start gap-4">
                <img
                  src={author.image}
                  alt={author.name}
                  className="h-16 w-16 rounded-2xl object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-heading text-xl text-text-primary">{author.name}</p>
                  <p className="text-sm text-accent-primary">{author.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{author.bio}</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-border-base bg-bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Tema
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {summary.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-base px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border-base bg-bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Aplicarlo en tu empresa
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Si quieres llevar esta idea a un sistema real, podemos ayudarte a bajarla a
                procesos, website o automatizacion.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to={serviceRecommendation.path}
                  className="signal-sweep inline-flex items-center justify-center rounded-xl bg-accent-primary px-5 py-3 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5"
                >
                  {serviceRecommendation.label}
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-xl border border-border-base px-5 py-3 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:border-border-hover hover:bg-bg-surface"
                >
                  Hablar con el equipo
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="pb-20 sm:pb-24">
          <div className="site-container">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                  Continuar leyendo
                </p>
                <h2 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">
                  Articulos relacionados
                </h2>
              </div>
              <Link
                to="/blog"
                className="text-sm font-semibold text-accent-primary transition-colors hover:text-text-primary"
              >
                Ver todo el blog
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
