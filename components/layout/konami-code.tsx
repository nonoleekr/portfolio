"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiCode() {
  const [active, setActive] = React.useState(false);
  const progress = React.useRef<string[]>([]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      progress.current = [...progress.current, e.key].slice(-KONAMI.length);
      if (progress.current.join(",") === KONAMI.join(",")) {
        setActive((v) => !v);
        progress.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-[70] max-w-sm rounded-xl border border-primary/30 bg-background/95 p-4 font-mono text-xs shadow-2xl backdrop-blur"
        >
          <div className="mb-2 flex items-center gap-2 text-primary">
            <TerminalSquare className="size-4" />
            <span className="font-semibold">terminal mode unlocked</span>
          </div>
          <p className="text-muted-foreground">
            $ whoami{"\n"}
            &gt; Ronald Lee — building things across AI, systems, and security.{"\n"}
            $ echo $STATUS{"\n"}
            &gt; probably debugging something right now.
          </p>
          <button
            onClick={() => setActive(false)}
            className="mt-3 text-primary underline-offset-2 hover:underline"
          >
            close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
