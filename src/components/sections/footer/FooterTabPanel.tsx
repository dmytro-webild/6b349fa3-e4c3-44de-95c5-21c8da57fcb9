import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import JetexTitle from "@/components/kit/JetexTitle";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";
import { useKitMotion } from "@/components/kit/kitMotion";
import ContourLinesBackground from "@/components/backgrounds/ContourLinesBackground";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Link = { label: string; href?: string };

type FooterTabPanelProps = {
  titleHeavy?: string;
  titleSerif?: string;
  imageSrc?: string;
  imageAlt?: string;
  pagesTitle?: string;
  pages?: Link[];
  socialsTitle?: string;
  socials?: Link[];
  buttonText?: string;
  buttonHref?: string;
  legal?: Link[];
  signaturePath?: string;
  ariaLabel?: string;
  className?: string;
};

const SIGNATURE =
  "M8 86 C 30 40 52 8 46 30 S 30 96 44 88 S 78 20 92 14 S 70 92 84 86 S 120 40 132 44 S 118 84 132 80 S 168 36 178 40 S 162 82 178 78 S 214 38 226 44 S 212 82 228 76 S 270 46 292 52";

const FooterTabPanel = ({
  titleHeavy = "A legacy",
  titleSerif = "in motion.",
  imageSrc = "https://images.pexels.com/photos/15881359/pexels-photo-15881359.jpeg?auto=compress&cs=tinysrgb&w=800",
  imageAlt = "Portrait of the founder",
  pagesTitle = "Pages",
  pages = [{ label: "Home", href: "#" }, { label: "The journey", href: "#" }, { label: "Press", href: "#" }, { label: "Enquiries", href: "#" }],
  socialsTitle = "Follow",
  socials = [{ label: "X", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }],
  buttonText = "Enquire",
  buttonHref = "#contact",
  legal = [{ label: "Privacy policy", href: "#" }, { label: "Terms", href: "#" }],
  signaturePath = SIGNATURE,
  ariaLabel,
  className,
}: FooterTabPanelProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  const linkList = (title: string, links: Link[], align: string) =>
    links.length > 0 && (
      <nav aria-label={title} className={cn("relative z-10 flex flex-col items-center gap-3 text-center", align)}>
        {title && <p className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-muted-foreground">{title}</p>}
        <ul className="flex flex-col items-center gap-1">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href ?? "#"} className="block text-[length:var(--text-h3)] font-[number:var(--heading-weight)] uppercase leading-[1.05] [font-stretch:78%] transition-opacity duration-[var(--dur-fast)] hover:opacity-60">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );

  return (
    <footer aria-label={ariaLabel ?? "Footer"} className={cn("relative bg-secondary px-[0.8125rem] pb-[0.8125rem] pt-[clamp(1rem,3vw,2.5rem)] text-secondary-foreground", className)}>
      <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-deep text-foreground">
        <div aria-hidden="true" className="kit-pattern !absolute">
          <ContourLinesBackground className="text-foreground/10" />
        </div>
        <div className="relative overflow-hidden pb-[clamp(5rem,9vw,7rem)] text-foreground">
          <div className="relative mx-auto flex w-[var(--container)] flex-col items-center pt-[clamp(3.5rem,8vw,6.5rem)]">
            <div className="flex flex-col items-center">
              <JetexTitle heavy={titleHeavy} serif={titleSerif} align="center" className="text-[length:var(--text-display)]" />
              <svg aria-hidden viewBox="0 0 300 100" className="pointer-events-none mt-[clamp(0.5rem,1.5vw,1rem)] w-[clamp(8rem,16vw,13rem)] text-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d={signaturePath}
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.8, ease: kit.ease, delay: 0.3 }}
                />
              </svg>
            </div>

            <div className="relative mt-[clamp(1.5rem,4vw,2.5rem)] grid w-full grid-cols-2 items-end gap-x-[var(--gap)] gap-y-[clamp(2rem,5vw,3rem)] lg:grid-cols-[1fr_minmax(0,26rem)_1fr]">
              {linkList(pagesTitle, pages, "lg:mb-[clamp(6rem,12vw,10rem)]")}
              {imageSrc && (
                <ColorBlockReveal
                  src={imageSrc}
                  alt={imageAlt}
                  direction="right"
                  colorClassName="bg-current"
                  contentClassName="object-top"
                  className="z-10 col-span-2 row-start-2 mx-auto aspect-[4/5] w-[min(100%,18rem)] [mask-image:radial-gradient(75%_85%_at_50%_45%,black_55%,transparent_100%)] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:w-full"
                />
              )}
              {linkList(socialsTitle, socials, "lg:col-start-3 lg:row-start-1 lg:mb-[clamp(6rem,12vw,10rem)]")}
            </div>
          </div>

          {buttonText && (
            <div className="absolute inset-x-0 bottom-[clamp(1rem,2.6vw,2rem)] z-20 flex justify-center">
              <a href={buttonHref} className="btn-primary">
                <p className="btn-label">{buttonText}</p>
                <svg aria-hidden viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9 L9 3 M4 3 H9 V8" />
                </svg>
              </a>
            </div>
          )}
        </div>
        {legal.length > 0 && (
          <div className="relative flex justify-center px-[clamp(1rem,2.5vw,2rem)] pb-[clamp(1rem,2.5vw,1.75rem)] lg:justify-end">
            <ul className="flex gap-5">
            {legal.map((link, index) => (
              <li key={index}>
                <a href={link.href ?? "#"} className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--label-tracking)] hover:opacity-60">
                  {link.label}
                </a>
              </li>
            ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
};

export default FooterTabPanel;
