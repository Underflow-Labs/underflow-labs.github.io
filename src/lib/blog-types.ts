export type BlogPostSummary = {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  readingTimeMinutes: number;
  sourcePath: string;
  path: string;
};

export type BlogPostDocument = BlogPostSummary & {
  body: string;
  html: string;
};
