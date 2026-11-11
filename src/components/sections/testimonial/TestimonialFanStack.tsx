import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import JetexTitle from "@/components/kit/JetexTitle";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  imageSrc: string;
  imageAlt?: string;
};

type TestimonialFanStackProps = {
  monogram?: string;
  heavyTitle?: string;
  serifTitle?: string;
  items?: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Testimonial[] = [
  { quote: "Every detail was handled before we thought to ask.", name: "Client name", role: "Client role", imageSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&w=800" },
  { quote: "Calm, exact and always one step ahead.", name: "Client name", role: "Client role", imageSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=800" },
  { quote: "The only team we trust with our time.", name: "Client name", role: "Client role", imageSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=800" },
];

type FanCardProps = {
  item: Testimonial;
  offset: number;
  open: MotionValue<number>;
  widen: MotionValue<number>;
  turn: number;
};

const FanCard = ({ item, offset, open, widen, turn }: FanCardProps) => {
  const kit = useKitMotion();
  const reduce = useReducedMotion();
  const active = offset === 0;
  const slot = useMotionValue(offset);
  const rotate = useTransform(() => slot.get() * 8 * open.get() * widen.get());
  const x = useTransform(() => `${slot.get() * 14 * open.get() * widen.get()}%`);
  const y = useTransform(() => {
    const distance = Math.abs(slot.get());
    return -distance * 25 + (distance * 20 + distance * 25) * open.get();
  });

  useEffect(() => {
    if (reduce) {
      slot.set(offset);
      return;
    }
    const controls = animate(slot, offset, { duration: kit.base, ease: kit.ease });
    return () => controls.stop();
  }, [offset, reduce, slot, kit.base, kit.ease]);

  return (
    <motion.div
      animate={{ scale: active ? 1.08 : 1 }}
      transition={{ duration: kit.base, ease: kit.ease }}
      style={{ rotate, x, y, zIndex: active ? 30 : 20 - Math.round(Math.abs(offset) * 2), transformOrigin: "50% 160%" }}
      className={cn(
        "absolute left-1/2 top-[2.25rem] -ml-[calc(var(--fan-w)/2)] block aspect-[5/7] w-[var(--fan-w)] overflow-hidden rounded-[var(--radius-image)] shadow-[0_1.5rem_3rem_-1.5rem_color-mix(in_srgb,var(--secondary-foreground)_45%,transparent)] lg:top-[3.25rem]",
        Math.abs(offset) > 2 && "hidden lg:block",
      )}
    >
      <Media src={item.imageSrc} alt={item.imageAlt ?? item.name} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
      {active && turn > 0 && (
        <ColorBlockReveal key={turn} src={item.imageSrc} alt="" direction="right" colorClassName="bg-current" inViewMargin="0px" draggable={false} className="absolute inset-0" />
      )}
    </motion.div>
  );
};

const TestimonialFanStack = ({ monogram, heavyTitle = "Trusted", serifTitle = "By many", items = defaultItems, ariaLabel, className }: TestimonialFanStackProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const fanRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const list = items.slice(0, 9);
  const count = list.length;
  const [active, setActive] = useState(Math.floor((count - 1) / 2));
  const [turn, setTurn] = useState(0);
  const inView = useInView(fanRef, { once: true, margin: "0px 0px -30% 0px" });
  const fanReady = useImageReady(fanRef, inView);
  const onScreen = useInView(fanRef);
  const open = useSpring(reduce ? 1 : 0, { stiffness: 200, damping: 22 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scrollWiden = useTransform(scrollYProgress, [0.35, 0.75], [1, 1.15], { clamp: true });
  const still = useTransform(scrollYProgress, () => 1);
  const widen = reduce ? still : scrollWiden;

  useEffect(() => {
    if ((inView && fanReady) || reduce) open.set(1);
  }, [inView, fanReady, reduce, open]);

  useEffect(() => {
    if (reduce || !onScreen || count < 2) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((value) => (value + 1) % count);
      setTurn((value) => value + 1);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [reduce, onScreen, count]);

  const current = list[active] ?? list[0];
  if (!current) return null;

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? [heavyTitle, serifTitle].filter(Boolean).join(" ")}
      className={cn("relative overflow-x-clip bg-secondary py-[var(--section-space)] text-secondary-foreground", className)}
    >
      <div className="mx-auto flex w-[var(--container)] flex-col items-center">
        <div className="flex flex-col items-center gap-[clamp(0.75rem,1.4vw,1.25rem)] text-center">
          {monogram && <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-60">{monogram}</p>}
          <JetexTitle heavy={heavyTitle} serif={serifTitle} align="center" />
        </div>
        <div
          ref={fanRef}
          className="relative mt-[clamp(1rem,2vw,1.5rem)] h-[calc(var(--fan-w)*1.4+6.25rem)] w-full [--fan-w:clamp(7.5rem,30vw,10rem)] lg:h-[calc(var(--fan-w)*1.4+9.25rem)] lg:[--fan-w:clamp(10rem,18vw,16.5rem)]"
        >
          {list.map((item, index) => {
            const relative = (((index - active) % count) + count) % count;
            return <FanCard key={index} item={item} offset={relative > count / 2 ? relative - count : relative} open={open} widen={widen} turn={turn} />;
          })}
        </div>
        <div aria-live="polite" className="mt-[clamp(1.5rem,3vw,2.5rem)] grid w-full max-w-[32rem] text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={active}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: kit.fast, ease: kit.ease }}
              className="flex flex-col items-center gap-[clamp(1rem,2vw,1.5rem)]"
            >
              <blockquote className="text-balance font-serif text-[length:var(--text-h3)] leading-[1.15] tracking-[-0.01em] [overflow-wrap:anywhere]">
                <p>{current.quote}</p>
              </blockquote>
              <figcaption className="flex flex-col items-center gap-1">
                <p className="text-[length:var(--text-small)] font-extrabold uppercase [font-stretch:80%]">{current.name}</p>
                {current.role && <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-60">{current.role}</p>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialFanStack;
