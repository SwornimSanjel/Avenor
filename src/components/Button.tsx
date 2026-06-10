import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ivory shadow-glow hover:bg-accent-glow hover:shadow-[0_0_50px_-18px_rgba(107,163,247,0.45)]",
  secondary:
    "border border-white/[0.1] bg-white/[0.03] text-ivory shadow-inset hover:border-white/[0.16] hover:bg-white/[0.06]",
  ghost: "text-silver hover:text-ivory",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
};

export function LinkButton({ children, href, variant = "primary", className = "" }: LinkButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (external) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

type SubmitButtonProps = CommonProps & {
  type?: "submit" | "button";
  disabled?: boolean;
};

export function ActionButton({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}: SubmitButtonProps) {
  return (
    <button type={type} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
