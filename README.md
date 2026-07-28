# BHR — Landing Page Reference Mockup

A working, responsive reference build of the Behavioral Health Response (BHR)
landing page, synthesized from the design comp and cross-checked against the
live site (bhrstl.org). It's meant as a **reference mockup for the development
team** — a real, clickable page they can inspect, measure, and lift tokens
from, not a production deployment.

## Run it

No build step. It's plain HTML/CSS/JS:

```bash
# from the repo root, any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## What's inside

```
index.html      # semantic markup, all sections
css/styles.css  # design system (tokens in :root) + layout
js/main.js      # theme toggle, carousel, count-up, scroll reveal, mobile nav
```

## Sections (top → bottom)

1. **Header** — pill nav, theme toggle, Contact CTA (collapses to a menu on mobile)
2. **Hero** — "Your Path to Mental Wellness Starts Here."
3. **About** — org description + 30-years / 32-states facts
4. **Recognition** — "Missouri's largest 988 provider" + 4 stat cards
5. **Services** (sage band) — auto-playing carousel of service cards
6. **Team** — Tiffany Lacy Clark, President & CEO
7. **The Numbers** (lavender band) — animated count-up stats
8. **News & Media** — 3 article cards
9. **"We Save Lives" marquee** — infinite scroll
10. **Careers** — recruitment block
11. **Footer** — 4 link columns + legal row

## For the dev team

- **Design tokens** live at the top of `css/styles.css` under `:root`
  (colors, radii, shadows, type, spacing). Retheme in one place.
- **Dark mode** is fully wired via `[data-theme="dark"]` and persists to
  `localStorage`; it also respects the OS `prefers-color-scheme`.
- **Images are placeholders.** Every image slot is a styled `.ph` block with a
  `data-img="…"` attribute describing the intended photo, so you know exactly
  what asset each slot expects.
- **Accessibility** — semantic landmarks, ARIA on nav/carousel, visible focus
  targets, and a `prefers-reduced-motion` fallback that disables animation.
- Breakpoints: 960px, 820px, 560px.

## Notes / assumptions

- Fonts: Plus Jakarta Sans (headings) + Inter (body) via Google Fonts.
- Content is verbatim from the comp where legible; a few figures
  (988 provider since 1994, 80,219 calls answered, 32 states) were
  reconciled against the live site.
- This is a static reference — forms, real links, and CMS content are stubbed.
