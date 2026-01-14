# FrontDesk Agents Platform (Production-Ready ZIP)

This repository is a **complete, deployable** Next.js (App Router) platform build with:
- EN/ES localization (next-intl + middleware)
- Light/Dark mode (next-themes)
- Fortune-500 style landing + pricing + demo + support + legal pages
- Location-based pricing tiers
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


## Worldwide i18n

This repo supports a wide set of locales (dozens of languages) via `next-intl` + middleware.
- `en` and `es` are fully translated out of the box.
- All other locales are enabled and will **safely fall back to English** until you add a messages file under `/messages/<locale>.json`.

To add a new language:
1) Create `messages/<locale>.json` by copying `messages/en.json`.
2) Translate values.
3) Deploy.



## Runtime auto-translation (optional)

This repo can auto-translate missing UI strings at runtime (server-side), so any locale can show translated UI immediately.

### Recommended (vendor-agnostic): Endpoint provider
Set:
- `I18N_RUNTIME_TRANSLATE=1`
- `I18N_TRANSLATE_PROVIDER=endpoint`
- `I18N_TRANSLATE_ENDPOINT=https://your-translation-service/translate`

Your endpoint must accept:
```json
{ "targetLocale": "fr", "texts": ["Hello", "Pricing"] }
```
and return:
```json
{ "translations": ["Bonjour", "Tarifs"] }
```

### Optional: OpenAI provider
Set:
- `I18N_RUNTIME_TRANSLATE=1`
- `I18N_TRANSLATE_PROVIDER=openai`
- `OPENAI_API_KEY=...`
- `OPENAI_TRANSLATE_MODEL=gpt-4o-mini` (optional)

### Scope control
By default only these namespaces are auto-translated:
`nav,pricing,pricingPage,faq`

Override with:
- `I18N_TRANSLATE_ALLOWLIST=nav,pricing,pricingPage,faq,home,...`

Notes:
- Auto-translation increases latency and cost; use caching + translate only what you need.
- For legal pages and compliance copy, prefer human translation and QA.
