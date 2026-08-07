import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/resume`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteConfig.url}/projects#${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
