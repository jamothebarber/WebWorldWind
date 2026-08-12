"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hero } from "@/lib/content";

const VoiceOrb = dynamic(
  () => import("@/components/three/voice-orb").then((m) => m.VoiceOrb),
  { ssr: false, loading: () => null },
);

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Ambient glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[-10%] h-[600px] w-[600px] opacity-60"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      <div className="grain-overlay" aria-hidden />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex min-w-0 flex-col items-start gap-7"
        >
          <motion.div variants={item}>
            <Badge>{hero.eyebrow}</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-display-1 font-semibold whitespace-pre-line text-(--color-fg)"
          >
            {hero.headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === hero.headline.split("\n").length - 1 ? (
                  <span className="text-gradient-voice">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="text-body-lg max-w-lg text-(--color-fg-muted)">
            {hero.subhead}
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-(--duration-base) group-hover:translate-x-0.5"
              />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              <PhoneCall size={16} />
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.p variants={item} className="text-xs text-(--color-fg-subtle)">
            {hero.microproof}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--gradient-radial-glow)" }}
          />
          <VoiceOrb />
        </motion.div>
      </Container>
    </section>
  );
}
