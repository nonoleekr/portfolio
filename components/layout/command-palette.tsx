"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Sun,
  User,
  Wrench,
  Briefcase,
  Newspaper,
} from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        const target = e.target as HTMLElement;
        if (e.key === "/" && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto")) {
      window.open(href, href.startsWith("mailto") ? "_self" : "_blank");
    } else {
      router.push(href);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent hideClose className="max-w-xl overflow-hidden p-0">
        <VisuallyHidden>
          <DialogTitle>Command palette</DialogTitle>
        </VisuallyHidden>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
          <div className="flex items-center border-b border-border px-3">
            <Command.Input
              autoFocus
              placeholder="Type a command or search…"
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigate">
              {[
                { label: "Home", href: "/#top", icon: Home },
                { label: "About", href: "/#about", icon: User },
                { label: "Skills", href: "/#skills", icon: Wrench },
                { label: "Projects", href: "/#projects", icon: Briefcase },
                { label: "Blog", href: "/blog", icon: Newspaper },
                { label: "Resume", href: "/resume", icon: FileText },
              ].map((item) => (
                <Command.Item
                  key={item.label}
                  onSelect={() => go(item.href)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm data-[selected=true]:bg-secondary",
                  )}
                >
                  <item.icon className="size-4 text-muted-foreground" />
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Connect">
              <Command.Item
                onSelect={() => go(personal.social.github)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm data-[selected=true]:bg-secondary"
              >
                <Github className="size-4 text-muted-foreground" /> GitHub
              </Command.Item>
              <Command.Item
                onSelect={() => go(personal.social.linkedin)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm data-[selected=true]:bg-secondary"
              >
                <Linkedin className="size-4 text-muted-foreground" /> LinkedIn
              </Command.Item>
              <Command.Item
                onSelect={() => go(`mailto:${personal.social.email}`)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm data-[selected=true]:bg-secondary"
              >
                <Mail className="size-4 text-muted-foreground" /> Email
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Preferences">
              <Command.Item
                onSelect={() => {
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm data-[selected=true]:bg-secondary"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-4 text-muted-foreground" />
                ) : (
                  <Moon className="size-4 text-muted-foreground" />
                )}
                Toggle theme
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
