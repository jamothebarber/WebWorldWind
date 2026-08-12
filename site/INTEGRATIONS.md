# GoHighLevel Integration — what's wired, what's still needed

This site is built to connect to your GoHighLevel (GHL) subaccount purely
via **embed snippets** (iframe/script), no API calls, no GHL API keys in the
codebase. Everything below is driven by environment variables so the real
values never need to touch component code — you (or I, once you send them)
just fill in `.env.local`.

## What's already wired

- `src/components/ui/ghl-calendar-embed.tsx` — renders your GHL calendar
  booking widget as a responsive iframe. Falls back to a styled "calendar
  coming soon" placeholder + a mailto/CTA fallback if the env var isn't set,
  so the section never looks broken pre-launch.
- `src/components/ui/ghl-form-embed.tsx` — same pattern for the GHL
  form/consultation-request embed.
- `src/components/ui/ghl-voice-widget-loader.tsx` — injects the GHL Voice AI
  widget's loader script site-wide (mounted once in `layout.tsx`), the same
  way Intercom/Drift-style widgets attach. No-ops entirely if unconfigured.

## What I still need from you

Copy these from your GHL subaccount (**Sites → Settings → Embed**, or the
"</> Embed Code" button on the specific Calendar / Form / Voice AI widget)
and paste them into `site/.env.local` (copy `.env.local.example` to start):

| Variable | Where to find it | What it looks like |
|---|---|---|
| `NEXT_PUBLIC_GHL_CALENDAR_EMBED_SRC` | Calendar widget → Embed → copy the `iframe src` URL | `https://api.leadconnectorhq.com/widget/booking/<calendar-id>` |
| `NEXT_PUBLIC_GHL_FORM_EMBED_SRC` | Form → Embed → copy the `iframe src` URL | `https://api.leadconnectorhq.com/widget/form/<form-id>` |
| `NEXT_PUBLIC_GHL_VOICE_WIDGET_SCRIPT_SRC` | Voice AI / Chat Widget → Embed → the `<script src="...">` URL | `https://widgets.leadconnectorhq.com/loader.js` |
| `NEXT_PUBLIC_GHL_VOICE_WIDGET_ID` | Same embed snippet → the `data-widget-id` (or `data-resources-url`) attribute | `xxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_GHL_LOCATION_ID` | Subaccount → Settings → Business Info | fallback if a snippet is missing a piece |

If any GHL embed snippet you're given looks different from the patterns
above (GHL periodically changes widget markup), paste the **exact raw
snippet** and I'll adapt the embed component to match it exactly rather than
force it into this shape.

## Domain / hosting

This is a Next.js **static export** (`next build` → `site/out/`) — plain
HTML/CSS/JS, deployable to Vercel, Netlify, Cloudflare Pages, or any static
host, or embedded as a GHL custom page/domain. Tell me the target domain and
hosting provider when you're ready to go live and I'll finish that wiring
(DNS notes, redirects, etc.).
