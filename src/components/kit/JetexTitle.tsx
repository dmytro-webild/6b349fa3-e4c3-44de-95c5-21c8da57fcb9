"use client";

import type { ComponentProps } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type JetexTitleProps = {
  heavy?: string;
  serif?: string;
  serifFirst?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  align?: "left" | "center";
  delay?: number;
  className?: string;
  inViewMargin?: ComponentProps<typeof ColorBlockReveal>["inViewMargin"];
};

const JetexTitle = ({ heavy, serif, serifFirst = false, as = "h2", align = "left", delay = 0, className, inViewMargin }: JetexTitleProps) => {
  const Tag = as === "p" ? "div" : as;
  const lines = [
    heavy ? { text: heavy, serif: false } : null,
    serif ? { text: serif, serif: true } : null,
  ].filter(Boolean) as { text: string; serif: boolean }[];
  if (serifFirst) lines.reverse();
  if (!lines.length) return null;
  return (
    <Tag className={cn("flex flex-col text-[length:var(--text-h1)] leading-[0.9] [overflow-wrap:anywhere]", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {lines.map((line, i) => (
        <ColorBlockReveal
          key={i}
          flow
          direction="right"
          colorClassName="bg-current"
          delay={delay + i * 0.12}
          inViewMargin={inViewMargin}
          className="w-fit max-w-full"
          contentClassName={cn("block pb-[0.06em]", line.serif && "font-serif font-normal uppercase tracking-[-0.01em] [font-stretch:100%]")}
        >
          <div className={line.serif ? "opacity-75" : undefined}>{line.text}</div>
        </ColorBlockReveal>
      ))}
    </Tag>
  );
};

export default JetexTitle;
