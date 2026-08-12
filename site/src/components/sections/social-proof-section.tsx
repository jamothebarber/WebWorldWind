import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { socialProof } from "@/lib/content";

export function SocialProofSection() {
  return (
    <section className="bg-(--color-bg-raised) py-24 md:py-32">
      <Container>
        <Reveal className="flex justify-center">
          <Badge>{socialProof.eyebrow}</Badge>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-(--color-border) pt-12 md:grid-cols-4 md:gap-x-8">
          {socialProof.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex min-w-0 flex-col items-center gap-2 text-center"
            >
              <span className="text-display-2 font-semibold text-(--color-fg)">
                {stat.value}
              </span>
              <span className="text-sm text-(--color-fg-muted)">{stat.label}</span>
              {socialProof.placeholder && (
                <span className="mt-1 rounded-(--radius-sm) border border-(--color-border) px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-(--color-fg-subtle) uppercase">
                  Illustrative example
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
