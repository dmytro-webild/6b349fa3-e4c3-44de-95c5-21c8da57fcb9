"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import useMenuDialog from "@/components/kit/useMenuDialog";
import CharacterStaggerButton from "@/components/library/osmo/buttons/CharacterStaggerButton";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type NavItem = { name: string; href: string };
type Button = { text: string; href: string };
type ContactItem = { label: string; href: string };

type NavbarMonogramSilverProps = {
  brand?: string;
  logoSrc?: string;
  monogram?: string[];
  navItems?: NavItem[];
  primaryButton?: Button;
  contact?: ContactItem[];
  contactTitle?: string;
  menuText?: string;
  closeText?: string;
};

const EXPO_IN_OUT = [0.87, 0, 0.13, 1] as const;
const EXPO_OUT = [0.19, 1, 0.22, 1] as const;

const DEFAULT_MONOGRAM = ["M34 18 L20 78", "M52 14 L38 82 L66 22 L58 86", "M8 52 C30 44 56 40 92 36"];

const DEFAULT_ITEMS: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const lightness = (color: string) => {
  const n = color.match(/-?[\d.]+/g)?.map(Number) ?? [];
  if (n.length < 3 || (n[3] ?? 1) < 0.5) return null;
  if (/^ok(lab|lch)/.test(color)) return n[0];
  const k = color.startsWith("color(") ? 1 : 255;
  return (0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]) / k;
};

const lightAt = (el: HTMLElement | null) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  for (const hit of document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)) {
    if (hit.closest("[data-nav-chrome]")) continue;
    if (/^(IMG|VIDEO|CANVAS)$/.test(hit.tagName) && hit.clientWidth > window.innerWidth * 0.9) return false;
    const l = lightness(getComputedStyle(hit).backgroundColor);
    if (l !== null) return l > 0.6;
  }
  return false;
};

