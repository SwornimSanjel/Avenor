import { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "ivory" | "ink";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "ivory",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const titleColor = tone === "ivory" ? "text-ivory" : "text-ink";
  const descColor = tone === "ivory" ? "text-slate" : "text-slate";
  return (
    <ScrollReveal
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`font-display text-display-sm font-semibold md:text-display-md lg:text-display-lg ${titleColor} ${
          isCenter ? "max-w-3xl" : "max-w-2xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-[56ch] text-body text-slate lg:text-[1.0625rem] ${descColor}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
