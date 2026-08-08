# Ronald Lee — Portfolio

A personal portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Statically exported and deployed to GitHub Pages.

Live: https://nonoleekr.github.io/portfolio/

## Tech stack

- **Next.js 15** (App Router, static export via `output: "export"`)
- **TypeScript**, **Tailwind CSS**, custom shadcn/ui-style primitives
- **Framer Motion** for scroll reveals and micro-interactions
- **MDX** blog (`next-mdx-remote`) with syntax highlighting, TOC, reading time, RSS
- **GitHub REST API** (client-side) for live profile/repo stats
- **Zod** for contact form validation

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # static export to ./out
npm run typecheck
npm run lint
```

## Project structure

```
app/                 Routes (App Router): home, /projects, /blog, /blog/[slug], /resume
components/
  layout/             Navbar, footer, theme toggle, command palette, scroll UI
  sections/           Homepage sections (hero, about, skills, projects, ...)
  cards/              Reusable cards (project, certification, repo, timeline)
  ui/                 Design-system primitives (button, card, dialog, ...)
  blog/               MDX rendering, TOC, post cards, blog search
  animations/         Framer Motion reveal wrapper
content/blog/         MDX blog posts (frontmatter: title, date, excerpt, category, tags)
data/                 Site content: personal info, skills, projects, experience, certifications
lib/                  Utilities: MDX parsing, GitHub API, SEO metadata, animations
types/                Shared TypeScript types
public/                Static assets (images, resume.pdf, manifest, favicon)
```

## Editing content

Everything content-related lives in `data/*.ts` and `content/blog/*.mdx` — no component edits needed for routine updates:

- **Personal info, social links, resume path** — `data/personal.ts`
- **Skills** — `data/skills.ts`
- **Projects** — `data/projects.ts` (add an entry, drop a preview image in `public/images/projects/`)
- **Experience & education** — `data/experience.ts`
- **Certifications & awards** — `data/certifications.ts`
- **Blog posts** — add an `.mdx` file to `content/blog/` with frontmatter (`title`, `date`, `excerpt`, `category`, `tags`)
- **Resume PDF** — replace `public/resume.pdf` with your real resume (the current one is a generated placeholder)

The GitHub username used for the live GitHub stats section is read from `personal.social.github` in `data/personal.ts`.

## Deployment (GitHub Pages)

This repo is configured to deploy automatically via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`).

One-time setup in the GitHub repo:

1. **Settings → Pages → Source → GitHub Actions.**
2. Push to `main` — the workflow builds the static export and publishes it.

The site is served at `https://<username>.github.io/portfolio/`, so `next.config.mjs` sets `basePath`/`assetPrefix` to `/portfolio` automatically whenever the build runs inside GitHub Actions (detected via the `GITHUB_ACTIONS` env var). Local `npm run dev`/`npm run build` runs at the root path, so nothing needs to change for local development.

If you rename the repo, fork it, or move to a `<username>.github.io` root repo or a custom domain, update:

- `repoName` in `next.config.mjs` (or set `NEXT_PUBLIC_BASE_PATH` to override, `""` for a root/custom domain)
- `siteConfig.url` in `lib/seo.ts`
- `demo` URL for the "Portfolio Website" entry in `data/projects.ts`

### Manual export

```bash
GITHUB_ACTIONS=true npm run build   # produces ./out with the /portfolio basePath baked in
```

## Notes & known trade-offs

- **Contact form** has no backend (static export has none) — submitting opens a pre-filled `mailto:` link. Swap in a form service (Formspree, EmailJS) if you want in-page delivery.
- **GitHub stats** are fetched client-side from the public GitHub REST API (unauthenticated, 60 req/hr per IP) — fine for personal-portfolio traffic levels.
- **OG/Twitter preview image and favicon are SVG placeholders** (`public/images/og-image.svg`, `app/icon.svg`). Twitter's card renderer doesn't reliably accept SVG — export a PNG version if you need guaranteed social-preview rendering there.
- **PWA**: a web manifest is included (`public/manifest.webmanifest`) so the site is installable, but there's no service worker/offline caching.
- `npm audit` flags 3 high-severity advisories in `postcss`/`sharp`, both bundled *inside* Next 15's own build tooling (not your app code) — they're only reachable via Next's image optimizer, which this project disables (`images.unoptimized: true` for static export). Fixing them requires Next 16, which is out of scope for a Next 15 build; revisit on your next major upgrade.

## License

Personal project — feel free to fork for your own portfolio, but please swap out the content in `data/` first.
