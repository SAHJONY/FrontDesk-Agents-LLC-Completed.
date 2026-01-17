FrontDesk Agents — Conversion Sprint v1 (Pricing + Proof Stack)

What this ZIP includes
- lib/pricing.ts (single source of truth: $299 / $699 / $1,299 / $2,499)
- Updated /pricing page using canonical pricing
- Updated /terms page using canonical pricing (removes hardcoded legacy prices)
- New components:
  - components/interactive-demo.tsx
  - components/how-it-works.tsx
  - components/roi-calculator.tsx
- New case study page:
  - app/case-studies/clinic-5-locations/page.tsx

Install
1) Copy the folders into your repo root:
   - lib/
   - components/
   - app/
2) Ensure your tsconfig path alias supports "@/" -> project root (common in Next.js).
3) If your signup route is not /signup, update ctaHref in lib/pricing.ts.
4) Deploy.

QA
- /pricing shows only the official prices
- /terms shows the same official prices
- Demo modal opens and plays
- ROI calculator works
- Case study loads
