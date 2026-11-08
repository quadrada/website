# 0003 — Vercel for hosting

- Status: Accepted
- Date: 2026-11-08

## Context

The Next.js app needs a host that runs server code and deploys from GitHub
(`github.com/quadrada/website`).

## Decision

Host on **Vercel**, connected to the GitHub repo: every push to `main` deploys to
production, and every pull request gets its own preview URL.

Start on the **Hobby** (free) plan for the public landing page. Vercel's Hobby plan is for
personal, non-commercial use, so **move to Pro (~$20/month) before the members area goes live**
(phase 2), or earlier if Vercel's terms require it for an association.

## Alternatives considered

- **Netlify** — free plan allows organisations; slightly less seamless for Next.js.
- **Cloudflare** — generous free plan; Next.js runs through an adapter (more setup).

## Consequences

- Environment variables (Supabase keys, SMTP) are set in the Vercel dashboard.
- If costs or terms become a problem, Netlify/Cloudflare remain the fallback options.
