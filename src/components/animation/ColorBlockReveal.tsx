"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, usePreloadImages } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const expoOut = [0.16, 1, 0.3, 1] as const;
const expoInOut = [0.87, 0, 0.13, 1] as const;

const hiddenClip = {
  down: "inset(0% 0% 100% 0%)",
  up: "inset(100% 0% 0% 0%)",
  right: "inset(0% 100% 0% 0%)",
  left: "inset(0% 0% 0% 100%)",
};
const shownClip = "inset(0% 0% 0% 0%)";
const exitClip = {
  down: hiddenClip.up,
  up: hiddenClip.down,
  right: hiddenClip.left,
  left: hiddenClip.right,
};

type ColorBlockRevealProps = {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  colorClassName?: string;
  delay?: number;
  direction?: "down" | "up" | "left" | "right";
  inherit?: boolean;
  draggable?: boolean;
  flow?: boolean;
  inViewMargin?: NonNullable<Parameters<typeof useInView>[1]>["margin"];
};

const ColorBlockReveal = ({
  src,
  alt,
  children,
  className,
  contentClassName,
  colorClassName = "bg-deep",
  delay = 0,
  direction = "down",
  draggable,
  flow = false,
  inViewMargin = "0px 0px -10% 0px",
}: ColorBlockRevealProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: inViewMargin });
  usePreloadImages(ref, "100%");
  const loaded = useImageReady(ref, inView);
  const [done, setDone] = useState(false);
  const hidden = hiddenClip[direction];

  const state = reduce || (inView && loaded) ? "shown" : "hidden";
  return (
    <motion.div ref={ref} initial={reduce ? "shown" : "hidden"} animate={state} className={cn("relative overflow-hidden", className)}>
      <motion.div
        aria-hidden="true"
        variants={
          flow && !src
            ? {
                hidden: { clipPath: hidden },
                shown: { clipPath: [hidden, shownClip, exitClip[direction]], transition: { duration: 1.3, times: [0, 0.45, 1], ease: [expoOut, expoInOut], delay } },
              }
            : { hidden: { clipPath: hidden }, shown: { clipPath: shownClip, transition: { duration: 0.7, ease: expoOut, delay } } }
        }
        onAnimationComplete={(def) => flow && !src && def === "shown" && setDone(true)}
        className={cn("absolute inset-0 z-[1]", colorClassName, (done || (flow && reduce)) && "hidden", !(flow && !src) && "z-auto")}
      />
      {src ? (
        <MotionMedia
          src={src}
          alt={alt ?? ""}
          draggable={draggable}
          variants={{ hidden: { clipPath: hidden }, shown: { clipPath: shownClip, transition: { duration: 1, ease: expoInOut, delay: delay + 0.1 } } }}
          onAnimationComplete={(def) => def === "shown" && setDone(true)}
          loading="lazy"
          decoding="async"
          className={cn("absolute inset-0 size-full object-cover", done && "[clip-path:none]!", contentClassName)}
        />
      ) : (
        <motion.div
          variants={
            flow
              ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.01, delay: delay + 1.3 * 0.45 } } }
              : { hidden: { clipPath: hidden }, shown: { clipPath: shownClip, transition: { duration: 1, ease: expoInOut, delay: delay + 0.1 } } }
          }
          className={cn(flow ? "relative" : "absolute inset-0", contentClassName)}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ColorBlockReveal;
