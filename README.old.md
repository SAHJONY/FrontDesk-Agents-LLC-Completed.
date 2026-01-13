# Vercel build fix: next.config.js + ESM

Your build log shows:

- `ReferenceError: module is not defined in ES module scope`
- caused because `package.json` contains `"type": "module"`
- and `next.config.js` was written as CommonJS (`module.exports = ...`).

## Apply

1) Replace your repo's `next.config.js` with the one in this folder.

## Alternative (if you prefer CommonJS)

Option B:
- Remove `"type": "module"` from `package.json`, OR
- rename `next.config.js` to `next.config.cjs` and keep CommonJS.

(Only do one path.)
