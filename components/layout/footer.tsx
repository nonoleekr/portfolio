import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { personal } from "@/data/personal";
import { navItems } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-8 py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <Link href="/#top" className="text-sm font-semibold tracking-tight">
              {personal.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{personal.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Site
              </span>
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                More
              </span>
              {navItems.slice(4).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Connect
              </span>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="size-3.5" /> GitHub
              </a>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="size-3.5" /> LinkedIn
              </a>
              <a
                href={`mailto:${personal.social.email}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-3.5" /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} {personal.name}. All rights reserved.</p>
          <p>Designed and built by {personal.name}.</p>
        </div>
      </div>
    </footer>
  );
}
