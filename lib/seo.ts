import type { Metadata } from "next";

import { personal } from "@/data/personal";

export const siteConfig = {
  name: `${personal.name} — Portfolio`,
  shortName: personal.name,
  url: "https://nonoleekr.github.io/portfolio",
  description:
    "Portfolio of Ronald Lee, a Computer Science student specializing in AI, software engineering, mobile development, networking, and cybersecurity.",
  get ogImage() {
    return `${this.url}/images/og-image.svg`;
  },
};

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title ?? siteConfig.name;
  const description = (overrides.description as string) ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s · ${personal.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "Ronald Lee",
      "Computer Science",
      "Software Engineer",
      "AI Developer",
      "Machine Learning",
      "Cybersecurity",
      "Mobile Development",
      "Portfolio",
    ],
    authors: [{ name: personal.name, url: siteConfig.url }],
    creator: personal.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
    manifest: `${siteConfig.url}/manifest.webmanifest`,
    ...overrides,
  };
}
