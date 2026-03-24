import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { marked, Renderer } from "marked";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");
const GENERATED_DIR = path.join(ROOT, "src", "generated");
const PUBLIC_DIR = path.join(ROOT, "public");
const BLOG_OG_DIR = path.join(PUBLIC_DIR, "og", "blog");

const SITE_URL = "https://www.underflowlabs.com";
const SITE_NAME = "Underflow Labs";
const BLOG_TITLE = "Blog de GEO, SEO y automatizacion de Underflow Labs";
const BLOG_DESCRIPTION =
  "Ideas practicas sobre GEO, SEO, automatizacion y websites de conversion para empresas que quieren crecer con mejor sistema comercial.";
const BLOG_INDEX_IMAGE = "/og/blog/index.png";

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

const headingFontData = fs
  .readFileSync(
    path.join(
      ROOT,
      "node_modules",
      "@fontsource",
      "syne",
      "files",
      "syne-latin-700-normal.woff",
    ),
  )
  .toString("base64");

const bodyFontData = fs
  .readFileSync(
    path.join(
      ROOT,
      "node_modules",
      "@fontsource",
      "space-grotesk",
      "files",
      "space-grotesk-latin-500-normal.woff",
    ),
  )
  .toString("base64");

const bodyBoldFontData = fs
  .readFileSync(
    path.join(
      ROOT,
      "node_modules",
      "@fontsource",
      "space-grotesk",
      "files",
      "space-grotesk-latin-700-normal.woff",
    ),
  )
  .toString("base64");

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

function resetDir(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
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

function formatDateForCover(value) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${value}T12:00:00Z`))
    .replace(/\./g, "")
    .toUpperCase();
}

function wrapText(value, maxCharsPerLine, maxLines) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= maxCharsPerLine) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(word);
      currentLine = "";
    }

    if (lines.length === maxLines) {
      break;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (!lines.length) {
    lines.push(value);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }

  const consumedWordCount = lines.join(" ").split(/\s+/).filter(Boolean).length;

  if (consumedWordCount < words.length) {
    lines[maxLines - 1] = truncate(lines[maxLines - 1], Math.max(12, maxCharsPerLine - 2));
  }

  return lines;
}

function buildTextBlock({
  lines,
  x,
  y,
  fontSize,
  lineHeight,
  fill,
  fontFamily,
  fontWeight,
  opacity = 1,
}) {
  const tspans = lines
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" opacity="${opacity}">${tspans}</text>`;
}

function getCoverPalette(category) {
  const normalized = category.toLowerCase();

  if (normalized.includes("automat")) {
    return {
      primary: "#E8FF59",
      secondary: "#59B8FF",
      tertiary: "#F5F2EC",
      glow: "#B8FF7A",
    };
  }

  if (normalized.includes("website")) {
    return {
      primary: "#59B8FF",
      secondary: "#E8FF59",
      tertiary: "#F5F2EC",
      glow: "#A5DFFF",
    };
  }

  if (normalized.includes("seo") || normalized.includes("geo")) {
    return {
      primary: "#FFB36B",
      secondary: "#59B8FF",
      tertiary: "#F5F2EC",
      glow: "#FFD7AA",
    };
  }

  if (normalized.includes("software")) {
    return {
      primary: "#8DD8FF",
      secondary: "#E8FF59",
      tertiary: "#F5F2EC",
      glow: "#BEEAFF",
    };
  }

  return {
    primary: "#E8FF59",
    secondary: "#59B8FF",
    tertiary: "#F5F2EC",
    glow: "#FFD7AA",
  };
}

