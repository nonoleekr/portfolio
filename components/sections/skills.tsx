"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  LayoutTemplate,
  Server,
  ShieldHalf,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/data/skills";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const icons: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Server,
  BrainCircuit,
  ShieldHalf,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-secondary/30 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Skills</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What I work with</h2>
          <p className="mt-4 text-muted-foreground">
            A toolbox spanning application development, applied AI, and offensive security.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => {
            const Icon = icons[category.icon] ?? Code2;
            return (
              <motion.div key={category.id} variants={fadeInUp}>
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="pt-2">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="font-normal">
                        {skill.name}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
