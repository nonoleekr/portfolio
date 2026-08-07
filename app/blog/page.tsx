import type { Metadata } from "next";

import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Writing on AI, programming, Flutter, cybersecurity, and CTF writeups.",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">Blog</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Writing</h1>
        <p className="mt-4 text-muted-foreground">
          Notes on AI, programming, Flutter, cybersecurity, and CTF writeups.
        </p>
      </div>

      <BlogExplorer posts={posts} />
    </div>
  );
}
