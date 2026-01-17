# FrontDesk Agents — Pricing Canon Patch

## Goal
Make these the **ONLY** prices used across the entire platform:

- STARTER — $299/mo — 1 Location
- PROFESSIONAL — $699/mo — 2–5 Locations
- GROWTH — $1,299/mo — 6–15 Locations
- ENTERPRISE — $2,499/mo — 16+ Locations
- Guarantee: 14-day money-back guarantee • Cancel anytime

## What this patch includes
1) `lib/pricing.ts` — single source of truth for all pricing.
2) `app/pricing/page.tsx` — pricing page that renders ONLY from `lib/pricing.ts`.
3) `app/terms/page.tsx` — terms page with pricing section rendered ONLY from `lib/pricing.ts` (no hardcoded values).
4) `scripts/pricing_audit.sh` — scans repo for old price strings to remove.

## Install steps
1) Copy the folders into your repo root:
   - `lib/pricing.ts`
   - `app/pricing/page.tsx`
   - `app/terms/page.tsx`
   - `scripts/pricing_audit.sh`

2) Run audit:
   - `bash scripts/pricing_audit.sh`

3) Replace any old pricing strings found with imports from `@/lib/pricing`.
   - The goal is: **no hardcoded prices anywhere**.

## Notes
- If your terms route is not `/terms`, move `app/terms/page.tsx` to the correct route in your repo.
- If your app uses a different styling system, only the markup may need minor adjustments.
