import { Clock, PhoneOff, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { problem } from "@/lib/content";

const POINT_ICONS = [TrendingUp, PhoneOff, Clock];

export function ProblemSection() {
  const headlineLines = problem.headline.split("\n");

  return (
    <section className="bg-(--color-bg) py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6">
          <Reveal>
            <Badge>{problem.eyebrow}</Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-display-2 max-w-3xl font-semibold">
              {headlineLines.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    "block",
                    i === headlineLines.length - 1
                      ? "text-(--color-fg)"
                      : "text-(--color-fg-muted)",
                  )}
                >
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-body-lg max-w-2xl text-(--color-fg-muted)">{problem.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {problem.points.map((point, i) => {
            const Icon = POINT_ICONS[i % POINT_ICONS.length];
            return (
              <Reveal key={point.label} delay={0.24 + i * 0.08} className="min-w-0">
                <div className="flex h-full flex-col gap-5 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-8">
                  <div className="flex items-center justify-between gap-3">
                    <Icon size={20} className="text-(--color-fg-subtle)" />
                    {point.placeholder && (
                      <span className="rounded-(--radius-sm) border border-(--color-border) px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-(--color-fg-subtle) uppercase">
                        Illustrative example
                      </span>
                    )}
                  </div>
                  <span className="text-display-2 font-semibold text-(--color-fg)">
                    {point.stat}
                  </span>
                  <p className="text-sm text-(--color-fg-muted)">{point.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
