import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { CommandPalette } from "@/components/layout/command-palette";
import { KonamiCode } from "@/components/layout/konami-code";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { personal } from "@/data/personal";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.titles[0],
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${personal.avatar}`,
    sameAs: [personal.social.github, personal.social.linkedin],
    knowsAbout: personal.interests,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={150}>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <CommandPalette />
            <KonamiCode />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
