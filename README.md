# FrontDesk Agents (Vercel-ready)

This repo is a deployable MVP of **FrontDesk Agents** designed for Vercel:
- Next.js app (marketing + dashboard + widget iframe)
- API routes (tenants, crawl/ingest, widget messaging, Stripe billing)
- Postgres via Prisma (Neon/Supabase recommended)

> Note: The advanced long-running workforce (queues/workers) is not ideal on serverless.
> This MVP uses serverless-safe crawl batches and cron endpoints. You can attach Upstash QStash later.

## 1) Requirements
- Postgres database (Neon/Supabase)
- (Optional) SMTP credentials for handoff emails
- (Optional) Stripe for subscriptions

## 2) Environment variables (Vercel Project Settings → Environment Variables)

Required:
- DATABASE_URL=postgresql://...
- NEXT_PUBLIC_BASE_URL=https://www.frontdeskagents.com (or your Vercel URL)
- NEXT_PUBLIC_API_BASE=https://www.frontdeskagents.com (same origin is fine)
- ADMIN_EMAIL=you@frontdeskagents.com
- ADMIN_PASSWORD=strong-password

Optional (handoff email via SMTP):
- SMTP_HOST=
- SMTP_PORT=587
- SMTP_USER=
- SMTP_PASS=
- SMTP_FROM=FrontDesk Agents <no-reply@frontdeskagents.com>

Optional (Stripe):
- STRIPE_SECRET_KEY=
- STRIPE_WEBHOOK_SECRET=
- STRIPE_PRICE_STARTER=
- STRIPE_PRICE_PRO=
- STRIPE_PRICE_SCALE=

Optional (cron):
- CRON_SECRET=some-long-random-string
- CRAWL_MAX_PAGES=10

## 3) Local dev
```bash
pnpm i
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev
```

## 4) Create a tenant
Go to:
- /app  → login with ADMIN_EMAIL/PASSWORD
- /app/onboarding → create tenant
- /app/tenants → copy widget snippet

## 5) Install widget on customer website
Paste the snippet into their site:
```html
<script src="https://www.frontdeskagents.com/widget-loader.js"
        data-public-key="pk_live_..."
        data-api-base="https://www.frontdeskagents.com"
        async></script>
```

## 6) Crawl & ingest
In /app/tenants, click "Start crawl & ingest" (serverless batch).

## 7) Vercel Cron (optional)
Create a Vercel Cron Job for monthly usage reset:
- POST https://YOUR_DOMAIN/api/cron/reset-usage?secret=CRON_SECRET

## Notes
- Retrieval is keyword-based in this MVP for serverless simplicity.
- Upgrade path: add pgvector column + embedding provider to enable semantic retrieval.


## Semantic retrieval (pgvector + OpenAI embeddings)
- Set:
  - EMBEDDINGS_PROVIDER=openai
  - OPENAI_API_KEY=...
  - OPENAI_EMBED_MODEL=text-embedding-3-small
- Run migrations on your Postgres:
  - `prisma migrate deploy`

This adds `embedding_vector vector(1536)` and an IVFFLAT cosine index to `KbChunk`.
