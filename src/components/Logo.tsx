import Link from "next/link";
import Mark from "./Mark";

type LogoProps = {
  tone?: "ivory" | "ink";
  className?: string;
  href?: string;
};

export default function Logo({ tone = "ivory", className = "", href = "/" }: LogoProps) {
  const wordmark = tone === "ivory" ? "text-ivory" : "text-ink";
  return (
    <Link
      href={href}
      aria-label="Avenor home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-panel-light shadow-inset transition-colors duration-300 group-hover:border-accent/30">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg bg-accent-grad opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-15"
        />
        <Mark className="relative h-[18px] w-[18px] text-ivory" />
      </span>
      <span className={`font-display text-xl font-semibold tracking-wide ${wordmark}`}>
        AVENOR
      </span>
    </Link>
  );
}
