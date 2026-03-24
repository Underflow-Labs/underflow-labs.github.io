import { Link } from "react-router-dom";
import { BlogPostCard } from "../components/blog/BlogPostCard";
import { PageMeta } from "../components/seo/PageMeta";
import { getAllBlogPosts } from "../lib/blog";
import { buildBlogSchema, buildBreadcrumbSchema } from "../lib/seo";

export function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;
  const categoryCount = new Set(posts.map((post) => post.category)).size;
  const averageReadingTime =
    posts.length > 0
      ? Math.round(posts.reduce((total, post) => total + post.readingTimeMinutes, 0) / posts.length)
      : 0;

  return (
    <>
      <PageMeta
        title="Blog GEO y SEO | Underflow Labs"
        description="Articulos sobre GEO, SEO, automatizacion, websites y sistemas comerciales para empresas que quieren crecer con mejor infraestructura digital."
        path="/blog"
        image="/og/blog/index.png"
        imageAlt="Portada editorial del blog de Underflow Labs"
        imageWidth={1200}
        imageHeight={630}
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-alt">
                Editorial
              </p>
              <h1 className="mt-4 max-w-5xl font-heading text-4xl leading-tight text-text-primary sm:text-6xl">
                GEO, SEO, automatizacion y sistemas que ayudan a vender mejor.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Un blog para equipos que necesitan entender rapido que hacer con su website, su
                contenido y su operacion digital sin perder tiempo en teoria de relleno.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {featuredPost ? (
                  <Link
                    to={featuredPost.path}
                    className="signal-sweep inline-flex items-center justify-center rounded-xl bg-accent-primary px-5 py-3 text-sm font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Leer articulo destacado
                  </Link>
                ) : null}
                <Link
                  to="/servicios"
                  className="inline-flex items-center justify-center rounded-xl border border-border-base px-5 py-3 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:border-border-hover hover:bg-bg-surface"
                >
                  Ver servicios
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border-base bg-bg-surface p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                    Articulos
                  </p>
                  <p className="mt-3 font-heading text-3xl text-text-primary">{posts.length}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    piezas publicadas con estructura GEO y SEO.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-base bg-bg-surface p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                    Temas activos
                  </p>
                  <p className="mt-3 font-heading text-3xl text-text-primary">{categoryCount}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    frentes de contenido conectados con negocio real.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-base bg-bg-surface p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                    Lectura media
                  </p>
                  <p className="mt-3 font-heading text-3xl text-text-primary">
                    {averageReadingTime || 0} min
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    notas pensadas para entender y actuar rapido.
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-border-base bg-bg-surface p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Que vas a encontrar
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-text-primary">
                Lecturas cortas, utiles y orientadas a decision.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Guias concretas sobre websites, automatizacion, software y captacion organica.",
                  "Articulos pensados para equipos comerciales, operativos y founders B2B.",
                  "Un puente claro entre la pregunta de negocio y el servicio que lo resuelve.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent-primary" />
                    <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="section-spacing">
          <div className="site-container">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                  Empieza por aqui
                </p>
                <h2 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">
                  La lectura recomendada para entrar en contexto.
                </h2>
              </div>
              <span className="max-w-xs text-right text-sm leading-relaxed text-text-secondary">
                Una pieza breve para entender el problema, la oportunidad y como llevarlo a una
                implementacion real.
              </span>
            </div>

            <BlogPostCard post={featuredPost} variant="featured" />
          </div>
        </section>
      ) : null}

      <section className="pb-20 sm:pb-24">
        <div className="site-container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                Biblioteca
              </p>
              <h2 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">
                Ultimos articulos
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
              Cada pieza esta escrita para responder una duda concreta, conectar con una necesidad
              de negocio y fortalecer la autoridad tematica del sitio.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {remainingPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
