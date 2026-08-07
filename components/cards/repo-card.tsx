import { GitFork, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { GitHubRepo } from "@/types";

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer" className="block h-full">
      <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex h-full flex-col gap-3 p-5">
          <h3 className="truncate text-sm font-semibold">{repo.name}</h3>
          <p className="line-clamp-2 flex-1 text-xs text-muted-foreground">
            {repo.description || "No description provided."}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="size-3.5" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="size-3.5" /> {repo.forks_count}
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
