"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "2rem" : "1rem" }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 border-transparent pl-3 py-0.5 text-muted-foreground transition-colors hover:text-foreground",
                activeId === item.id && "border-primary text-foreground font-medium",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
