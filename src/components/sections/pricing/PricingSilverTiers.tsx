import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import JetexTitle from "@/components/kit/JetexTitle";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";
import CharacterStaggerButton from "@/components/library/osmo/buttons/CharacterStaggerButton";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Tier = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: string[];
  featured?: boolean;
  badge?: string;
  cta?: { text: string; href: string };
};

type PricingSilverTiersProps = {
  heavyTitle?: string;
  serifTitle?: string;
  description?: string;
  items?: Tier[];
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Tier[] = [
  { name: "Essential", price: "$1,200", period: "per month", description: "A simple start.", features: ["First feature", "Second feature", "Third feature", "Fourth feature"], cta: { text: "Choose plan", href: "#contact" } },
  { name: "Signature", price: "$2,400", period: "per month", description: "Our most chosen plan.", features: ["First feature", "Second feature", "Third feature", "Fourth feature"], featured: true, cta: { text: "Choose plan", href: "#contact" } },
  { name: "Private", price: "$4,800", period: "per month", description: "Everything, handled.", features: ["First feature", "Second feature", "Third feature", "Fourth feature"], cta: { text: "Choose plan", href: "#contact" } },
];

const columns = (count: number) => {
  if (count <= 1) return "grid-cols-1 max-w-[28rem]";
  if (count === 2) return "grid-cols-1 lg:grid-cols-2 max-w-[56rem]";
  if (count === 3) return "grid-cols-1 lg:grid-cols-3";
  return "grid-cols-1 lg:grid-cols-2 xl:grid-cols-4";
};

const PricingSilverTiers = ({ heavyTitle = "Choose", serifTitle = "Your plan", description, items = defaultItems, ariaLabel, className }: PricingSilverTiersProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const list = items.slice(0, 4);

  return (
    <section aria-label={ariaLabel ?? [heavyTitle, serifTitle].filter(Boolean).join(" ")} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="mb-[clamp(2rem,5vw,4rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)] lg:flex-row lg:items-end lg:justify-between">
          <JetexTitle heavy={heavyTitle} serif={serifTitle} />
          {description && <p className="max-w-[24rem] text-pretty text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{description}</p>}
        </div>
        <ul className={cn("grid gap-[var(--gap)]", columns(list.length))}>
          {list.map((tier, index) => (
            <li key={index} className="min-w-0">
              <ColorBlockReveal
                flow
                direction="right"
                colorClassName="bg-current"
                delay={index * 0.1}
                className="h-full rounded-[var(--radius-card)]"
                contentClassName="kit-card flex h-full flex-col gap-[clamp(1.25rem,2vw,1.75rem)] overflow-hidden p-[clamp(1.25rem,2.5vw,2.25rem)] [container-type:inline-size]"
              >
              <motion.div
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: kit.slow, ease: kit.easeInOut, delay: index * 0.1 }}
                className={cn("absolute inset-x-0 top-0 origin-left bg-current", tier.featured ? "h-[2px] opacity-90" : "h-px opacity-25")}
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-70">{tier.name}</p>
                {tier.badge && <p className="font-serif text-[length:var(--text-body)] italic leading-none opacity-80">{tier.badge}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <JetexTitle as="p" heavy={tier.price} delay={0.15 + index * 0.1} className="whitespace-nowrap text-[length:clamp(2.5rem,1.8rem+2.6vw,4.25rem)] font-extrabold uppercase tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-stretch:78%]" />
                {tier.period && <p className="text-[length:var(--text-small)] opacity-60">{tier.period}</p>}
              </div>
              {tier.description && <p className="font-serif text-[length:var(--text-body-lg)] leading-[1.3] opacity-85">{tier.description}</p>}
              {tier.features && tier.features.length > 0 && (
                <ul className="flex flex-col">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: kit.base, ease: kit.ease, delay: 0.3 + index * 0.1 + featureIndex * 0.04 }}
                      className="border-t border-current/10 py-3"
                    >
                      <p className="text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere]">{feature}</p>
                    </motion.li>
                  ))}
                </ul>
              )}
              {tier.cta && (
                <CharacterStaggerButton unstyled text={tier.cta.text} href={tier.cta.href} className={cn("mt-auto w-full", tier.featured ? "btn-primary" : "btn-secondary")} />
              )}
              </ColorBlockReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PricingSilverTiers;
