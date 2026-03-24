import { Link } from "react-router-dom";
import { BlogPostCard } from "../components/blog/BlogPostCard";
import { PageMeta } from "../components/seo/PageMeta";
import { getAllBlogPosts } from "../lib/blog";
import { buildBlogSchema, buildBreadcrumbSchema } from "../lib/seo";

export function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <>
      <PageMeta
        title="Blog GEO y SEO | Underflow Labs"
        description="Articulos sobre GEO, SEO, automatizacion, websites y sistemas comerciales para empresas que quieren crecer con mejor infraestructura digital."
        path="/blog"
        keywords={["GEO", "SEO", "automatizacion", "websites", "software a medida"]}
        schema={[
          buildBlogSchema(posts.slice(0, 12)),
          buildBreadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <section className="border-b border-border-base py-16 sm:py-20">
        <div className="site-container">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-alt">Editorial</p>
          <h1 className="mt-4 max-w-5xl font-heading text-4xl leading-tight text-text-primary sm:text-6xl">
            GEO, SEO, automatizacion y sistemas que ayudan a vender mejor.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Este blog esta pensado para construir autoridad tematica, capturar demanda organica y
            conectar preguntas de negocio con soluciones reales en websites, automatizaciones y
            software.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/servicios"
              className="signal-sweep inline-flex items-center justify-center rounded-xl bg-accent-primary px-5 py-3 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5"
            >
              Ver servicios
            </Link>
            <a
              href="/rss.xml"
              className="inline-flex items-center justify-center rounded-xl border border-border-base px-5 py-3 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:border-border-hover hover:bg-bg-surface"
            >
              RSS del blog
            </a>
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="section-spacing">
          <div className="site-container">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                Articulo destacado
              </p>
              <span className="text-xs uppercase tracking-[0.14em] text-text-muted">
                {posts.length} articulos publicados
              </span>
            </div>

            <BlogPostCard post={featuredPost} variant="featured" />
          </div>
        </section>
      ) : null}

      <section className="pb-20 sm:pb-24">
        <div className="site-container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="font-heading text-3xl text-text-primary sm:text-4xl">Ultimos articulos</h2>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
              Cada articulo se publica con metadata estructurada, rutas limpias y assets GEO/SEO
              generados automaticamente.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
