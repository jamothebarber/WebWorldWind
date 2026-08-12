import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-(--radius-pill) border border-(--color-accent-border) bg-(--color-accent-soft) px-3.5 py-1.5 text-xs font-medium tracking-wide text-(--color-accent-2) uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
