import { useId, useState, type FormEvent } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import JetexTitle from "@/components/kit/JetexTitle";
import ColorBlockReveal from "@/components/animation/ColorBlockReveal";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
};

type ContactFormPortraitProps = {
  heavyTitle?: string;
  serifTitle?: string;
  description?: string;
  fields?: Field[];
  submitText?: string;
  successText?: string;
  imageSrc?: string;
  imageAlt?: string;
  name?: string;
  role?: string;
  ariaLabel?: string;
  className?: string;
};

const defaultFields: Field[] = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "company", label: "Company" },
  { name: "message", label: "Message", type: "textarea", required: true },
];

const ContactFormPortrait = ({
  heavyTitle = "Business",
  serifTitle = "Enquiries",
  description,
  fields = defaultFields,
  submitText = "Send enquiry",
  successText = "Thank you. We will reply within one working day.",
  imageSrc = "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&w=1200",
  imageAlt,
  name,
  role,
  ariaLabel,
  className,
}: ContactFormPortraitProps) => {
  const [sent, setSent] = useState(false);
  const formId = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section aria-label={ariaLabel ?? [heavyTitle, serifTitle].filter(Boolean).join(" ")} className={cn("relative bg-secondary pb-[var(--section-space)] pt-[calc(var(--section-space)+var(--bow))] text-secondary-foreground [--bow:clamp(2rem,5vw,4.5rem)]", className)}
      style={{
        maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0Q50 200 100 0V100H0Z'/%3E%3C/svg%3E\"), linear-gradient(#000, #000)",
        maskSize: "100% var(--bow), 100% calc(100% - var(--bow) + 1px)",
        maskPosition: "top, bottom",
        maskRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2 lg:items-stretch">
        <div className="flex min-w-0 flex-col gap-[clamp(1.25rem,2.4vw,2rem)]">
          <JetexTitle heavy={heavyTitle} serif={serifTitle} />
          {description && <p className="max-w-[30rem] text-pretty text-[length:var(--text-body)] leading-[1.5] text-secondary-foreground/70">{description}</p>}
          <ColorBlockReveal flow direction="right" colorClassName="bg-current" delay={0.1} className="mt-[clamp(0.5rem,1.5vw,1rem)] rounded-[var(--radius-card)]" contentClassName="rounded-[var(--radius-card)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,currentColor_18%,transparent)]">
          <form onSubmit={onSubmit} className="flex flex-col p-[clamp(1.25rem,3vw,2.5rem)] gap-[clamp(1.25rem,2.2vw,1.75rem)]">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label htmlFor={`${formId}-${field.name}`} className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-secondary-foreground/60">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    id={`${formId}-${field.name}`}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    className="w-full resize-none border-0 border-b border-secondary-foreground/25 bg-transparent pb-2 text-[length:var(--text-body-lg)] text-secondary-foreground outline-none transition-colors duration-[var(--dur-fast)] focus:border-secondary-foreground"
                  />
                ) : (
                  <input
                    id={`${formId}-${field.name}`}
                    name={field.name}
                    type={field.type ?? "text"}
                    required={field.required}
                    className="w-full border-0 border-b border-secondary-foreground/25 bg-transparent pb-2 text-[length:var(--text-body-lg)] text-secondary-foreground outline-none transition-colors duration-[var(--dur-fast)] focus:border-secondary-foreground"
                  />
                )}
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="submit" className="btn-primary">
                {submitText}
              </button>
              {sent && (
                <p role="status" className="text-[length:var(--text-small)] text-secondary-foreground/70">
                  {successText}
                </p>
              )}
            </div>
          </form>
          </ColorBlockReveal>
        </div>
        <div className="relative aspect-[4/5] min-h-0 overflow-hidden [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%,0_11.2%)] lg:aspect-auto lg:min-h-[32rem]">
          <ColorBlockReveal src={imageSrc} alt={imageAlt ?? name ?? ""} direction="right" colorClassName="bg-current" className="absolute inset-0" />
          {(name || role) && (
            <div className="absolute bottom-0 right-0 flex max-w-[85%] flex-col items-end gap-0.5 rounded-tl-[var(--radius-image)] bg-deep text-deep-foreground px-[clamp(0.75rem,1.4vw,1.125rem)] py-[clamp(0.5rem,1vw,0.75rem)] text-right">
              {name && <p className="text-[length:var(--text-small)] font-extrabold uppercase leading-[1.1] [font-stretch:80%] [overflow-wrap:anywhere]">{name}</p>}
              {role && <p className="text-[length:var(--text-label)] uppercase leading-[1.2] tracking-[var(--label-tracking)] text-deep-foreground/60 [overflow-wrap:anywhere]">{role}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactFormPortrait;
