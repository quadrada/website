# CLAUDE.md

@AGENTS.md

Website and future members' portal for A Quadrada — Agremiação Copofónica e Desportiva. Read `docs/PROJECT.md` first
(vision, roadmap, architecture, open questions) and `docs/decisions/` for why things are the
way they are. Record new decisions there in the same change.

- Stack: Next.js (App Router, TypeScript) on Vercel; Supabase (EU) for auth/DB from phase 2.
- Node is installed at `~/.local/lib/node/bin` (not on the default PATH of non-login shells).
- Commands: `npm run dev`, `npm run check` (format + lint + typecheck), `npm run build`.
- All UI copy in European Portuguese (pt-PT, e.g. "sócio", "brevemente", "contactos").
- Official name: "A Quadrada — Agremiação Copofónica e Desportiva" (from `src/config/site.ts`).
- Brand colour is the logo orange. Orange text must use `--color-accent-strong` (contrast).
- Logo files are generated: edit `brand/`, then run `python3 scripts/build_brand_assets.py`.
- Use the tokens in `src/app/globals.css`; never hard-code new colours or spacing.
- Site name, domain (`https://quadradaacd.com`) and social links come from `src/config/site.ts`.
- Anything printed (QR codes) must use our own domain, never `vercel.app` (decision 0007).
- Accessibility and mobile (320px+) are required: semantic HTML, visible focus, AA contrast,
  reduced-motion support. Check pages at mobile and desktop widths before finishing.
- Never commit member data (Excel exports, CSVs) or secrets.
