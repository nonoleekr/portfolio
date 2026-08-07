"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={cn(
            "fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-secondary",
          )}
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
