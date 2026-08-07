"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

import { ProjectCard } from "@/components/cards/project-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getAllTags, projects } from "@/data/projects";
import { staggerContainer } from "@/lib/animations";

export function ProjectsExplorer() {
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const tags = getAllTags();

  const filtered = projects.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="mt-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name, tech, or description…"
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge
            onClick={() => setActiveTag(null)}
            variant={activeTag === null ? "default" : "outline"}
            className="cursor-pointer select-none"
          >
            All
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer select-none"
            >
              {tag}
            </Badge>
          ))}
          {(activeTag || query) && (
            <button
              onClick={() => {
                setActiveTag(null);
                setQuery("");
              }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No projects match your filters.
        </p>
      ) : (
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate="show"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
