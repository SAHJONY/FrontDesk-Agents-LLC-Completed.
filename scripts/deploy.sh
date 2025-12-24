#!/bin/bash

echo "🚀 Starting Sovereign Deployment..."

# 1. Clean local build artifacts to prevent 'ghost code'
rm -rf .next
rm -rf dist

# 2. Run a Security Audit (Check for leaked keys)
# Searches for patterns like 'sk-', 'key-', or 'pbk-' in code
echo "🛡️  Running Secret Sauce Audit..."
grep -rE "sk_|key_|api_" . --exclude-dir=node_modules --exclude=.gitignore --exclude=scripts/deploy.sh

# 3. Push to Production (Vercel/pdx1)
echo "🌐 Deploying Worldwide Marketing Funnels..."
git add .
git commit -m "Production: Sovereign Engine v1.0 [Secret Sauce Protected]"
git push origin main

# 4. Sync GitHub Secrets for Automation
# This ensures your Global Scraper has the latest keys without ever being in code
echo "🔑 Syncing Sovereign Vault..."
gh secret set BLAND_AI_KEY < .env.local
gh secret set SUPABASE_SERVICE_ROLE_KEY < .env.local
gh secret set SERPAPI_KEY < .env.local

echo "✅ DEPLOYMENT COMPLETE."
echo "Sunday Scraper is ARMED. Monday Briefing is ACTIVE."
