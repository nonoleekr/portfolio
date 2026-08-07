import { Reveal } from "@/components/animations/reveal";
import { TimelineItem } from "@/components/cards/timeline-item";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-secondary/30 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Experience
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Where I&apos;ve been</h2>
          <p className="mt-4 text-muted-foreground">
            Internships, hackathons, open source, and freelance work.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-2xl space-y-6 before:absolute before:left-[17px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
          {experience.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
