# 0001 — Next.js as the framework

- Status: Accepted
- Date: 2026-11-08

## Context

The site starts as one public page but will grow a members area (login, dues status, member
card) and a backoffice for the board. That needs server-side code, sessions and many routes.

## Decision

Use **Next.js (App Router) with TypeScript**, starting now, so the landing page and the
members area live in one codebase. Cache Components is enabled (Next.js 16 default).

## Alternatives considered

- **Plain HTML/CSS** — fine for one page; would need a full rewrite for the members area.
- **Astro** — great for content sites; more custom work for dashboard/backoffice screens.

## Consequences

- Requires Node.js (version pinned in `.nvmrc`; `engines` in `package.json`).
- Next.js changes quickly: read `node_modules/next/dist/docs/` before using an API.
- Not tied to Vercel: Next.js can be self-hosted or run on other platforms if needed.
