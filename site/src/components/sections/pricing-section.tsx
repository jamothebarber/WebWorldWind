import { Check, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricing } from "@/lib/content";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-(--color-bg-raised)">
      <Container className="flex flex-col gap-16">
        <SectionHeading eyebrow={pricing.eyebrow} headline={pricing.headline} align="center" />

        <div className="grid grid-cols-1 items-stretch gap-6 pt-3 lg:grid-cols-3 lg:gap-8">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full min-w-0">
              <div
                className={cn(
                  "relative flex h-full min-w-0 flex-col gap-8 rounded-(--radius-lg) border p-8 transition-all duration-(--duration-base) ease-(--ease-out-expo)",
                  tier.highlighted
                    ? "border-(--color-accent-border) bg-(--color-surface-2) shadow-[0_0_0_1px_var(--color-accent-border),0_30px_60px_-24px_rgba(110,86,248,0.45)] lg:-translate-y-3 lg:scale-105"
                    : "border-(--color-border) bg-(--color-surface) hover:border-(--color-border-strong) hover:-translate-y-1",
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-(--radius-pill) bg-(--color-accent) px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase shadow-[0_8px_20px_-6px_rgba(110,86,248,0.7)]">
                    <Star size={12} className="fill-white" />
                    Most popular
                  </span>
                )}

                <div className="flex flex-col gap-2">
                  <h3 className="text-h1 font-semibold text-(--color-fg)">{tier.name}</h3>
                  <p className="text-sm text-(--color-fg-muted)">{tier.tagline}</p>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-(--color-fg-muted)">
                      <Check
                        size={16}
                        className={cn(
                          "mt-0.5 shrink-0",
                          tier.highlighted ? "text-(--color-accent-2)" : "text-(--color-fg-subtle)",
                        )}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#book"
                  variant={tier.highlighted ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
