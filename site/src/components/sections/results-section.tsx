import { TrendingUp, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { results } from "@/lib/content";

export function ResultsSection() {
  return (
    <section className="py-24 md:py-32 bg-(--color-bg)">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <SectionHeading eyebrow={results.eyebrow} headline={results.headline} />
          {results.placeholder && (
            <Reveal delay={0.1}>
              <p className="flex items-center gap-1.5 text-xs text-(--color-fg-subtle)">
                <Sparkles size={13} className="shrink-0" />
                Illustrative examples — shown to demonstrate format, not real client
                results. Swap for your case studies.
              </p>
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:gap-8">
          {results.cases.map((item, i) => (
            <Reveal key={item.industry} delay={i * 0.08}>
              <article className="relative flex h-full min-w-0 flex-col gap-6 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-8 transition-all duration-(--duration-base) ease-(--ease-out-expo) hover:-translate-y-1 hover:border-(--color-border-strong)">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-h2 font-semibold text-(--color-fg)">
                    {item.industry}
                  </h3>
                  {item.placeholder && (
                    <span className="inline-flex shrink-0 items-center rounded-(--radius-sm) border border-(--color-border-strong) px-2 py-1 text-[0.65rem] font-medium tracking-wide text-(--color-fg-subtle) uppercase">
                      Illustrative
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium tracking-wide text-(--color-fg-subtle) uppercase">
                      Problem
                    </p>
                    <p className="text-sm text-(--color-fg-muted)">{item.problem}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium tracking-wide text-(--color-fg-subtle) uppercase">
                      Build
                    </p>
                    <p className="text-sm text-(--color-fg-muted)">{item.build}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2 border-t border-(--color-border) pt-6">
                  <TrendingUp size={20} className="shrink-0 text-(--color-accent-2)" />
                  <p className="text-h2 font-semibold text-gradient-voice">
                    {item.outcome}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
