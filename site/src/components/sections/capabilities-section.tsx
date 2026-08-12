import {
  PhoneCall,
  MessageSquareText,
  KanbanSquare,
  Workflow,
  CalendarCheck2,
  Star,
  LayoutPanelLeft,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/lib/content";

// Maps the kebab-case icon slugs stored in content.ts to their PascalCase
// lucide-react component, e.g. "phone-call" -> PhoneCall.
const ICONS: Record<string, LucideIcon> = {
  "phone-call": PhoneCall,
  "message-square-text": MessageSquareText,
  "kanban-square": KanbanSquare,
  workflow: Workflow,
  "calendar-check-2": CalendarCheck2,
  star: Star,
  "layout-panel-left": LayoutPanelLeft,
  send: Send,
};

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative bg-(--color-bg-raised) py-24 md:py-32">
      <Container className="relative">
        <SectionHeading
          eyebrow={capabilities.eyebrow}
          headline={capabilities.headline}
          body={capabilities.body}
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {capabilities.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.07} className="min-w-0">
                <div
                  className="group relative flex h-full min-w-0 flex-col gap-4 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-6 transition-all duration-(--duration-base) ease-(--ease-out-expo) hover:-translate-y-1 hover:border-(--color-accent-border) hover:bg-(--color-surface-2) hover:shadow-[0_0_0_1px_var(--color-accent),0_0_32px_-8px_var(--color-accent)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-md) bg-(--color-accent-soft) text-(--color-accent-2) transition-colors duration-(--duration-base) group-hover:bg-(--color-accent) group-hover:text-(--color-bg)">
                    {Icon && <Icon size={20} />}
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="text-base font-semibold text-(--color-fg)">{item.title}</h3>
                    <p className="text-sm text-(--color-fg-muted)">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
