# 0005 — Member login and dues tracking

- Status: Proposed (confirm at the start of phase 2, after reviewing the Excel files)
- Date: 2026-11-08

## Proposal

- **Login by email code / magic link** (Supabase Auth). No passwords to forget or reset.
  Only emails already registered as members can log in; no public sign-up.
- **Dues are stored as individual payments** (one row per month paid). "Paid up to" is
  computed from them, never typed by hand, so the history is kept and mistakes are visible.
- **Excel import**: the current spreadsheets are imported once by a script; afterwards the
  backoffice is the source of truth (with an Excel export for the treasurer).
- **Backoffice access** for selected members via an `admin` role, enforced by RLS.
- Online payment (MB WAY / Multibanco) is a separate, later decision.

## Open points

- Excel layout: columns, monthly vs annual dues, how partial payments are recorded.
- Who are the admins, and do some admins need read-only access?
