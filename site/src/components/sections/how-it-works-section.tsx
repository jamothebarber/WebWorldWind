import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { howItWorks } from "@/lib/content";

export function HowItWorksSection() {
  const steps = howItWorks.steps;
  const lastIndex = steps.length - 1;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-(--color-bg) py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{ background: "var(--gradient-radial-glow)" }}
      />

      <Container className="relative">
        <SectionHeading eyebrow={howItWorks.eyebrow} headline={howItWorks.headline} />

        <div className="mt-16 grid grid-cols-1 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-6 md:gap-y-0">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08} className="relative min-w-0">
              <div className="relative flex md:block">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--color-accent-border) bg-(--color-bg-raised) font-mono text-sm font-semibold text-(--color-accent-2)">
                  {step.index}
                </div>

                {/* Connector: horizontal line to the right on desktop */}
                {i !== lastIndex && (
                  <div
                    aria-hidden
                    className="absolute top-1/2 left-11 right-[-1.5rem] hidden h-px -translate-y-1/2 bg-gradient-to-r from-(--color-border-strong) to-transparent md:block"
                  />
                )}

                {/* Connector: vertical line below on mobile */}
                {i !== lastIndex && (
                  <div
                    aria-hidden
                    className="absolute top-11 bottom-[-3rem] left-[21px] w-px bg-(--color-border-strong) md:hidden"
                  />
                )}
              </div>

              <div className="mt-4 flex min-w-0 flex-col gap-2 pl-0 md:mt-5">
                <h3 className="text-h2 font-semibold text-(--color-fg)">{step.title}</h3>
                <p className="text-sm text-(--color-fg-muted)">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