function createCoverSvg({ title, excerpt, category, overline, metaLine }) {
  const palette = getCoverPalette(category);
  const titleFontSize = title.length > 88 ? 48 : title.length > 68 ? 54 : 60;
  const titleLineHeight = titleFontSize + 8;
  const titleLines = wrapText(title, title.length > 88 ? 18 : title.length > 68 ? 20 : 22, 5);
  const excerptLines = wrapText(excerpt, 22, 6);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Syne OG';
        src: url("data:font/woff;base64,${headingFontData}") format("woff");
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: 'Space Grotesk OG';
        src: url("data:font/woff;base64,${bodyFontData}") format("woff");
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: 'Space Grotesk OG';
        src: url("data:font/woff;base64,${bodyBoldFontData}") format("woff");
        font-weight: 700;
        font-style: normal;
      }
    </style>
    <radialGradient id="glow-primary" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1040 82) rotate(127.097) scale(442.723 434.908)">
      <stop stop-color="${palette.primary}" stop-opacity="0.35" />
      <stop offset="1" stop-color="${palette.primary}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-secondary" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(142 538) rotate(19.957) scale(384.933 286.661)">
      <stop stop-color="${palette.secondary}" stop-opacity="0.28" />
      <stop offset="1" stop-color="${palette.secondary}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="accent-line" x1="836" y1="133" x2="1092" y2="133" gradientUnits="userSpaceOnUse">
      <stop stop-color="${palette.primary}" stop-opacity="0.95" />
      <stop offset="1" stop-color="${palette.secondary}" stop-opacity="0.62" />
    </linearGradient>
    <linearGradient id="panel-gradient" x1="820" y1="94" x2="1118" y2="516" gradientUnits="userSpaceOnUse">
      <stop stop-color="rgba(255,255,255,0.08)" />
      <stop offset="1" stop-color="rgba(255,255,255,0.02)" />
    </linearGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(245,242,236,0.08)" stroke-width="1" />
    </pattern>
    <filter id="soft-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="54" />
    </filter>
  </defs>

  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="#15120E" />
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#grid)" opacity="0.42" />
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="rgba(0, 0, 0, 0.18)" />
  <circle cx="1040" cy="82" r="250" fill="url(#glow-primary)" filter="url(#soft-blur)" />
  <circle cx="142" cy="538" r="228" fill="url(#glow-secondary)" filter="url(#soft-blur)" />

  <rect x="60" y="52" width="170" height="40" rx="20" fill="rgba(245,242,236,0.06)" stroke="rgba(245,242,236,0.14)" />
  <text x="86" y="78" fill="${palette.tertiary}" font-family="'Space Grotesk OG'" font-size="15" font-weight="700" letter-spacing="0.18em">${escapeXml(category.toUpperCase())}</text>

  <circle cx="1096" cy="72" r="5" fill="${palette.primary}" />
  <text x="1078" y="79" fill="${palette.tertiary}" font-family="'Space Grotesk OG'" font-size="16" font-weight="700" text-anchor="end">UNDERFLOW LABS</text>

  <rect x="820" y="94" width="320" height="422" rx="30" fill="rgba(245,242,236,0.04)" stroke="rgba(245,242,236,0.12)" />
  <rect x="850" y="132" width="226" height="4" rx="2" fill="url(#accent-line)" />
  <rect x="850" y="468" width="132" height="38" rx="19" fill="rgba(255,255,255,0.06)" stroke="rgba(245,242,236,0.12)" />
  <text x="850" y="172" fill="${palette.primary}" font-family="'Space Grotesk OG'" font-size="15" font-weight="700" letter-spacing="0.18em">RESUMEN</text>
  ${buildTextBlock({
    lines: excerptLines,
    x: 850,
    y: 214,
    fontSize: 20,
    lineHeight: 30,
    fill: palette.tertiary,
    fontFamily: "'Space Grotesk OG'",
    fontWeight: 500,
    opacity: 0.92,
  })}
  <text x="876" y="493" fill="${palette.tertiary}" font-family="'Space Grotesk OG'" font-size="15" font-weight="700" letter-spacing="0.12em">underflowlabs.com</text>

  <path d="M 1018 448 C 1078 418, 1110 372, 1142 280" stroke="${palette.secondary}" stroke-opacity="0.36" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 10" />
  <circle cx="1018" cy="448" r="9" fill="${palette.primary}" fill-opacity="0.18" stroke="${palette.primary}" stroke-width="2" />
  <circle cx="1142" cy="280" r="9" fill="${palette.secondary}" fill-opacity="0.18" stroke="${palette.secondary}" stroke-width="2" />

  <text x="72" y="138" fill="rgba(245,242,236,0.76)" font-family="'Space Grotesk OG'" font-size="16" font-weight="700" letter-spacing="0.16em">${escapeXml(overline.toUpperCase())}</text>
  ${buildTextBlock({
    lines: titleLines,
    x: 72,
    y: 190,
    fontSize: titleFontSize,
    lineHeight: titleLineHeight,
    fill: palette.tertiary,
    fontFamily: "'Syne OG'",
    fontWeight: 700,
  })}
  <rect x="72" y="492" width="300" height="1" fill="rgba(245,242,236,0.12)" />
  <text x="72" y="534" fill="rgba(245,242,236,0.92)" font-family="'Space Grotesk OG'" font-size="24" font-weight="700">${escapeXml(metaLine)}</text>
  <text x="72" y="572" fill="rgba(245,242,236,0.56)" font-family="'Space Grotesk OG'" font-size="18" font-weight="500">Contenido pensado para captacion organica, claridad tecnica y decision comercial.</text>
