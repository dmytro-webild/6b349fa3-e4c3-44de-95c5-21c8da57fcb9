"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface CharacterStaggerButtonProps {
  text?: string;
  href?: string;
  stagger?: number;
  className?: string;
  unstyled?: boolean;
  onClick?: () => void;
}

const CharacterStaggerButton = ({ text = "Staggering Button", href = "#", stagger = 0.01, className, unstyled = false, onClick }: CharacterStaggerButtonProps) => (
  <a
    href={href}
    aria-label={text}
    onClick={onClick}
    className={cn(
      unstyled
        ? "group relative no-underline"
        : "group relative flex max-w-[12em] grow cursor-pointer items-center justify-center rounded-[0.25em] p-[1em] text-base leading-none text-primary-foreground no-underline",
      className,
    )}
  >
    {!unstyled && (
      <div className="absolute inset-0 rounded-[0.25em] bg-primary transition-[inset] duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:inset-[0.125em] group-focus-visible:inset-[0.125em] motion-reduce:transition-none" />
    )}
    <div aria-hidden="true" className="relative -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] leading-[1.3] whitespace-nowrap">
      {[...text].map((char, i) => (
        <div
          key={i}
          className={cn(
            "relative inline-block translate-y-0 rotate-[0.001deg] [text-shadow:0_1.3em_currentColor] transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[1.3em] group-focus-visible:-translate-y-[1.3em] motion-reduce:transition-none",
            char === " " && "whitespace-pre",
          )}
          style={{ transitionDelay: `${i * stagger}s` }}
        >
          {char}
        </div>
      ))}
    </div>
  </a>
);

export default CharacterStaggerButton;
