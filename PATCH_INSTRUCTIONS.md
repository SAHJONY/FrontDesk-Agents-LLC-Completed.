# FrontDesk Agents — Vercel Build Fix (ESM + PostCSS)

## What this fixes
Your Vercel build is failing with:

- `ReferenceError: module is not defined in ES module scope` at `postcss.config.js`

Cause: your `package.json` has `"type": "module"`, so `postcss.config.js` is treated as ESM.
If that file uses `module.exports`, Node crashes.

## Files in this patch
- `postcss.config.cjs` (CommonJS PostCSS config)
- `next.config.mjs` (fixes invalid `experimental.serverActions` warning)
- `tailwind.config.js` (ESM-safe config)

## Apply steps (GitHub web UI)
1) In your repo root, **DELETE** `postcss.config.js` if it exists.
2) Upload `postcss.config.cjs`, `next.config.mjs`, `tailwind.config.js` (replace existing).
3) Commit to your deployment branch.
4) Re-deploy on Vercel.

## Apply steps (git)
```bash
git checkout SAHJONY-patch-1
rm -f postcss.config.js
cp /path/to/patch/postcss.config.cjs .
cp /path/to/patch/next.config.mjs .
cp /path/to/patch/tailwind.config.js .
git add -A
git commit -m "Fix Vercel build: PostCSS config for type=module + Next config"
git push
```
