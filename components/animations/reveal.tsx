"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
