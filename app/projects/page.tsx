import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "All projects — AI, cybersecurity, mobile, and web work.",
});

export default function ProjectsPage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">Projects</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">All projects</h1>
        <p className="mt-4 text-muted-foreground">
          Search and filter by technology or category.
        </p>
      </div>

      <ProjectsExplorer />
    </div>
  );
}
