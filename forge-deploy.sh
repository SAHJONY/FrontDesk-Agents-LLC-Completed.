#!/bin/bash

# --- SOVEREIGN FORGE: MASTER DEPLOYMENT ORCHESTRATOR ---
set -e # Exit immediately if any command fails

echo "🚀 INITIALIZING SOVEREIGN FORGE..."

# 1. Local Security Scan (Aegis Local)
echo "🛡️ Step 1: Running Local Secret Scan..."
if git diff --cached | grep -E "sk-[a-zA-Z0-9]{32}|(service_role|SHADOW_VAULT_KEY).*=.*['\"].+['\"]"; then
  echo "🚨 ERROR: Secrets detected in staged changes! Deployment aborted."
  exit 1
fi

# 2. Type Check & Build Verification
echo "📦 Step 2: Verifying Build Integrity..."
npm run build

# 3. Environment Synchronization
echo "🔑 Step 3: Verifying Vault Key Presence..."
if [ -f .env.production ]; then
    echo "✅ Production environment variables detected."
else
    echo "⚠️ WARNING: .env.production missing. Ensure keys are set in Vercel/pdx1."
fi

# 4. Git Synchronization
echo "📤 Step 4: Pushing to Sovereign Repository..."
git push origin main

# 5. Trigger Neural Mesh Update
echo "🌐 Step 5: Triggering Portland (pdx1) Deployment..."
# If using Vercel CLI:
vercel --prod --confirm

echo "--- ✅ DEPLOYMENT COMPLETE: SOVEREIGN CLUSTER IS LIVE ---"
