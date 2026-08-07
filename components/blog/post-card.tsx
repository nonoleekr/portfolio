import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPostMeta } from "@/types";

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <Badge variant="accent">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> {post.readingTime}
            </span>
          </div>

          <div>
            <h3 className="font-semibold leading-snug transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <time className="text-xs text-muted-foreground" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Read <ArrowRight className="size-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
