"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const slide: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 32 : -32,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -32 : 32,
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  }),
};

const AUTO_ADVANCE_MS = 7000;

export function TestimonialsSection() {
  const quotes = testimonials.quotes;
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);

  const go = useCallback(
    (dir: number) => {
      setIndex(([current]) => {
        const next = (current + dir + quotes.length) % quotes.length;
        return [next, dir];
      });
    },
    [quotes.length],
  );

  const goTo = useCallback(
    (target: number) => {
      setIndex(([current]) => [target, target > current ? 1 : -1]);
    },
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [go]);

  const active = quotes[index];

  return (
    <section className="relative overflow-hidden bg-(--color-bg-raised) py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{ background: "var(--gradient-radial-glow)" }}
      />

      <Container className="relative flex flex-col items-center gap-14">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          headline="Voices from the front office."
          align="center"
        />

        <Reveal delay={0.1} className="w-full max-w-3xl">
          <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-8 sm:min-h-[240px]">
            <Quote
              aria-hidden
              size={40}
              className="text-(--color-accent-2) opacity-70"
            />

            <div className="relative w-full">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center gap-6 text-center"
                >
                  <blockquote className="text-h2 max-w-2xl font-medium text-balance text-(--color-fg)">
                    &ldquo;{active.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex flex-col items-center gap-1.5">
                    <span className="text-sm font-semibold text-(--color-fg)">
                      {active.name}
                    </span>
                    <span className="text-sm text-(--color-fg-muted)">{active.role}</span>
                    {active.placeholder && (
                      <span className="mt-1 text-xs tracking-wide text-(--color-fg-subtle) uppercase">
                        Illustrative example — not a real client quote
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-(--radius-pill) border border-(--color-border-strong) text-(--color-fg-muted) transition-all duration-(--duration-base) ease-(--ease-out-expo) hover:border-(--color-accent-border) hover:text-(--color-fg)"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2.5">
              {quotes.map((quoteItem, i) => (
                <button
                  key={quoteItem.name + i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="flex h-10 w-6 items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-(--radius-pill) transition-all duration-(--duration-base) ease-(--ease-out-expo) ${
                      i === index
                        ? "w-6 bg-(--color-accent-2)"
                        : "w-1.5 bg-(--color-border-strong)"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-(--radius-pill) border border-(--color-border-strong) text-(--color-fg-muted) transition-all duration-(--duration-base) ease-(--ease-out-expo) hover:border-(--color-accent-border) hover:text-(--color-fg)"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
