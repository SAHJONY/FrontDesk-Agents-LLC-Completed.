# Security Notice

## ⚠️ IMPORTANT: Environment Variables

**NEVER commit `.env`, `.env.local`, or `.env.production` files to version control.**

### Previous Security Incident

This repository previously had environment files with sensitive credentials committed to git history. If you cloned this repository before December 30, 2025, please note:

1. **All credentials in those files should be considered compromised**
2. **Rotate ALL API keys, secrets, and passwords immediately:**
   - Supabase service keys
   - Stripe API keys
   - Twilio credentials
   - Anthropic API keys
   - JWT secrets
   - Redis passwords
   - Any other sensitive credentials

### Proper Environment Variable Management

#### For Development
1. Copy `.env.example` to `.env.local`
2. Fill in your actual values
3. Never commit `.env.local` to git

#### For Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add all required variables from `.env.example`
4. Never store production credentials in files

### Git History Cleanup (Repository Owner)

If you are the repository owner, you should clean the git history:

```bash
# Remove sensitive files from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env .env.local .env.production" \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remote (WARNING: This rewrites history)
git push origin --force --all
git push origin --force --tags
```

### Verification

Ensure `.gitignore` contains:
```
.env
.env.local
.env.*.local
.env.production
```

### Questions?

If you have security concerns, please contact the repository owner immediately.
