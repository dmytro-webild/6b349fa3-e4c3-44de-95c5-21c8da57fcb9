"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface ContourLinesBackgroundProps {
  className?: string;
  seed?: number;
  grain?: boolean;
}

const random = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const closedPath = (points: [number, number][]) => {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n];
  let d = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
};

const buildPaths = (seed: number) => {
  const rand = random(seed);
  const paths: string[] = [];
  const centers = [
    { x: 200 + rand() * 250, y: 250 + rand() * 250, rings: 7 },
    { x: 650 + rand() * 250, y: 550 + rand() * 300, rings: 5 },
  ];
  centers.forEach((center) => {
    const harmonics = [2, 3, 5].map((k) => ({ k, amp: 0.08 + rand() * 0.12, phase: rand() * Math.PI * 2 }));
    const start = 40 + rand() * 30;
    const step = 55 + rand() * 25;
    for (let ring = 0; ring < center.rings; ring++) {
      const radius = start + ring * step;
      const points: [number, number][] = [];
      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const wobble = harmonics.reduce((sum, h) => sum + h.amp * Math.sin(h.k * angle + h.phase + ring * 0.18), 0);
        const r = radius * (1 + wobble);
        points.push([center.x + Math.cos(angle) * r * 1.25, center.y + Math.sin(angle) * r]);
      }
      paths.push(closedPath(points));
    }
  });
  return paths;
};

const ContourLinesBackground = ({ className = "", seed = 7, grain = false }: ContourLinesBackgroundProps) => {
  const reduce = useReducedMotion();
  const filterId = useId().replace(/:/g, "");
  const paths = useMemo(() => buildPaths(seed), [seed]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 select-none overflow-hidden text-foreground/10", className)}
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_80%,transparent)]">
        <motion.svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          className="absolute -inset-[6%] h-[112%] w-[112%]"
          animate={reduce ? undefined : { transform: ["translate(0%, 0%)", "translate(3%, -2%)", "translate(-1%, 2%)", "translate(0%, 0%)"] }}
          transition={{ duration: 40, ease: "easeInOut", repeat: Infinity }}
        >
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
        </motion.svg>
      </div>
      {grain && (
        <svg className="absolute inset-0 h-full w-full opacity-70 mix-blend-overlay">
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1.33 1.33 1.33 0 -1.5 1.33 1.33 1.33 0 -1.5 1.33 1.33 1.33 0 -1.5 0 0 0 0 1" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      )}
    </div>
  );
};

export default ContourLinesBackground;
