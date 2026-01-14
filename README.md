# FrontDesk Agents Platform (Production-Ready ZIP)

This repository is a **complete, deployable** Next.js (App Router) platform build with:
- EN/ES localization (next-intl + middleware)
- Light/Dark mode (next-themes)
- Fortune-500 style landing + pricing + demo + support + legal pages
- Multi-location pricing calculator
- API-safe endpoints for demo/contact forms (returns JSON)

## Quick Start

1) Install
```bash
npm install
```

2) Run locally
```bash
npm run dev
```

3) Build
```bash
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local` and fill values as needed.

## Deploy (Vercel)

- Import repo
- Set `NEXT_PUBLIC_SITE_URL` to your canonical domain (recommended)
- Deploy

## Notes

- Auth/Billing UI is included (login/signup) but not wired to a provider by default.
- Replace `/app/[locale]/terms` and `/app/[locale]/privacy` with attorney-reviewed documents.
