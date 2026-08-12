"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GhlCalendarEmbed } from "@/components/ui/ghl-calendar-embed";
import { GhlFormEmbed } from "@/components/ui/ghl-form-embed";
import { finalCta } from "@/lib/content";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export function FinalCtaSection() {
  return (
    <section id="book" className="relative overflow-hidden bg-(--color-bg) py-24 md:py-32">
      {/* Ambient glow backdrop — callback to hero's voice motif, bracketing the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-25%] left-1/2 h-[760px] w-[1000px] -translate-x-1/2 opacity-80"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 opacity-40"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      <div className="grain-overlay" aria-hidden />

      <Container className="relative flex min-w-0 flex-col gap-14">
        <SectionHeading
          eyebrow={finalCta.eyebrow}
          headline={finalCta.headline}
          body={finalCta.body}
          align="center"
          className="mx-auto items-center text-center"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <motion.div
            variants={item}
            className="glass-panel flex min-w-0 flex-col gap-5 rounded-(--radius-lg) p-6 md:p-8"
          >
            <p className="text-xs font-medium tracking-wide text-(--color-fg-subtle) uppercase">
              Book a time directly
            </p>
            <GhlCalendarEmbed />
          </motion.div>

          <motion.div
            variants={item}
            className="glass-panel flex min-w-0 flex-col gap-5 rounded-(--radius-lg) p-6 md:p-8"
          >
            <p className="text-xs font-medium tracking-wide text-(--color-fg-subtle) uppercase">
              Prefer we reach out?
            </p>
            <GhlFormEmbed />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
