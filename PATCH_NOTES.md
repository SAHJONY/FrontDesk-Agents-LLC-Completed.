Patch v6 — Vercel Build Fix

Fixes
1) Removes "type": "module" from package.json so PostCSS/Tailwind config files that use CommonJS (module.exports) work during Next.js build.
2) Removes experimental.serverActions boolean from next.config.mjs to eliminate Next.js 15 config warning.

Apply
- Replace the files in your repo root with the ones in this zip:
  - package.json
  - next.config.mjs

Then trigger a fresh Vercel deploy (no cache).
