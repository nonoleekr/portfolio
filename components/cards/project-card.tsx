"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types";
import { fadeInUp } from "@/lib/animations";

const statusLabel: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  concept: "Concept",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute right-3 top-3" variant="accent">
            {statusLabel[project.status]}
          </Badge>
        </div>

        <CardContent className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug">{project.title}</h3>
              <span className="shrink-0 text-xs text-muted-foreground">{project.year}</span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <Badge key={t} variant="secondary" className="font-normal">
                {t}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="font-normal">
                +{project.tech.length - 4}
              </Badge>
            )}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github className="size-3.5" /> Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button variant="secondary" size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" /> Live
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
