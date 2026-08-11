import { cn } from "@/lib/utils";

const SRC = process.env.NEXT_PUBLIC_GHL_FORM_EMBED_SRC;

export function GhlFormEmbed({ className }: { className?: string }) {
  if (!SRC) {
    return (
      <div
        className={cn(
          "flex min-h-[380px] flex-col items-center justify-center gap-3 rounded-(--radius-lg) border border-dashed border-(--color-border-strong) bg-(--color-surface) p-8 text-center",
          className,
        )}
      >
        <p className="text-fg-muted text-sm">
          Your GoHighLevel consultation form will capture leads right here.
        </p>
        <p className="text-fg-subtle text-xs">
          Waiting on <code className="text-fg-muted">NEXT_PUBLIC_GHL_FORM_EMBED_SRC</code>
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface)",
        className,
      )}
    >
      <iframe
        src={SRC}
        title="Request a consultation"
        className="h-[620px] w-full"
        style={{ border: "none" }}
        loading="lazy"
      />
    </div>
  );
}