</svg>`;
}

async function writePngFromSvg(svg, filePath) {
  await sharp(Buffer.from(svg))
    .png({
      compressionLevel: 9,
      quality: 100,
    })
    .toFile(filePath);
}

async function writeBlogIndexCover(posts) {
  const latestPost = posts[0];
  const svg = createCoverSvg({
    title: "Blog GEO, SEO y automatizacion para empresas B2B",
    excerpt:
      "Ideas practicas para convertir contenido en autoridad tematica, visitas cualificadas y conversaciones comerciales mas serias.",
    category: "Editorial",
    overline: `${posts.length} articulos · actualizacion continua`,
    metaLine: latestPost
      ? `Underflow Labs · ultimo update ${formatDateForCover(latestPost.updatedAt)}`
      : "Underflow Labs · underflowlabs.com/blog",
  });

  await writePngFromSvg(svg, path.join(BLOG_OG_DIR, "index.png"));
}

async function writePostCovers(posts) {
  await Promise.all(
    posts.map((post) => {
      const svg = createCoverSvg({
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        overline: `${formatDateForCover(post.publishedAt)} · ${post.readingTimeMinutes} min de lectura`,
        metaLine: `${post.author} · ${SITE_NAME}`,
      });

      return writePngFromSvg(svg, path.join(BLOG_OG_DIR, `${post.slug}.png`));
    }),
  );
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
      coverImage: `/og/blog/${slug}.png`,
      coverAlt: `Portada del articulo ${String(data.title)}`,
      body,
      html: renderMarkdownToHtml(body),
      sourcePath: fileName,
      path: `/blog/${slug}`,
    };
  });

  return posts.sort((left, right) => {
    if (left.publishedAt === right.publishedAt) {
      if (left.featured !== right.featured) {
        return Number(right.featured) - Number(left.featured);
      }

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
        `      <enclosure url="${SITE_URL}${post.coverImage}" type="image/png" />`,
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
    `- Imagen social principal: ${SITE_URL}${BLOG_INDEX_IMAGE}`,
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
      `- Imagen social: ${SITE_URL}${post.coverImage}`,
      "",
    ]),
  ];

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), lines.join("\n"), "utf8");
}

async function main() {
  ensureDir(PUBLIC_DIR);

  const posts = loadBlogPosts();

  resetDir(BLOG_OG_DIR);
  await writeBlogIndexCover(posts);
  await writePostCovers(posts);

  writeBlogManifest(posts);
  writeBlogIndexJson(posts);
  writeSitemap(posts);
  writeRss(posts);
  writeLlmsTxt(posts);
  writeLlmsFullTxt(posts);

  console.log(`Contenido sincronizado: ${posts.length} articulos procesados.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
