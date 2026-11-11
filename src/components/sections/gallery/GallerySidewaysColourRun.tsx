import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type GalleryItem = { imageSrc: string; imageAlt?: string; caption?: string; orientation?: "portrait" | "landscape" };

type GallerySidewaysColourRunProps = {
  items?: GalleryItem[];
  statement?: string;
  statementEmphasis?: string[];
  ariaLabel?: string;
  className?: string;
};

const TOPS = [24, 14, 40, 20, 46, 30, 16, 42, 26, 48, 18, 36, 28];
const LEAD = 58;
const GAP = 6;
const STATEMENT_W = 26;

const clean = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

const defaultItems: GalleryItem[] = [
  { imageSrc: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&w=1200", caption: "2024 · Arrival day", orientation: "landscape" },
  { imageSrc: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=1200", caption: "2025 · The coast", orientation: "portrait" },
  { imageSrc: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&w=1200", caption: "2025 · Dinner on board", orientation: "landscape" },
];

const Statement = ({ text, emphasis }: { text: string; emphasis: string[] }) => {
  const marks = emphasis.map(clean);
  return (
    <p className="font-serif text-[length:var(--text-h3)] font-normal leading-[1.05] tracking-[-0.01em] [overflow-wrap:anywhere]">
      {text.split(" ").map((word, i) => (
        <em key={i} className={marks.includes(clean(word)) ? "italic" : "not-italic"}>
          {word}{" "}
        </em>
      ))}
    </p>
  );
};

const GallerySidewaysColourRun = ({
  items = defaultItems,
  statement,
  statementEmphasis = [],
  ariaLabel,
  className,
}: GallerySidewaysColourRunProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const list = items.slice(0, 12);
  const statementAt = Math.ceil(list.length / 2);

  let cursor = LEAD;
  const placed: { kind: "item" | "statement"; item?: GalleryItem; left: number; width: number; top: number }[] = [];
  list.forEach((item, i) => {
    if (statement && i === statementAt) {
      placed.push({ kind: "statement", left: cursor, width: STATEMENT_W, top: 16 });
      cursor += STATEMENT_W + GAP;
    }
    const width = item.orientation === "portrait" ? 15 : i % 3 === 2 ? 33 : 27;
    placed.push({ kind: "item", item, left: cursor, width, top: TOPS[i % TOPS.length] });
    cursor += width + GAP;
  });
  if (statement && statementAt >= list.length) {
    placed.push({ kind: "statement", left: cursor, width: STATEMENT_W, top: 16 });
    cursor += STATEMENT_W + GAP;
  }
  const trackWidth = cursor;
  const run = Math.max(trackWidth - 100, 30);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${run}vw`]);
  const bgMix = useTransform(scrollYProgress, [0.3, 1], [0, 100]);
  const inkMix = useTransform(scrollYProgress, [0.5, 0.6], [0, 100]);
  usePreloadImages(ref);
  const background = useMotionTemplate`color-mix(in srgb, var(--secondary) ${bgMix}%, transparent)`;
  const color = useMotionTemplate`color-mix(in srgb, var(--secondary-foreground) ${inkMix}%, var(--foreground))`;
  const tone = (reduce ? undefined : { backgroundColor: background, color }) as unknown as MotionStyle;

  return (
    <motion.section
      ref={ref}
      aria-label={ariaLabel ?? statement ?? "Gallery"}
      data-scene
      style={tone}
      className={cn("relative text-foreground", className)}
    >
      {!reduce && (
        <div className="relative hidden lg:block" style={{ height: `calc(100svh + ${run}vw)` }}>
          <div className="sticky top-0 h-svh overflow-hidden">
            <motion.div className="relative h-full" style={{ x, width: `${trackWidth}vw` }}>
              {placed.map((entry, i) =>
                entry.kind === "statement" ? (
                  <div key={`s${i}`} className="absolute" style={{ left: `${entry.left}vw`, top: `${entry.top}%`, width: `${entry.width}vw` }}>
                    <Statement text={statement ?? ""} emphasis={statementEmphasis} />
                  </div>
                ) : (
                  <figure key={i} className="absolute m-0" style={{ left: `${entry.left}vw`, top: `${entry.top}%`, width: `min(${entry.width}vw, ${entry.item?.orientation === "portrait" ? 34 : 62}svh)` }}>
                    {entry.item?.caption && (
                      <figcaption className="mb-2 truncate text-[length:var(--text-label)] font-medium leading-[1.3]">{entry.item.caption}</figcaption>
                    )}
                    <Media
                      src={entry.item?.imageSrc}
                      alt={entry.item?.imageAlt ?? entry.item?.caption ?? ""}
                      loading="lazy"
                      decoding="async"
                      className={cn("block w-full rounded-[var(--radius-image)] object-cover", entry.item?.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]")}
                    />
                  </figure>
                ),
              )}
            </motion.div>
          </div>
        </div>
      )}
      <div className={cn("mx-auto w-[var(--container)] py-[var(--section-space)]", !reduce && "lg:hidden")}>
        <ul className="grid gap-[clamp(2.5rem,8vw,4rem)] lg:grid-cols-2 lg:gap-[var(--gap)]">
          {list.map((item, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, y: kit.distance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: kit.base, ease: kit.ease }}
              className={cn("flex flex-col", i % 2 === 1 ? "ml-auto w-[78%] lg:ml-0 lg:w-full" : "w-[88%] lg:w-full")}
            >
              {item.caption && <p className="mb-2 text-[length:var(--text-label)] font-medium leading-[1.3]">{item.caption}</p>}
              <Media
                src={item.imageSrc}
                alt={item.imageAlt ?? item.caption ?? ""}
                loading="lazy"
                decoding="async"
                className={cn("block w-full rounded-[var(--radius-image)] object-cover", item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]")}
              />
            </motion.li>
          ))}
        </ul>
        {statement && (
          <div className="mt-[clamp(3rem,10vw,5rem)] max-w-[22rem]">
            <Statement text={statement} emphasis={statementEmphasis} />
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default GallerySidewaysColourRun;
