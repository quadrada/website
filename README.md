# website

Website and future members' portal for A Quadrada — Agremiação Copofónica e Desportiva.
Plan, roadmap and architecture: [docs/PROJECT.md](docs/PROJECT.md).
Decision records: [docs/decisions/](docs/decisions/).

## Stack

Next.js (App Router, TypeScript), CSS Modules, hosted on Vercel. Supabase from phase 2.

## Develop

Requires Node.js (version in `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:3000
npm run check    # formatting, lint, type check (same as CI)
npm run build    # production build
```

Edit the site name and social links in `src/config/site.ts`.
