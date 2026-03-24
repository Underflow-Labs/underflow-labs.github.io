import fs from "node:fs";
import path from "node:path";
import { marked, Renderer } from "marked";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");
const GENERATED_DIR = path.join(ROOT, "src", "generated");
const PUBLIC_DIR = path.join(ROOT, "public");

const SITE_URL = "https://www.underflowlabs.com";
const SITE_NAME = "Underflow Labs";
const BLOG_TITLE = "Blog de GEO, SEO y automatizacion de Underflow Labs";
const BLOG_DESCRIPTION =
  "Ideas practicas sobre GEO, SEO, automatizacion y websites de conversion para empresas que quieren crecer con mejor sistema comercial.";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/servicios", priority: "0.9", changefreq: "weekly" },
  { path: "/servicios/websites", priority: "0.9", changefreq: "weekly" },
  { path: "/servicios/automatizaciones", priority: "0.9", changefreq: "weekly" },
  { path: "/servicios/software", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
  { path: "/contacto", priority: "0.8", changefreq: "weekly" },
];

const SERVICE_SUMMARIES = [
  {
    name: "Websites de conversion",
    path: "/servicios/websites",
    summary:
      "Diseno y desarrollo de websites pensados para captar demanda, explicar mejor la propuesta de valor y convertir trafico en reuniones.",
  },
  {
    name: "Automatizacion inteligente",
    path: "/servicios/automatizaciones",
    summary:
      "Integraciones, agentes y automatizaciones para eliminar tareas repetitivas, acelerar la operacion y ganar trazabilidad.",
  },
  {
    name: "Software a medida",
    path: "/servicios/software",
    summary:
      "Herramientas internas, portales y productos propios desarrollados con foco en escalabilidad, mantenibilidad e impacto operativo.",
  },
];

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const markdownRenderer = new Renderer();

markdownRenderer.heading = function heading({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const id = slugify(text);
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

markdownRenderer.link = function link({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  const isExternal = /^https?:\/\//i.test(href);
  const attributes = [`href="${href}"`];

  if (title) {
    attributes.push(`title="${title}"`);
  }

  if (isExternal) {
    attributes.push('target="_blank"');
    attributes.push('rel="noreferrer"');
  }

  return `<a ${attributes.join(" ")}>${text}</a>`;
};

markdownRenderer.image = function image({ href, title, text }) {
  const titleAttribute = title ? ` title="${title}"` : "";
  return `<img src="${href}" alt="${text}" loading="lazy" decoding="async"${titleAttribute} />`;
};

marked.use({
  gfm: true,
  breaks: false,
  renderer: markdownRenderer,
});

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}...`;
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/\*/g, "")
    .replace(/_/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseScalar(rawValue) {
  const normalized = rawValue.trim();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return normalized;
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { data: {}, body: normalized.trim() };
  }

  const endIndex = normalized.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    throw new Error("Frontmatter mal formado.");
  }

  const frontmatterBlock = normalized.slice(4, endIndex);
  const body = normalized.slice(endIndex + 5).trim();
  const data = {};

  for (const line of frontmatterBlock.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1);
    data[key] =
      key === "tags"
        ? value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : parseScalar(value);
  }

  return { data, body };
}

function getFirstParagraph(body) {
  const paragraphs = body
    .split(/\n\s*\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => stripMarkdown(chunk))
    .filter(Boolean);

  return paragraphs.find((paragraph) => paragraph.length > 0) ?? "";
}

function getReadingTime(body) {
  const wordCount = stripMarkdown(body)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 210));
}

function renderMarkdownToHtml(markdown) {
  return marked.parse(markdown);
}

function assertRequired(data, key, fileName) {
  if (!data[key] || (typeof data[key] === "string" && !data[key].trim())) {
    throw new Error(`El archivo ${fileName} no tiene el campo obligatorio "${key}".`);
  }
}

function loadBlogPosts() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort();

  const posts = files.map((fileName) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
    const { data, body } = parseFrontmatter(raw);

    assertRequired(data, "title", fileName);
    assertRequired(data, "description", fileName);
    assertRequired(data, "author", fileName);
    assertRequired(data, "category", fileName);
    assertRequired(data, "publishedAt", fileName);

    const slug = typeof data.slug === "string" && data.slug ? data.slug : slugify(data.title);
    const excerptSource =
      typeof data.excerpt === "string" && data.excerpt ? data.excerpt : getFirstParagraph(body);
    const tags = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string" && data.tags
        ? [data.tags]
        : [];

    return {
      title: String(data.title),
      slug,
      description: String(data.description),
      excerpt: truncate(excerptSource, 200),
      author: String(data.author),
      category: String(data.category),
      tags,
      publishedAt: String(data.publishedAt),
      updatedAt: String(data.updatedAt ?? data.publishedAt),
      featured: Boolean(data.featured),
      readingTimeMinutes: getReadingTime(body),
      body,
      html: renderMarkdownToHtml(body),
      sourcePath: fileName,
      path: `/blog/${slug}`,
    };
  });

  return posts.sort((left, right) => {
    if (left.publishedAt === right.publishedAt) {
      return left.title.localeCompare(right.title);
    }

    return right.publishedAt.localeCompare(left.publishedAt);
  });
}

function writeBlogManifest(posts) {
  ensureDir(GENERATED_DIR);

  const manifestPath = path.join(GENERATED_DIR, "blog-manifest.ts");
  const content = `export const blogManifest = ${JSON.stringify(posts, null, 2)} as const;\n`;

  fs.writeFileSync(manifestPath, content, "utf8");
}

function toPublicSummary(post) {
  const { body, html, sourcePath, ...summary } = post;
  return summary;
}

function writeBlogIndexJson(posts) {
  const outputPath = path.join(PUBLIC_DIR, "blog-index.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(posts.map(toPublicSummary), null, 2)}\n`, "utf8");
}

