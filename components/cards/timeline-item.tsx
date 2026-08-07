import {
  Briefcase,
  Code,
  GitBranch,
  GraduationCap,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";
import type { ExperienceItem } from "@/types";

const typeMeta: Record<ExperienceItem["type"], { label: string; icon: LucideIcon }> = {
  internship: { label: "Internship", icon: Briefcase },
  project: { label: "University Project", icon: Code },
  hackathon: { label: "Hackathon", icon: Trophy },
  opensource: { label: "Open Source", icon: GitBranch },
  freelance: { label: "Freelance", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
};

export function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const meta = typeMeta[item.type];
  const Icon = meta.icon;

  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)} className="relative pl-14">
      <span className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
        <Icon className="size-4" />
      </span>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="accent" className="font-normal">
            {meta.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {item.startDate} — {item.endDate}
          </span>
        </div>
        <h3 className="mt-2 font-semibold">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          {item.organization}
          {item.location ? ` · ${item.location}` : ""}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        {item.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {item.tech && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-normal">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
