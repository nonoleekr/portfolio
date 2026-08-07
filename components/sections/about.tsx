import { GraduationCap, Sparkles, Target } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/data/experience";
import { personal } from "@/data/personal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">About</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Who I am</h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="size-5" />
                  <h3 className="font-semibold">Introduction</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{personal.bio}</p>

                <div className="mt-2 flex items-center gap-2 text-primary">
                  <Target className="size-5" />
                  <h3 className="font-semibold">Career goals</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I want to work on systems where AI, security, and good engineering intersect —
                  whether that&apos;s building safer LLM-powered products, hardening infrastructure,
                  or shipping mobile experiences that people actually rely on. Long-term, I&apos;m aiming
                  for a role that lets me go deep on applied ML while staying hands-on with full-stack
                  and security work.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <div className="flex items-center gap-2 text-primary">
                  <GraduationCap className="size-5" />
                  <h3 className="font-semibold">Education</h3>
                </div>

                <ol className="relative space-y-8 border-l border-border pl-6">
                  {education.map((item) => (
                    <li key={item.id} className="relative">
                      <span className="absolute -left-[27px] top-1 size-3 rounded-full border-2 border-background bg-primary" />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="text-sm font-semibold">{item.degree}</h4>
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
                      {item.courses && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.courses.map((course) => (
                            <span
                              key={course}
                              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
