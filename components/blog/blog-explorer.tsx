"use client";

import * as React from "react";

import { PostCard } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { BlogPostMeta } from "@/types";
import { Search } from "lucide-react";

export function BlogExplorer({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

  const filtered = posts.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = !category || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="mt-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge
            onClick={() => setCategory(null)}
            variant={category === null ? "default" : "outline"}
            className="cursor-pointer select-none"
          >
            All
          </Badge>
          {categories.map((c) => (
            <Badge
              key={c}
              onClick={() => setCategory(c === category ? null : c)}
              variant={category === c ? "default" : "outline"}
              className="cursor-pointer select-none"
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">No posts match your search.</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
