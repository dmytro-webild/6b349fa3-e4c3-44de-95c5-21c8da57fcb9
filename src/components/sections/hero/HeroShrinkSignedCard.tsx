import { useEffect, useRef } from "react";
import { easeOut, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import JetexTitle from "@/components/kit/JetexTitle";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";
import CharacterStaggerButton from "@/components/library/osmo/buttons/CharacterStaggerButton";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type HeroButton = { text: string; href: string };

type HeroShrinkSignedCardProps = {
  eyebrow?: string;
  title?: string;
  serifTitle?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  imageSrc?: string;
  imageAlt?: string;
  marquee?: string[];
  signaturePaths?: string[];
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const EXPO_OUT = [0.19, 1, 0.22, 1] as const;

const DEFAULT_SIGNATURE = [
  "M24 98 C44 72 72 24 96 12 C84 42 74 76 70 102",
  "M50 66 C72 60 98 58 124 62",
  "M114 22 C124 52 130 80 134 100 C152 62 172 32 194 14",
  "M198 72 C206 60 216 58 216 68 C216 80 206 86 200 78 C210 66 228 60 238 64 C246 68 240 84 250 82 C260 80 264 64 274 64 C284 64 280 82 292 80 C302 78 306 66 314 66",
  "M58 108 C150 96 262 90 390 94",
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const MarqueeRow = ({ text, serif, reverse, still }: { text: string; serif: boolean; reverse: boolean; still: boolean }) => (
  <motion.div
    animate={still ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
    transition={{ duration: 46, ease: "linear", repeat: Infinity }}
    className="flex w-max will-change-transform"
  >
    {Array.from({ length: 4 }, (_, i) => (
      <p
        key={i}
        className={cn(
          "shrink-0 whitespace-nowrap pr-[0.35em] uppercase leading-[0.92] tracking-[-0.01em]",
          serif ? "font-serif font-normal text-muted-foreground" : "font-sans font-[800] text-foreground [font-stretch:78%]",
        )}
      >
        {text} ·
      </p>
    ))}
  </motion.div>
);

const HeroShrinkSignedCard = ({
  eyebrow = "Private aviation, Geneva",
  title = "Aurel Vance",
  serifTitle = "Founder and pilot",
  primaryButton = { text: "Business enquiries", href: "#contact" },
  secondaryButton,
  imageSrc = "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "Portrait of the founder",
  marquee = ["For others, service is a challenge", "For us, it is a promise we keep"],
  signaturePaths = DEFAULT_SIGNATURE,
  introDelay = 0,
  ariaLabel = "Introduction",
  className,
}: HeroShrinkSignedCardProps) => {
  const reduce = useReducedMotion() ?? false;
  const track = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const still = useMotionValue(0);
  const progress = reduce ? still : scrollYProgress;
  const desktop = useMotionValue(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 880px)");
    const sync = () => desktop.set(mq.matches ? 1 : 0);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [desktop]);

  const shrink = useTransform(progress, (v) => easeOut(clamp01(v / 0.85)));
  const scale = useTransform([shrink, desktop], ([s, d]: number[]) => 1 - s * (d ? 0.66 : 0.28));
  const crop = useTransform([shrink, desktop], ([s, d]: number[]) => s * (d ? 0 : 26));
  const clip = useMotionTemplate`inset(${crop}% 0% ${crop}% 0%)`;
  const shade = useTransform(progress, (v) => 1 - clamp01(v / 0.4));
  const contentOpacity = useTransform(progress, (v) => 1 - clamp01(v / 0.18));
  const contentY = useTransform(progress, (v) => `${clamp01(v / 0.18) * -3}rem`);
  const contentEvents = useTransform(contentOpacity, (v) => (v < 0.05 ? "none" : "auto"));
  const draw = useTransform(progress, (v) => clamp01((v - 0.45) / 0.5));
  const rowsOpacity = useTransform(progress, (v) => clamp01((v - 0.08) / 0.3));
  const drift = useTransform(progress, [0, 1], ["0%", "-12%"]);
  const driftBack = useTransform(progress, [0, 1], ["-12%", "0%"]);

  const rows = marquee.filter(Boolean).slice(0, 2);

  return (
    <section ref={track} aria-label={ariaLabel} className={cn("relative text-foreground", reduce ? "h-svh" : "h-[170svh]", className)}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {rows.length > 0 && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: reduce ? 0 : rowsOpacity }}
            className="absolute inset-x-0 top-1/2 z-0 flex -translate-y-1/2 flex-col gap-[0.12em] text-[length:min(calc(var(--text-display)*1.05),15svh)] lg:text-[length:min(calc(var(--text-display)*1.35),17svh)]"
          >
            <motion.div style={{ x: drift }}>
              <MarqueeRow text={rows[0]} serif reverse={false} still={reduce} />
            </motion.div>
            <motion.div style={{ x: driftBack }}>
              <MarqueeRow text={rows[1] ?? rows[0]} serif={false} reverse still={reduce} />
            </motion.div>
          </motion.div>
        )}

        <motion.div style={{ scale, clipPath: clip }} className="absolute inset-0 z-10 origin-center overflow-hidden will-change-transform">
          <MotionMedia
            src={imageSrc}
            alt={imageAlt}
            decoding="async"
            initial={reduce ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EXPO_OUT, delay: introDelay }}
            className="absolute inset-0 size-full object-cover object-[50%_30%]"
          />
          <motion.div aria-hidden="true" style={{ opacity: shade }} className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          {signaturePaths.length > 0 && (
            <svg aria-hidden="true" viewBox="0 0 400 120" fill="none" className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2 text-white">
              {signaturePaths.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: draw, opacity: draw }}
                />
              ))}
            </svg>
          )}
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentEvents }}
          className="absolute inset-x-0 bottom-0 z-20 pb-[clamp(2rem,5svh,3.5rem)] text-white"
        >
          <div className="mx-auto flex w-[var(--container)] flex-col gap-[clamp(1.5rem,3vw,2.5rem)] lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 lg:max-w-[62%]">
              {eyebrow && (
                <ColorBlockReveal flow direction="right" colorClassName="bg-current" delay={introDelay + 0.1} inViewMargin="0px" className="mb-[clamp(0.75rem,1.5vw,1.25rem)] w-fit max-w-full">
                  <p className="text-[length:var(--text-label)] font-medium uppercase leading-[1.2] tracking-[var(--label-tracking)] text-white/70">{eyebrow}</p>
                </ColorBlockReveal>
              )}
              {title && (
                <JetexTitle as="h1" heavy={title} delay={introDelay + 0.25} inViewMargin="0px" className="text-balance text-[length:calc(var(--text-display)*1.2)] leading-[0.86]" />
              )}
              {serifTitle && (
                <ColorBlockReveal flow direction="right" colorClassName="bg-current" delay={introDelay + 0.4} inViewMargin="0px" className="mt-[clamp(0.5rem,1.2vw,1rem)] w-fit max-w-full pb-[0.1em]">
                  <p className="text-balance font-serif text-[length:var(--text-h3)] font-normal italic leading-[1.1] text-white/85">{serifTitle}</p>
                </ColorBlockReveal>
              )}
            </div>
            {(primaryButton || secondaryButton) && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EXPO_OUT, delay: introDelay + 0.5 }}
                className="flex flex-wrap items-center gap-3 lg:shrink-0 lg:pb-[0.4rem]"
              >
                {primaryButton && (
                  <div className="flex">
                    <CharacterStaggerButton unstyled text={primaryButton.text} href={primaryButton.href} className="btn-primary" />
                  </div>
                )}
                {secondaryButton && (
                  <div className="flex">
                    <CharacterStaggerButton unstyled text={secondaryButton.text} href={secondaryButton.href} className="btn-secondary" />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroShrinkSignedCard;
