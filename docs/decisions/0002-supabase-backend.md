# 0002 — Supabase for login, database and storage

- Status: Accepted
- Date: 2026-11-08

## Context

Members must log in and see their own dues status; board members need to manage everyone.
Dues are tracked in Excel today. The data is personal data under GDPR.

## Decision

Use **Supabase**: Auth (login), Postgres (members, payments) and Storage (member photos),
in an **EU region** (Frankfurt). Access rules are enforced in the database with row-level
security (RLS), so a bug in the UI cannot leak another member's data.

## Alternatives considered

- **Firebase** — non-relational; payments and reports fit a SQL database better.
- **Own server + database** — more work and more to secure for a volunteer-run association.
- **Ready-made membership SaaS** — quick, but per-member fees, limited design, hard to leave.

## Consequences

- Schema and RLS policies are SQL migrations committed to git (`supabase/migrations/`).
- Free plan: projects **pause after ~1 week without activity** and backups are limited;
  plan on the Pro plan (~$25/month) once real member data is stored. Check pricing then.
- Built-in email sending is rate-limited; login emails go through an SMTP provider
  (e.g. Resend or Brevo).
- Secrets (service role key) live only in Vercel environment variables, never in git.
