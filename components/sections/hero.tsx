"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { personal } from "@/data/personal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { withBasePath } from "@/lib/utils";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 animate-gradient rounded-full bg-gradient-to-r from-primary/25 via-cyan-400/20 to-blue-500/25 bg-200% blur-3xl"
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
        className="container flex flex-col items-center gap-10 text-center"
      >
        <motion.div variants={fadeInUp} className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl" />
          <div className="size-28 overflow-hidden rounded-full border-4 border-background shadow-xl ring-1 ring-border sm:size-32">
            <Image
              src={personal.avatar}
              alt={personal.name}
              width={128}
              height={128}
              priority
              className="size-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
          <span className="rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-medium text-muted-foreground">
            {personal.location} · Open to internships & collaborations
          </span>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Hi, I&apos;m <span className="gradient-text">{personal.name}</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg font-medium text-muted-foreground sm:text-xl">
            {personal.titles.map((title, i) => (
              <span key={title} className="flex items-center gap-2">
                {title}
                {i < personal.titles.length - 1 && (
                  <span className="text-border">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {personal.bio}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/#projects">
              View Projects <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={withBasePath(personal.resumeUrl)} download>
              <Download className="size-4" /> Download Resume
            </a>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="/#contact">
              <Mail className="size-4" /> Contact Me
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
        >
          {personal.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
            >
              {interest}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
