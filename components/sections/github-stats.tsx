"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Star, Users, GitFork, BookMarked } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { RepoCard } from "@/components/cards/repo-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGitHubRepos, fetchGitHubUser, languageBreakdown } from "@/lib/github";
import { personal } from "@/data/personal";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { GitHubRepo, GitHubUser } from "@/types";

const GITHUB_USERNAME = personal.social.github.split("/").filter(Boolean).pop() ?? "";

export function GitHubStats() {
  const [user, setUser] = React.useState<GitHubUser | null>(null);
  const [repos, setRepos] = React.useState<GitHubRepo[]>([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetchGitHubUser(GITHUB_USERNAME),
          fetchGitHubRepos(GITHUB_USERNAME),
        ]);
        if (!cancelled) {
          setUser(u);
          setRepos(r);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  const languages = languageBreakdown(repos);
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return (
    <section id="github" className="scroll-mt-24 bg-secondary/30 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">GitHub</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Open source activity</h2>
          <p className="mt-4 text-muted-foreground">Live from the GitHub API.</p>
        </Reveal>

        {error ? (
          <Reveal className="mx-auto mt-10 max-w-md text-center text-sm text-muted-foreground">
            Couldn&apos;t load live GitHub data right now — visit the profile directly.
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a href={personal.social.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" /> View GitHub Profile
                </a>
              </Button>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {loading || !user ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))
              ) : (
                <>
                  <StatTile icon={BookMarked} label="Repositories" value={user.public_repos} />
                  <StatTile icon={Star} label="Stars earned" value={totalStars} />
                  <StatTile icon={Users} label="Followers" value={user.followers} />
                  <StatTile icon={GitFork} label="Following" value={user.following} />
                </>
              )}
            </Reveal>

            {!loading && user && (
              <Reveal delay={0.1} className="mx-auto mt-8 flex max-w-3xl items-center gap-4 rounded-xl border border-border bg-card p-5">
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  width={56}
                  height={56}
                  className="rounded-full"
                  unoptimized
                />
                <div className="flex-1">
                  <p className="font-semibold">{user.name ?? user.login}</p>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={user.html_url} target="_blank" rel="noreferrer">
                    <Github className="size-3.5" /> Profile
                  </a>
                </Button>
              </Reveal>
            )}

            {languages.length > 0 && (
              <Reveal delay={0.15} className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-semibold">Language breakdown</p>
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                  {languages.map((l, i) => (
                    <div
                      key={l.language}
                      className="h-full"
                      style={{
                        width: `${l.percent}%`,
                        backgroundColor: `hsl(${(i * 63) % 360} 80% 55%)`,
                      }}
                      title={`${l.language} ${l.percent}%`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {languages.map((l, i) => (
                    <span key={l.language} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: `hsl(${(i * 63) % 360} 80% 55%)` }}
                      />
                      {l.language} · {l.percent}%
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                  ))
                : topRepos.map((repo) => (
                    <motion.div key={repo.id} variants={fadeInUp}>
                      <RepoCard repo={repo} />
                    </motion.div>
                  ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <Icon className="mx-auto size-4 text-primary" />
      <p className="mt-2 text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
