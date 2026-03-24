import { getBlogAuthor } from "../content/blog/authors";
import { blogManifest } from "../generated/blog-manifest";
import type { BlogPostDocument } from "./blog-types";

const documents = [...blogManifest] as unknown as BlogPostDocument[];
const posts = documents.map(({ body: _body, html: _html, ...summary }) => summary);

export function getAllBlogPosts() {
  return posts;
}

export function getRecentBlogPosts(limit = 3) {
  return posts.slice(0, limit);
}

export function getBlogPostSummary(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const currentPost = getBlogPostSummary(slug);

  if (!currentPost) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.category === currentPost.category) * 2 +
        left.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const rightScore =
        Number(right.category === currentPost.category) * 2 +
        right.tags.filter((tag) => currentPost.tags.includes(tag)).length;

      return rightScore - leftScore;
    })
    .slice(0, limit);
}

export function getBlogPost(slug: string) {
  const document = documents.find((post) => post.slug === slug);

  if (!document) {
    return null;
  }

  return {
    ...document,
    authorProfile: getBlogAuthor(document.author),
  };
}
