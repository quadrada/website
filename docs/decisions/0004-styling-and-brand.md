# 0004 — Styling, brand colour and font

- Status: Accepted
- Date: 2026-11-08

## Decision

- **CSS Modules** per component, plus global **design tokens** (CSS custom properties) in
  `src/app/globals.css`. No CSS framework.
- Brand colour is the **logo orange** (`#f57215`, `--color-accent`). Orange **text** uses
  `--color-accent-strong` (`#c2410c` light / `#fdba74` dark): bright orange on white fails
  WCAG AA contrast. The logo's ribbon green/red (`--color-ribbon-*`) are decorative only.
- The logo is shown as a white circular medallion (it was designed on white) and as the
  Q shield alone where space is small (header, favicon). All generated from the original.
- Light and dark mode follow the visitor's system setting.
- Font: **Plus Jakarta Sans** via `next/font`, which self-hosts it at build time, so visitors
  never contact Google (GDPR-safe).
- No analytics or cookies for now, so no cookie banner. If needed, use a cookieless tool
  (Plausible, Umami, Vercel Web Analytics).

## Why

Tokens keep every page consistent and make a rebrand a one-file change. CSS Modules need no
extra dependency and scope styles per component. Tailwind was considered; not needed at
this size, can be revisited when the backoffice adds many screens.
