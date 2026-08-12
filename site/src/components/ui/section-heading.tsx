import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  headline,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  headline: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge>{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="text-h1 max-w-2xl font-semibold whitespace-pre-line text-(--color-fg)">
          {headline}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.14}>
          <p className="text-body-lg max-w-xl text-(--color-fg-muted)">{body}</p>
        </Reveal>
      )}
    </div>
  );
}
