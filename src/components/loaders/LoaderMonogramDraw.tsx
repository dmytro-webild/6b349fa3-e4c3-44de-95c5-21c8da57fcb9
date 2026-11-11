"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type LoaderMonogramDrawProps = {
  strokes?: string[];
  label?: string;
  onComplete?: () => void;
};

const DEFAULT_STROKES = ["M34 18 L20 78", "M52 14 L38 82 L66 22 L58 86", "M8 52 C30 44 56 40 92 36"];

const START = 0.4;
const STROKE = 0.5;
const GAP = 0.3;
const FADE_AT = 2.2;
const FADE = 0.3;

const LoaderMonogramDraw = ({ strokes = DEFAULT_STROKES, label = "Loading", onComplete }: LoaderMonogramDrawProps) => {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const finish = useRef(onComplete);

  useEffect(() => {
    finish.current = onComplete;
  });

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        setDone(true);
        finish.current?.();
      },
      (reduce ? 0.4 : FADE_AT + FADE) * 1000,
    );
    return () => window.clearTimeout(id);
  }, [reduce]);

  if (done) return null;

  return (
    <motion.div
      role="status"
      aria-label={label}
      initial={{ opacity: 1 }}
      animate={{ opacity: reduce ? 1 : 0 }}
      transition={{ duration: FADE, delay: FADE_AT, ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 z-[100000] flex items-center justify-center bg-background text-foreground"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_50%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_75%)]" />
      <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="relative size-[clamp(4rem,3rem+4vw,6.5rem)]">
        {strokes.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: STROKE, delay: START + i * GAP, ease: "easeOut" }, opacity: { duration: 0.01, delay: START + i * GAP } }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default LoaderMonogramDraw;
