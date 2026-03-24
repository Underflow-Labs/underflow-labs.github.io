import { CONTACT_EMAIL, SITE_URL } from "../config/links";
import type { BlogAuthor } from "../content/blog/authors";
import type { BlogPostSummary } from "./blog-types";

const organizationNode = {
  "@type": "Organization",
  name: "Underflow Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT_EMAIL,
};

const BLOG_INDEX_IMAGE = `${SITE_URL}/og/blog/index.png`;

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Underflow Labs",
    url: SITE_URL,
    publisher: organizationNode,
  };
}

export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Underflow Labs",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    areaServed: "Argentina",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    serviceType: [
      "Websites de conversion",
      "Automatizacion inteligente",
      "Software a medida",
    ],
  };
}

export function buildBreadcrumbSchema(
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildBlogSchema(posts: BlogPostSummary[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de GEO, SEO y automatizacion de Underflow Labs",
    url: `${SITE_URL}/blog`,
    description:
      "Articulos practicos sobre GEO, SEO, websites de conversion, automatizacion y software a medida.",
    image: BLOG_INDEX_IMAGE,
    publisher: organizationNode,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}${post.path}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      articleSection: post.category,
      image: `${SITE_URL}${post.coverImage}`,
    })),
  };
}

export function buildBlogPostingSchema(post: BlogPostSummary, author: BlogAuthor) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}${post.path}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.readingTimeMinutes * 210,
    inLanguage: "es-AR",
    mainEntityOfPage: `${SITE_URL}${post.path}`,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      image: `${SITE_URL}${author.image}`,
      sameAs: [author.linkedin],
    },
    publisher: organizationNode,
    image: `${SITE_URL}${post.coverImage}`,
  };
}
