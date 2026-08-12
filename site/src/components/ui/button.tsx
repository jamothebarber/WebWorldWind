import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-pill) font-medium transition-all duration-(--duration-base) ease-(--ease-out-expo) focus-visible:outline-2 focus-visible:outline-(--color-accent) disabled:pointer-events-none disabled:opacity-50";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-(--color-fg) text-(--color-bg) hover:bg-white shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset] hover:shadow-[0_0_0_1px_var(--color-accent),0_0_24px_-4px_var(--color-accent)] hover:-translate-y-0.5",
  secondary:
    "bg-(--color-surface-2) text-(--color-fg) border border-(--color-border-strong) hover:border-(--color-accent-border) hover:bg-(--color-surface) hover:-translate-y-0.5",
  ghost: "text-(--color-fg-muted) hover:text-(--color-fg)",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const isExternal = href.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (isExternal) {
    return (
      <a href={href} className={classes} onClick={onClick} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
