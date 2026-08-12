"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, CheckCircle2, Pause, PhoneCall, Play, RotateCcw, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { voiceDemo } from "@/lib/content";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PlayState = "idle" | "playing" | "paused" | "done";

const BAR_COUNT = 44;

// Deterministic pseudo-random so server and client render the same markup
// (avoids a hydration mismatch from Math.random()).
function seededRandom(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const a = seededRandom(i, 1);
  const b = seededRandom(i, 2);
  return {
    min: 0.16 + a * 0.14,
    peak: 0.42 + b * 0.56,
    duration: 0.55 + a * 0.65,
    delay: b * 0.5,
    idle: 0.1 + a * 0.22,
  };
});

function clampDuration(text: string) {
  return Math.min(2.5, Math.max(1.5, 1.1 + text.length * 0.013));
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VoiceDemoSection() {
  const transcript = voiceDemo.sampleTranscript;
  const reducedMotion = useReducedMotion();

  const lineDurations = useMemo(() => transcript.map((l) => clampDuration(l.text)), [transcript]);
  const totalDuration = useMemo(
    () => lineDurations.reduce((sum, d) => sum + d, 0),
    [lineDurations],
  );

  const [playState, setPlayState] = useState<PlayState>("idle");
  const [revealCount, setRevealCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playState !== "playing") return;

    if (revealCount >= transcript.length) {
      const t = setTimeout(() => setPlayState("done"), 500);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setRevealCount((c) => c + 1),
      lineDurations[revealCount] * 1000,
    );
    return () => clearTimeout(t);
  }, [playState, revealCount, lineDurations, transcript.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [revealCount]);

  function handleToggle() {
    if (playState === "idle" || playState === "done") {
      setRevealCount(0);
      setPlayState("playing");
    } else if (playState === "playing") {
      setPlayState("paused");
    } else if (playState === "paused") {
      setPlayState("playing");
    }
  }

  const isActive = playState === "playing";
  const elapsed = lineDurations.slice(0, revealCount).reduce((sum, d) => sum + d, 0);
  const nextSpeaker = transcript[revealCount]?.speaker;

  const buttonLabel =
    playState === "playing"
      ? "Pause demo call"
      : playState === "paused"
        ? "Resume demo call"
        : playState === "done"
          ? "Replay demo call"
          : "Play demo call";

  return (
    <section id="voice-demo" className="relative overflow-hidden bg-(--color-bg-raised) py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[520px] w-[520px] opacity-50"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      <div className="grain-overlay" aria-hidden />

      <Container className="relative flex flex-col items-center">
        <SectionHeading
          eyebrow={voiceDemo.eyebrow}
          headline={voiceDemo.headline}
          body={voiceDemo.body}
          align="center"
        />

        <Reveal delay={0.2} className="mt-14 w-full">
          <div className="glass-panel mx-auto w-full max-w-2xl rounded-(--radius-lg) p-5 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-accent-soft) text-(--color-accent-2)">
                  <PhoneCall size={17} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-(--color-fg)">Handled AI Agent</p>
                  <p className="truncate text-xs text-(--color-fg-subtle)">Simulated inbound call</p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                {playState === "playing" && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-(--color-positive)">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-positive) opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-(--color-positive)" />
                    </span>
                    Live
                  </span>
                )}
                {playState === "done" && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-(--color-positive)">
                    <CheckCircle2 size={13} />
                    Call complete
                  </span>
                )}
                <span className="text-xs text-(--color-fg-subtle)">Illustrative example</span>
              </div>
            </div>

            {/* Waveform */}
            <div className="mt-7 flex h-16 items-end justify-center gap-[3px] md:h-20 md:gap-1" aria-hidden>
              {bars.map((bar, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full md:w-1"
                  style={{ background: "var(--gradient-voice)", transformOrigin: "bottom", height: "100%" }}
                  animate={
                    reducedMotion
                      ? { scaleY: isActive ? 0.5 : bar.idle }
                      : isActive
                        ? { scaleY: [bar.min, bar.peak, bar.min * 1.3, bar.peak * 0.75, bar.min] }
                        : { scaleY: bar.idle }
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0.3 }
                      : isActive
                        ? {
                            duration: bar.duration * 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: bar.delay,
                          }
                        : { duration: 0.5, ease: EASE_OUT_EXPO }
                  }
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-(--color-surface-2)">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--gradient-voice)" }}
                animate={{ width: `${(revealCount / transcript.length) * 100}%` }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              />
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="w-11 shrink-0 text-right text-xs tabular-nums text-(--color-fg-subtle)">
                {formatTime(elapsed)}
              </span>

              <button
                type="button"
                onClick={handleToggle}
                aria-label={buttonLabel}
                className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-(--color-fg) text-(--color-bg) transition-all duration-(--duration-base) ease-(--ease-out-expo) hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--color-accent),0_0_32px_-4px_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-4"
              >
                {playState === "idle" && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full animate-pulse-soft"
                    style={{ boxShadow: "0 0 0 1px var(--color-accent-border)" }}
                  />
                )}
                {playState === "playing" ? (
                  <Pause size={22} />
                ) : playState === "done" ? (
                  <RotateCcw size={20} />
                ) : (
                  <Play size={22} className="translate-x-0.5" />
                )}
              </button>

              <span className="w-11 shrink-0 text-xs tabular-nums text-(--color-fg-subtle)">
                {formatTime(totalDuration)}
              </span>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="mt-8 flex max-h-[360px] min-h-[220px] flex-col gap-3 overflow-y-auto pr-1 md:max-h-[420px] md:min-h-[260px]"
            >
              {revealCount === 0 && playState !== "playing" && (
                <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 text-center">
                  <p className="text-sm text-(--color-fg-muted)">
                    Press play to hear how a Handled agent takes a real call.
                  </p>
                </div>
              )}

              {transcript.slice(0, revealCount).map((line, i) => {
                const isAgent = line.speaker === "agent";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    className={cn("flex items-end gap-2.5", isAgent && "flex-row-reverse")}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        isAgent
                          ? "bg-(--color-accent-soft) text-(--color-accent-2)"
                          : "bg-(--color-surface-2) text-(--color-fg-muted)",
                      )}
                    >
                      {isAgent ? <Bot size={15} /> : <User size={15} />}
                    </span>
                    <div
                      className={cn(
                        "min-w-0 max-w-[80%] rounded-(--radius-md) px-4 py-2.5 text-sm leading-relaxed break-words",
                        isAgent
                          ? "bg-(--color-accent-soft) text-(--color-fg)"
                          : "bg-(--color-surface-2) text-(--color-fg-muted)",
                      )}
                    >
                      {line.text}
                    </div>
                  </motion.div>
                );
              })}

              {playState === "playing" && revealCount < transcript.length && (
                <div
                  className={cn(
                    "flex items-end gap-2.5",
                    nextSpeaker === "agent" && "flex-row-reverse",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      nextSpeaker === "agent"
                        ? "bg-(--color-accent-soft) text-(--color-accent-2)"
                        : "bg-(--color-surface-2) text-(--color-fg-muted)",
                    )}
                  >
                    {nextSpeaker === "agent" ? <Bot size={15} /> : <User size={15} />}
                  </span>
                  <div className="flex items-center gap-1 rounded-(--radius-md) bg-(--color-surface-2) px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-(--color-fg-subtle)"
                        animate={reducedMotion ? {} : { y: [0, -4, 0] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
