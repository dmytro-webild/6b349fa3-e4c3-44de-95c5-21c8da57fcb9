import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type AboutTwoVoiceStatementProps = {
  monogram?: string;
  label?: string;
  text?: string;
  serifWords?: string[];
  ariaLabel?: string;
  className?: string;
};

const clean = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

const AboutTwoVoiceStatement = ({
  monogram = "AV",
  label = "Founder's promise",
  text = "Every traveller who flies with us is a guest, not a passenger.",
  serifWords = ["guest", "passenger"],
  ariaLabel,
  className,
}: AboutTwoVoiceStatementProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const marks = serifWords.map(clean);

  return (
    <section aria-label={ariaLabel ?? label ?? "About"} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col items-center text-center">
        {monogram && (
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: kit.base, ease: kit.ease }}
            className="mb-[clamp(1rem,2vw,1.5rem)] font-serif text-[length:var(--text-h3)] italic leading-none opacity-80"
          >
            {monogram}
          </motion.p>
        )}
        {label && (
          <p className="mb-[clamp(1.5rem,3vw,2.5rem)] text-[length:var(--text-label)] font-medium uppercase leading-none tracking-[var(--label-tracking)] text-muted-foreground">
            {label}
          </p>
        )}
        <h2 aria-label={text} className="flex max-w-[18ch] flex-wrap justify-center gap-y-[0.04em] text-[length:var(--text-display)] leading-[0.92] [overflow-wrap:anywhere]">
          {text.split(" ").map((word, i, words) => {
            const serif = marks.includes(clean(word));
            return (
              <div key={i} aria-hidden="true" className="max-w-full">
                <ColorBlockReveal flow direction="right" colorClassName="bg-current" delay={i * 0.035} className="max-w-full" contentClassName={i < words.length - 1 ? "block pb-[0.08em] pr-[0.25em]" : "block pb-[0.08em]"}>
                  <div className={serif ? "font-serif font-normal tracking-[-0.01em] opacity-85 [font-stretch:100%]" : undefined}>{word}</div>
                </ColorBlockReveal>
              </div>
            );
          })}
        </h2>
      </div>
    </section>
  );
};

export default AboutTwoVoiceStatement;
