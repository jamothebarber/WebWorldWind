# Build conventions — read before building any section

This file is the shared contract every section component follows. Read it
alongside `BRAND.md` (voice/positioning) and `src/lib/content.ts` (the actual
copy to use) before writing any component. Do not invent copy — pull from
`content.ts`. If something you need isn't in `content.ts` yet, add it there
first (typed export), don't hardcode strings in the component.

## Stack

- Next.js App Router, TypeScript, Tailwind v4 (CSS-based theme in
  `src/app/globals.css` — tokens are CSS custom properties consumed via
  arbitrary-value Tailwind syntax, e.g. `bg-(--color-surface)`,
  `rounded-(--radius-lg)`, `text-(--color-fg-muted)`).
- `framer-motion` for animation, `lucide-react` for icons (`<IconName />`
  imported from `lucide-react`, PascalCase from the kebab-case slugs in
  `content.ts`, e.g. `phone-call` → `PhoneCall`).
- `three` / `@react-three/fiber` / `@react-three/drei` available for any 3D
  work (hero centerpiece, etc.) — keep 3D scenes in their own client
  component, dynamically imported with `ssr: false` since this is a static
  export.

## File layout

- One section = one file in `src/components/sections/<kebab-name>.tsx`,
  default-exported as `<PascalCase>Section` (e.g. `HeroSection`).
- Shared building blocks live in `src/components/ui/` — reuse
  `Button`, `Badge`, `Container`, `SectionHeading`, `Reveal` rather than
  rebuilding equivalents. Add new primitives there if a pattern repeats
  across sections.
- Sections are Server Components by default; add `"use client"` only when a
  section needs interactivity/animation state (most will, since Framer
  Motion hooks require it — that's expected and fine).

## Layout rhythm

- Every section is wrapped in `<section id="..." className="py-24 md:py-32">`
  and its content in `<Container>`. Don't invent alternate max-widths —
  `.container-max` (1200px) is the one grid everything aligns to.
- Section `id`s must match the anchors used in `src/lib/content.ts` nav
  links (`#voice-demo`, `#how-it-works`, `#capabilities`, `#pricing`,
  `#faq`, `#book`).
- Alternate subtle background treatment between sections so the page has
  rhythm without hard dividers: plain `bg-(--color-bg)`, or
  `bg-(--color-bg-raised)` for "elevated" sections — never a hard border,
  use a soft radial glow (`--gradient-radial-glow`) or gradient fade at
  section transitions instead.

## Typography

- Headlines: `text-display-1` / `text-display-2` / `text-h1` / `text-h2`
  classes from `globals.css` (fluid clamp() sizes) — never hardcode a
  `text-5xl` etc. for a section headline.
- Body copy: `text-body-lg` for lead paragraphs, `text-sm text-(--color-fg-muted)`
  for secondary copy.
- Use `<SectionHeading>` for the standard eyebrow+headline(+body) pattern at
  the top of a section rather than hand-rolling it.

## Motion

- Default reveal: wrap scroll-triggered content in `<Reveal>` (fade+rise,
  `viewport={{ once: true }}`) rather than writing bespoke
  `motion.div initial/whileInView` blocks — keeps timing consistent
  site-wide. Stagger children with the `delay` prop in ~0.06–0.1s
  increments.
- Hover states: buttons/cards lift subtly (`-translate-y-0.5` to `-1`) with
  `duration-(--duration-base) ease-(--ease-out-expo)` — see `Button` for the
  reference implementation.
- Respect `prefers-reduced-motion` — this is already handled globally in
  `globals.css`; don't add motion that bypasses it (avoid raw CSS
  `animation` outside the tokenized keyframes where possible).

## Framer Motion typing gotcha

If you factor a `variants` object out to a top-level `const` (rather than
inline on the `motion.*` prop), TypeScript loses contextual typing and a
literal `ease: [0.16, 1, 0.3, 1]` array will fail to satisfy `Variants`.
Annotate the const explicitly: `const container: Variants = {...}` (import
`type { Variants }` from `framer-motion`), and type any extracted easing
array as a 4-tuple, e.g. `const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]`.
Inline `transition={{ ease: [...] }}` props don't need this — only
hoisted `Variants` objects do. Run `npx tsc --noEmit` before considering a
section done.

## Content rules

- Anything derived from real client data that doesn't exist yet (metrics,
  testimonials, case studies) MUST come from `content.ts` where it's already
  flagged `placeholder: true`, and MUST render a small, visually distinct
  "illustrative example" marker near it (e.g. `text-xs text-(--color-fg-subtle)`
  caption) — never present a placeholder as if it were real.
- GHL embeds: use `<GhlCalendarEmbed />` / `<GhlFormEmbed />` from
  `src/components/ui/` — never hand-roll an iframe to a GHL URL in a section
  component.

## Critical mobile-overflow gotcha (grid/flex + long text)

Tailwind's `grid` with only a `lg:grid-cols-[...]` override (no base
`grid-cols-1`) leaves the implicit mobile column `auto`-sized, which can
grow to the **max-content** width of a long headline instead of respecting
the viewport — the headline never wraps and the whole page gets horizontal
overflow on mobile. Same failure mode with `flex` + `items-start`: flex
items shrink-wrap to content by default.

Rule: any section using `grid` for a responsive layout MUST set an explicit
base column count (e.g. `grid grid-cols-1 lg:grid-cols-3`), never rely on
the implicit auto column. Flex columns holding headline/paragraph text
should get `min-w-0` on the flex container. After building a section, check
`document.documentElement.scrollWidth === document.documentElement.clientWidth`
at 375–390px width (or just eyeball for a horizontal scrollbar) before
calling it done — this bug is silent in a desktop-only check.

## Responsiveness

- Design mobile-first; verify at 375px, 768px, 1024px, 1440px. Grids that
  are 3–4 columns on desktop should collapse to 1–2 columns on mobile, not
  shrink-to-fit horizontally-scrolling content (except intentional
  horizontal scrollers like a logo marquee).
- Touch targets ≥ 40px tall on mobile.

## What "done" looks like

Before considering a section finished: it uses only tokens/primitives above
(no ad hoc colors/spacing), it has at least one deliberate motion moment, it
reads correctly at mobile width, and its copy comes verbatim (or lightly
adapted for length) from `content.ts`.
