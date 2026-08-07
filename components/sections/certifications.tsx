"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/animations/reveal";
import { CertificationCard } from "@/components/cards/certification-card";
import { certifications } from "@/data/certifications";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Certifications
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Credentials &amp; coursework
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={fadeInUp}>
              <CertificationCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
