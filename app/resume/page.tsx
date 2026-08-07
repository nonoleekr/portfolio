import type { Metadata } from "next";
import { Download } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { awards, certifications } from "@/data/certifications";
import { education, experience } from "@/data/experience";
import { personal } from "@/data/personal";
import { skillCategories } from "@/data/skills";
import { buildMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: `Resume for ${personal.name} — skills, experience, education, certifications, and awards.`,
});

export default function ResumePage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Resume</span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{personal.name}</h1>
          <p className="max-w-lg text-muted-foreground">{personal.titles.join(" · ")}</p>
          <Button size="lg" asChild>
            <a href={withBasePath(personal.resumeUrl)} download>
              <Download className="size-4" /> Download PDF
            </a>
          </Button>
        </Reveal>

        <div className="mt-14 space-y-10">
          <Reveal>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Skills</h2>
                <div className="space-y-4">
                  {skillCategories.map((cat) => (
                    <div key={cat.id}>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">{cat.title}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s) => (
                          <Badge key={s.name} variant="secondary" className="font-normal">
                            {s.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-2 text-lg font-semibold">Experience</h2>
                <Accordion type="single" collapsible className="w-full">
                  {experience.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger>
                        <div className="flex flex-1 flex-col items-start text-left">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.organization} · {item.startDate} — {item.endDate}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <ul className="mt-3 space-y-1.5">
                          {item.highlights.map((h) => (
                            <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Education</h2>
                {education.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-sm font-semibold">{item.degree}</h3>
                      <span className="text-xs text-muted-foreground">
                        {item.startDate} — {item.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.institution} · {item.field}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.15}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Certifications</h2>
                  <ul className="space-y-3">
                    {certifications.map((c) => (
                      <li key={c.id}>
                        <p className="text-sm font-medium">{c.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.organization} · {c.date}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.2}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Awards</h2>
                  <ul className="space-y-3">
                    {awards.map((a) => (
                      <li key={a.id}>
                        <p className="text-sm font-medium">{a.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {a.issuer} · {a.date}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
