import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { BlogFrontmatter, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(BLOG_DIR, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const { frontmatter, slug: realSlug, readingTime: rt } = getPostBySlug(slug);
      return { ...frontmatter, slug: realSlug, readingTime: rt };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getAllCategories() {
  const posts = getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