function writeSitemap(posts) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const route of STATIC_ROUTES) {
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}${route.path}</loc>`);
    lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
    lines.push(`    <priority>${route.priority}</priority>`);
    lines.push("  </url>");
  }

  for (const post of posts) {
    lines.push("  <url>");
    lines.push(`    <loc>${SITE_URL}${post.path}</loc>`);
    lines.push("    <changefreq>weekly</changefreq>");
    lines.push("    <priority>0.7</priority>");
    lines.push(`    <lastmod>${post.updatedAt}</lastmod>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), `${lines.join("\n")}\n`, "utf8");
}

function writeRss(posts) {
  const items = posts
    .map((post) => {
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${SITE_URL}${post.path}</link>`,
        `      <guid>${SITE_URL}${post.path}</guid>`,
        `      <pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <author>hola@underflowlabs.com (${escapeXml(post.author)})</author>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<rss version=\"2.0\">",
    "  <channel>",
    `    <title>${escapeXml(BLOG_TITLE)}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    "    <language>es-ar</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), `${rss}\n`, "utf8");
}

function writeLlmsTxt(posts) {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> Estudio de ingenieria digital en Buenos Aires. Disenamos websites que convierten, automatizamos procesos y desarrollamos software a medida.",
    "",
    "## Paginas principales",
    `- [Inicio](${SITE_URL}/): posicionamiento, propuesta de valor y CTA principal.`,
    `- [Servicios](${SITE_URL}/servicios): vista general de websites, automatizacion y software.`,
    `- [Websites](${SITE_URL}/servicios/websites): servicio para captacion, conversion y presencia digital.`,
    `- [Automatizaciones](${SITE_URL}/servicios/automatizaciones): integraciones, agentes y automatizacion operativa.`,
    `- [Software a medida](${SITE_URL}/servicios/software): desarrollo de plataformas, herramientas internas y productos.`,
    `- [Contacto](${SITE_URL}/contacto): formulario y CTA comercial.`,
    `- [Blog](${SITE_URL}/blog): articulos sobre GEO, SEO, automatizacion, software y conversion.`,
    "",
    "## Articulos recientes",
    ...posts.slice(0, 12).map((post) => `- [${post.title}](${SITE_URL}${post.path}): ${post.description}`),
    "",
  ];

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), lines.join("\n"), "utf8");
}

function writeLlmsFullTxt(posts) {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    "## Resumen",
    "Underflow Labs ayuda a empresas a vender mejor y operar con menos friccion mediante websites orientados a conversion, automatizacion y software a medida.",
    "",
    "## Servicios",
    ...SERVICE_SUMMARIES.flatMap((service) => [
      `### ${service.name}`,
      `- URL: ${SITE_URL}${service.path}`,
      `- Resumen: ${service.summary}`,
      "",
    ]),
    "## Blog",
    `- URL principal: ${SITE_URL}/blog`,
    `- RSS: ${SITE_URL}/rss.xml`,
    `- Indice JSON: ${SITE_URL}/blog-index.json`,
    "",
    "## Articulos",
    ...posts.flatMap((post) => [
      `### ${post.title}`,
      `- URL: ${SITE_URL}${post.path}`,
      `- Publicado: ${post.publishedAt}`,
      `- Actualizado: ${post.updatedAt}`,
      `- Autor: ${post.author}`,
      `- Categoria: ${post.category}`,
      `- Tags: ${post.tags.join(", ")}`,
      `- Resumen: ${post.description}`,
      "",
    ]),
  ];

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), lines.join("\n"), "utf8");
}

function main() {
  ensureDir(PUBLIC_DIR);
  const posts = loadBlogPosts();

  writeBlogManifest(posts);
  writeBlogIndexJson(posts);
  writeSitemap(posts);
  writeRss(posts);
  writeLlmsTxt(posts);
  writeLlmsFullTxt(posts);

  console.log(`Contenido sincronizado: ${posts.length} articulos procesados.`);
}

main();
