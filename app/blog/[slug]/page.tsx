import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { MdxContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { getAdjacentPosts, getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPostSlugs().map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return buildMetadata();
  return buildMetadata({ title: post.title, description: post.excerpt });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugs = getPostSlugs().map((f) => f.replace(/\.mdx$/, ""));
  if (!slugs.includes(slug)) notFound();

  const { frontmatter, content, readingTime } = getPostBySlug(slug);
  const toc = extractToc(content);
  const { previous, next } = getAdjacentPosts(slug);

  return (
    <article className="container py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to blog
        </Link>

        <Badge variant="accent">{frontmatter.category}</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{frontmatter.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {readingTime}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[1fr_240px]">
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
          <MdxContent source={content} />

          <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {previous && (
              <Link
                href={`/blog/${previous.slug}`}
                className="group rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft className="size-3" /> Previous
                </span>
                <span className="mt-1 block text-sm font-medium group-hover:text-primary">
                  {previous.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-xl border border-border p-4 text-right transition-colors hover:bg-secondary sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  Next <ArrowRight className="size-3" />
                </span>
                <span className="mt-1 block text-sm font-medium group-hover:text-primary">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>

        <TableOfContents items={toc} />
      </div>
    </article>
  );
}
