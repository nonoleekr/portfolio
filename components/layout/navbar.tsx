"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { personal } from "@/data/personal";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCommandPalette = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {personal.initials}
          </span>
          <span className="hidden sm:inline">{personal.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label="Open command palette"
            onClick={openCommandPalette}
          >
            <Search className="size-[18px]" />
          </Button>
          <div className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="icon" asChild aria-label="GitHub">
              <a href={personal.social.github} target="_blank" rel="noreferrer">
                <Github className="size-[18px]" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
              <a href={personal.social.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="size-[18px]" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Email">
              <a href={`mailto:${personal.social.email}`}>
                <Mail className="size-[18px]" />
              </a>
            </Button>
          </div>
          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetTitle>Menu</SheetTitle>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex items-center gap-2 border-t border-border pt-4">
                <Button variant="outline" size="icon" asChild aria-label="GitHub">
                  <a href={personal.social.github} target="_blank" rel="noreferrer">
                    <Github className="size-[18px]" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild aria-label="LinkedIn">
                  <a href={personal.social.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="size-[18px]" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild aria-label="Email">
                  <a href={`mailto:${personal.social.email}`}>
                    <Mail className="size-[18px]" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
