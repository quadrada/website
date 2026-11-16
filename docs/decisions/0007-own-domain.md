# 0007 — Own domain; printed QR codes use it

- Status: Accepted (amends 0006)
- Date: 2026-11-16

## Context

QR codes will be printed on physical member cards. A code that encodes `quadrada.vercel.app`
depends on Vercel and on that project existing forever; changing host would break the cards.

## Decision

- The site's address is **`https://quadradaacd.com`** (registered at GoDaddy, auto-renew on).
  `www.quadradaacd.com` redirects to it (set in Vercel → Domains).
- **Anything printed uses our own domain**: the QR code encodes `https://quadradaacd.com/qr`.
  Never print a `vercel.app` address.
- `quadrada.vercel.app` redirects to the domain (`next.config.ts`), so old links and test
  QR codes keep working.

## Consequences

- Moving host (Cloudflare, Netlify, …) means pointing the domain's DNS at the new host and
  recreating the `/qr` redirect there. Printed cards keep working.
- **The domain must never expire.** Keep auto-renew on and the GoDaddy payment card valid;
  a lapsed domain breaks every card and could be bought by someone else.
- GoDaddy account access should be shared with at least one other board member.
