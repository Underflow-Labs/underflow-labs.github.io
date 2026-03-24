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

type ArticleHeading = {
  id: string;
  level: 2 | 3;
  text: string;
};

function stripHtmlTags(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function buildHeadingId(
  text: string,
  usedIds: Map<string, number>,
  fallbackIndex: number,
) {
  const baseId = slugifyHeading(text) || `seccion-${fallbackIndex}`;
  const seen = usedIds.get(baseId) ?? 0;
  const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

  usedIds.set(baseId, seen + 1);

  return id;
}

function decorateArticleHtml(html: string) {
  const usedIds = new Map<string, number>();

  const decoratedHtml = html.replace(/<h([23])>(.*?)<\/h\1>/g, (_, levelValue, innerHtml) => {
    const text = stripHtmlTags(innerHtml);
    const level = Number(levelValue) as 2 | 3;
    const id = buildHeadingId(text, usedIds, level);

    return `<h${level} id="${id}">${innerHtml}</h${level}>`;
  });

  return decoratedHtml;
}

function extractArticleHeadings(html: string) {
  const headings: ArticleHeading[] = [];

  html.replace(/<h([23]) id="([^"]+)">(.*?)<\/h\1>/g, (_, levelValue, id, innerHtml) => {
    headings.push({
      id,
      level: Number(levelValue) as 2 | 3,
      text: stripHtmlTags(innerHtml),
    });

    return "";
  });

  return headings;
}

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const summary = getBlogPostSummary(slug);
  const post = summary ? getBlogPost(summary.slug) : null;
  const author = post?.authorProfile ?? (summary ? getBlogAuthor(summary.author) : null);
  const relatedPosts = summary ? getRelatedBlogPosts(summary.slug, 3) : [];
  const serviceRecommendation = summary ? getServiceRecommendation(summary.category) : null;
  const articleHtml = post ? decorateArticleHtml(post.html) : null;
  const articleHeadings = articleHtml ? extractArticleHeadings(articleHtml) : [];

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
        <div className="site-container max-w-6xl">
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-accent-primary"
          >
            {"<- Volver al blog"}
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-muted">
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

            <div className="rounded-[2rem] border border-border-base bg-bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Ficha del articulo
              </p>
              <div className="mt-5 flex items-center gap-4">
                <img
                  src={author.image}
                  alt={author.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-2xl object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-heading text-xl text-text-primary">{author.name}</p>
                  <p className="text-sm text-accent-primary">{author.role}</p>
                </div>
              </div>

              <dl className="mt-5 space-y-4 border-t border-border-base pt-5">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm text-text-secondary">Publicado</dt>
                  <dd className="text-right text-sm font-semibold text-text-primary">
                    {formatDateLabel(summary.publishedAt)}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm text-text-secondary">Lectura estimada</dt>
                  <dd className="text-right text-sm font-semibold text-text-primary">
                    {summary.readingTimeMinutes} min
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm text-text-secondary">Categoria</dt>
                  <dd className="text-right text-sm font-semibold text-text-primary">
                    {summary.category}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container grid gap-10 xl:grid-cols-[minmax(0,46rem)_320px] xl:justify-between">
          <div className="min-w-0">
            <div className="mb-6 rounded-[1.75rem] border border-border-base bg-bg-surface p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                En una frase
              </p>
              <p className="mt-3 text-base leading-relaxed text-text-secondary sm:text-lg">
                {summary.excerpt}
              </p>
            </div>

            <article className="min-w-0 rounded-[2rem] border border-border-base bg-bg-surface p-6 sm:p-8 lg:p-12">
              {articleHtml ? (
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: articleHtml }} />
              ) : (
                <p className="text-base leading-relaxed text-text-secondary">
                  No pudimos cargar el contenido del articulo en este momento.
                </p>
              )}
            </article>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-28 xl:self-start">
            {articleHeadings.length > 0 ? (
              <section className="rounded-[2rem] border border-border-base bg-bg-surface p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                  En este articulo
                </p>
                <nav className="mt-4 space-y-3">
                  {articleHeadings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={[
                        "block text-sm leading-relaxed text-text-secondary transition-colors hover:text-text-primary",
                        heading.level === 3 ? "pl-4" : "",
                      ].join(" ")}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </section>
            ) : null}

            <section className="rounded-[2rem] border border-border-base bg-bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Firma y temas
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{author.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
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

            <section className="rounded-[2rem] border border-border-base bg-bg-surface p-6">
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
