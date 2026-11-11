import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import JetexTitle from "@/components/kit/JetexTitle";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Faq = { title: string; description: string };

type FaqTwoVoiceAccordionProps = {
  titleHeavy?: string;
  titleSerif?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  items?: Faq[];
  ariaLabel?: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.65, 0.05, 0, 1];

const defaultItems: Faq[] = [
  { title: "How fast can you arrange a flight?", description: "Most flights are confirmed within two hours of your call, and we can have an aircraft ready in as little as four." },
  { title: "Where do you fly?", description: "Anywhere with a private terminal. We work with more than 40 terminals worldwide and plan the ground leg on both ends." },
  { title: "Who will I deal with?", description: "One personal concierge from first call to landing, with Aurel Vance himself reachable on every charter." },
];

const FaqTwoVoiceAccordion = ({
  titleHeavy = "Questions",
  titleSerif = "Answered",
  description = "Everything guests usually ask before their first flight with us.",
  linkText = "Ask us directly",
  linkHref = "#contact",
  items = defaultItems,
  ariaLabel,
  className,
}: FaqTwoVoiceAccordionProps) => {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <section aria-label={ariaLabel ?? "Frequently asked questions"} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col items-start gap-[clamp(1rem,1.6vw,1.5rem)] lg:sticky lg:top-[clamp(6rem,12vh,8rem)] lg:self-start">
          <JetexTitle heavy={titleHeavy} serif={titleSerif} />
          {description && <p className="max-w-[24rem] text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground">{description}</p>}
          {linkText && (
            <a href={linkHref} className="btn-link">
              {linkText}
            </a>
          )}
        </div>
        <ColorBlockReveal flow direction="right" colorClassName="bg-current" className="self-start rounded-[var(--radius-card)]" contentClassName="kit-card">
        <ul className="px-[clamp(1.25rem,2.5vw,2.25rem)]">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={index} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-[var(--gap)] py-[clamp(1.25rem,2.2vw,1.75rem)] text-left"
                >
                  <h3 className="text-[length:var(--text-h3)] [overflow-wrap:anywhere]">{item.title}</h3>
                  <div aria-hidden className={cn("relative grid size-10 shrink-0 place-items-center rounded-[var(--radius-button)] border border-border transition-transform duration-[0.6s] ease-[cubic-bezier(0.65,0.05,0,1)]", isOpen && "rotate-45")}>
                    <div className="absolute h-px w-3.5 bg-current" />
                    <div className="absolute h-3.5 w-px bg-current" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-${index}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40rem] pb-[clamp(1.25rem,2.2vw,1.75rem)] pr-12 text-[length:var(--text-body-lg)] font-light leading-[1.5] text-muted-foreground">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        </ColorBlockReveal>
      </div>
    </section>
  );
};

export default FaqTwoVoiceAccordion;
