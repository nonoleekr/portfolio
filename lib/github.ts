import type { GitHubRepo, GitHubUser } from "@/types";

const API = "https://api.github.com";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${API}/users/${username}`);
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`${API}/users/${username}/repos?sort=updated&per_page=100`);
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.fork);
}

export function languageBreakdown(repos: GitHubRepo[]) {
  const counts: Record<string, number> = {};
  for (const repo of repos) {
    if (!repo.language) continue;
    counts[repo.language] = (counts[repo.language] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts)
    .map(([language, count]) => ({ language, count, percent: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}