const useLightUnder = (logoRef: RefObject<HTMLElement | null>, menuRef: RefObject<HTMLElement | null>) => {
  const [light, setLight] = useState({ logo: false, menu: false });
  useEffect(() => {
    let timer = 0;
    const check = () => {
      timer = 0;
      const next = { logo: lightAt(logoRef.current), menu: lightAt(menuRef.current) };
      setLight((prev) => (prev.logo === next.logo && prev.menu === next.menu ? prev : next));
    };
    const schedule = () => {
      if (!timer) timer = window.setTimeout(check, 90);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [logoRef, menuRef]);
  return light;
};

const NavbarMonogramSilver = ({
  brand = "Studio",
  logoSrc,
  monogram = DEFAULT_MONOGRAM,
  navItems = DEFAULT_ITEMS,
  primaryButton = { text: "Business enquiries", href: "#contact" },
  contact = [],
  contactTitle = "Contact",
  menuText = "Menu",
  closeText = "Close",
}: NavbarMonogramSilverProps) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  useMenuDialog(open, panelRef, close);
  const light = useLightUnder(logoRef, menuRef);

  return (
    <>
      <a
        ref={logoRef}
        href="#"
        aria-label={brand}
        data-nav-chrome
        className={cn(
          "fixed left-[var(--gutter)] top-[1rem] z-[80] flex h-[3rem] items-center transition-colors duration-500 lg:left-[1rem]",
          open ? "text-deep-foreground" : light.logo ? "text-secondary-foreground" : "text-foreground mix-blend-difference",
        )}
      >
        {logoSrc ? (
          <img src={logoSrc} alt={brand} decoding="async" className="h-[2.5rem] w-auto max-w-[8rem] object-contain" />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="size-[2.75rem]">
            {monogram.map((d, i) => (
              <path key={i} d={d} stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>
        )}
      </a>

      <nav aria-label="Main" data-nav-chrome className="fixed right-[var(--gutter)] top-[1rem] z-[80] flex items-center gap-[0.5rem] lg:right-[1rem]">
        {primaryButton && (
          <div
            inert={open}
            className={cn(
              "hidden transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none lg:block",
              open ? "pointer-events-none translate-x-[1.5rem] opacity-0 duration-500 ease-[cubic-bezier(0.65,0.05,0,1)]" : "translate-x-0 opacity-100 delay-300",
            )}
          >
            <CharacterStaggerButton unstyled text={primaryButton.text} href={primaryButton.href} className="btn-primary min-h-[3rem]" />
          </div>
        )}
        <button
          ref={menuRef}
          type="button"
          aria-expanded={open}
          aria-label={open ? closeText : menuText}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "relative flex size-[3rem] items-center justify-center rounded-[var(--radius-button)] border backdrop-blur-[6px] transition-colors duration-500",
            open
              ? "border-deep-foreground/40 bg-transparent text-deep-foreground hover:border-deep-foreground"
              : light.menu
                ? "border-secondary-foreground/40 bg-secondary/20 text-secondary-foreground hover:border-secondary-foreground"
                : "border-foreground/40 bg-background/20 text-foreground hover:border-foreground",
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute right-[0.8rem] top-1/2 h-px bg-current transition-[translate,rotate,width] duration-700 ease-[cubic-bezier(0.65,0.05,0,1)] motion-reduce:transition-none",
              open ? "w-[1.2rem] -translate-y-1/2 rotate-45" : "w-[1.4rem] -translate-y-[0.2rem] rotate-0",
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute right-[0.8rem] top-1/2 h-px bg-current transition-[translate,rotate,width] duration-700 ease-[cubic-bezier(0.65,0.05,0,1)] motion-reduce:transition-none",
              open ? "w-[1.2rem] -translate-y-1/2 -rotate-45" : "w-[0.85rem] translate-y-[0.2rem] rotate-0",
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuText}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: EXPO_IN_OUT }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-deep px-[var(--gutter)] pb-[var(--gutter)] pt-[6rem] text-deep-foreground lg:pt-[7rem]"
          >
            <div className="mx-auto flex w-[var(--container)] flex-1 flex-col gap-[3rem] lg:flex-row lg:items-end lg:justify-between">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <li key={`${i}-${item.href}`}>
                    <a href={item.href} onClick={close} className="group flex items-baseline gap-[0.75rem] py-[0.15rem] lg:gap-[1.25rem]">
                      <p aria-hidden="true" className="w-[1.75rem] shrink-0 font-serif text-[length:var(--text-body)] italic leading-none text-deep-foreground/45 lg:w-[2.5rem]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <div className="-mb-[0.12em] -ml-[0.12em] w-fit max-w-full pl-[0.12em] text-[length:clamp(2.75rem,9vw,6.5rem)]">
                        <div className="relative -ml-[0.12em] overflow-hidden pb-[0.16em] pl-[0.12em] [overflow-wrap:anywhere]">
                          <p
                            className={cn(
                              "text-[length:clamp(2.75rem,9vw,6.5rem)] uppercase leading-[0.92] transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.65,0.05,0,1)] group-hover:-translate-y-full group-hover:opacity-0 group-focus-visible:-translate-y-full group-focus-visible:opacity-0",
                              i % 2 ? "font-serif font-normal opacity-80" : "font-sans font-[800] [font-stretch:78%]",
                            )}
                          >
                            {item.name}
                          </p>
                          <p
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-x-0 top-0 translate-y-[125%] pl-[0.12em] text-[length:clamp(2.75rem,9vw,6.5rem)] uppercase leading-[0.92] text-accent transition-[translate] duration-500 ease-[cubic-bezier(0.65,0.05,0,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0",
                              i % 2 ? "font-sans font-[800] [font-stretch:78%]" : "font-serif font-normal",
                            )}
                          >
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.25 }}
                className="flex flex-col items-start gap-[1.5rem] lg:items-end lg:text-right"
              >
                {contact.length > 0 && (
                  <div className="flex flex-col gap-[0.5rem] lg:items-end">
                    <p className="text-[length:var(--text-label)] font-medium uppercase leading-none tracking-[var(--label-tracking)] text-deep-foreground/50">{contactTitle}</p>
                    {contact.map((item, i) => (
                      <a key={i} href={item.href} onClick={close} className="text-[length:var(--text-body)] leading-[1.4] text-deep-foreground/85 transition-colors duration-300 hover:text-accent">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
                {primaryButton && <CharacterStaggerButton unstyled text={primaryButton.text} href={primaryButton.href} onClick={close} className="btn-primary min-h-[3.25rem]" />}
              </motion.div>
            </div>

            <div className="mx-auto mt-[2.5rem] flex w-[var(--container)] border-t border-deep-foreground/15 pt-[1rem]">
              <p className="text-[length:var(--text-label)] font-medium uppercase leading-none tracking-[var(--label-tracking)] text-deep-foreground/50">{brand}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarMonogramSilver;
