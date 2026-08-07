"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/data/projects";
import { staggerContainer } from "@/lib/animations";

export function Projects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Projects</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Featured work</h2>
          <p className="mt-4 text-muted-foreground">
            A selection of projects across AI, security, mobile, and the web.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        <Reveal className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              View all projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
