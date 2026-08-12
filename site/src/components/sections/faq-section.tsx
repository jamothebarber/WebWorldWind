"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { faq } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="border-b border-(--color-border)">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full min-w-0 items-center justify-between gap-6 py-6 text-left transition-colors duration-(--duration-base) ease-(--ease-out-expo) hover:text-(--color-accent-2)"
        >
          <span className="text-body-lg min-w-0 font-medium text-(--color-fg)">{q}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
            className={cn(
              "flex h-9 w-9 flex-none items-center justify-center rounded-(--radius-pill) border transition-colors duration-(--duration-base) ease-(--ease-out-expo)",
              isOpen
                ? "border-(--color-accent-border) bg-(--color-accent-soft) text-(--color-accent-2)"
                : "border-(--color-border-strong) text-(--color-fg-muted)",
            )}
          >
            <Plus size={16} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: EASE_OUT_EXPO },
              opacity: { duration: 0.28, ease: EASE_OUT_EXPO },
            }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-(--color-fg-muted)">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-(--color-bg-raised) py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={faq.eyebrow} headline={faq.headline} align="center" />

        <Reveal delay={0.1} className="mx-auto w-full max-w-3xl">
          <div className="border-t border-(--color-border)">
            {faq.items.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
