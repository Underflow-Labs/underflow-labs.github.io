import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../config/links";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function PageMeta({
  title,
  description,
  path,
  type = "website",
  image = "/logo.png",
  imageAlt,
  imageWidth,
  imageHeight,
  keywords,
  robots = "index,follow",
  author = "Underflow Labs",
  publishedTime,
  modifiedTime,
  schema,
}: PageMetaProps) {
  const canonical = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="author" content={author} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" type="application/rss+xml" title="Underflow Labs Blog" href={`${SITE_URL}/rss.xml`} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content="Underflow Labs" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      {imageWidth ? <meta property="og:image:width" content={String(imageWidth)} /> : null}
      {imageHeight ? <meta property="og:image:height" content={String(imageHeight)} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}

      {type === "article" && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {type === "article" && modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}
      {type === "article" && author ? <meta property="article:author" content={author} /> : null}

      {schemas.map((entry, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
