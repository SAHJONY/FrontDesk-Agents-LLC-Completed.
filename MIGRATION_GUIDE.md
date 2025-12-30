# Migration Guide - Repository Reorganization

## Overview

This repository has been reorganized to follow Next.js 15 best practices and improve maintainability. This guide documents all changes made and required actions.

---

## 🔴 Critical Actions Required

### 1. Rotate All Credentials (URGENT)

Environment files were previously committed to git. **All credentials must be rotated immediately:**

- [ ] Supabase service keys and JWT secrets
- [ ] Stripe API keys and webhook secrets
- [ ] Twilio account SID and auth tokens
- [ ] Anthropic API keys
- [ ] Redis passwords
- [ ] JWT secrets
- [ ] Any other API keys or secrets

### 2. Update Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your NEW (rotated) credentials
3. For production, set variables in Vercel dashboard

---

## 📁 File Structure Changes

### Removed

| What | Why |
|------|-----|
| `/src/` directory | Duplicate of root structure |
| `/api/` directory | Moved to `/lib/api-handlers/` |
| `/app/api/api/` | Nested duplicate removed |
| `.env*` files from git | Security - now gitignored |

### Moved Files

| Old Location | New Location | Reason |
|--------------|--------------|--------|
| `/AISetupForm.tsx` | `/components/forms/AISetupForm.tsx` | Component organization |
| `/CurrencySwitcher.tsx` | `/components/CurrencySwitcher.tsx` | Component organization |
| `/blandAiService.ts` | `/lib/services/blandai.ts` | Service organization |
| `/supabaseClient.js` | `/lib/services/supabase-client.ts` | Service organization + TypeScript |
| `/check-dependencies.js` | `/scripts/check-dependencies.js` | Script organization |
| `/sanitize-logs.js` | `/scripts/sanitize-logs.js` | Script organization |
| `/forge-deploy.sh` | `/scripts/forge-deploy.sh` | Script organization |
| `/Telephony/` | `/lib/telephony/` | Library organization |
| `/Vercel.json` | `/vercel.json` | Lowercase convention |
| `/mic-recorder-to-mp3.d.ts` | `/types/mic-recorder-to-mp3.d.ts` | Type definitions |
| `Add hero image for landing page` | `/docs/hero-image-notes.txt` | Documentation |
| `🚀 Complete FrontDesk Agents - All 30 Routes.md` | `/docs/routes-documentation.md` | Documentation |
| `/api/*` | `/lib/api-handlers/*` | Legacy API handlers |

---

## 🔧 Required Code Updates

### Import Path Changes

You'll need to update imports in your code:

#### Components
```typescript
// OLD
import AISetupForm from '@/AISetupForm'
import CurrencySwitcher from '@/CurrencySwitcher'

// NEW
import AISetupForm from '@/components/forms/AISetupForm'
import CurrencySwitcher from '@/components/CurrencySwitcher'
```

#### Services
```typescript
// OLD
import { blandAiService } from '@/blandAiService'
import { supabase } from '@/supabaseClient'

// NEW
import { blandAiService } from '@/lib/services/blandai'
import { supabase } from '@/lib/services/supabase-client'
```

#### Telephony
```typescript
// OLD
import { blandConfig } from '@/Telephony/blandai-config'

// NEW
import { blandConfig } from '@/lib/telephony/blandai-config'
```

#### API Handlers (if referenced)
```typescript
// OLD
import { handler } from '@/api/auth/login'

// NEW
import { handler } from '@/lib/api-handlers/auth/login'
```

---

## 📦 New Directory Structure

```
FrontDesk-Agents-LLC-Completed/
├── .env.example              ✅ Template for environment variables
├── .gitignore                ✅ Updated to exclude .env files
├── SECURITY.md               ✅ Security guidelines
├── MIGRATION_GUIDE.md        ✅ This file
│
├── app/                      ✅ Next.js 15 App Router
│   ├── api/                  ✅ API routes (Next.js 15 format)
│   │   ├── auth/
│   │   ├── billing/
│   │   └── webhooks/
│   ├── dashboard/
│   ├── login/
│   └── ...
│
├── components/               ✅ All React components
│   ├── forms/                ✅ Form components
│   │   └── AISetupForm.tsx
│   ├── dashboard/
│   ├── ui/
│   └── CurrencySwitcher.tsx
│
├── lib/                      ✅ Utilities, services, and business logic
│   ├── api-handlers/         ✅ Legacy API handlers (Pages Router style)
│   ├── services/             ✅ External service integrations
│   │   ├── blandai.ts
│   │   └── supabase-client.ts
│   ├── telephony/            ✅ Telephony configuration
│   ├── ai/
│   ├── auth/
│   └── ...
│
├── config/                   ✅ Configuration files
├── types/                    ✅ TypeScript type definitions
├── hooks/                    ✅ React hooks
├── contexts/                 ✅ React contexts
├── scripts/                  ✅ Build and utility scripts
├── docs/                     ✅ Documentation
├── public/                   ✅ Static assets
└── ...
```

---

## 🧪 Testing After Migration

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Run Type Check
```bash
npx tsc --noEmit
```

### 4. Build Test
```bash
npm run build
```

### 5. Development Test
```bash
npm run dev
```

### 6. Test Critical Paths
- [ ] Authentication flow
- [ ] API routes
- [ ] Dashboard loads
- [ ] Telephony integration
- [ ] Stripe billing

---

## 🚀 Deployment Checklist

### Vercel Deployment

1. **Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env.example` with production values
   - Ensure `NODE_ENV=production`

2. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Domain Configuration**
   - Set up custom domain if needed
   - Configure CORS_ALLOWED_ORIGINS

4. **Webhooks**
   - Update webhook URLs in Stripe dashboard
   - Update webhook URLs in Twilio dashboard
   - Update callback URLs in any other services

---

## 🐛 Troubleshooting

### Build Errors

**Issue**: Module not found errors
- **Solution**: Update import paths as documented above

**Issue**: TypeScript errors
- **Solution**: Run `npm install` to ensure all types are installed

### Runtime Errors

**Issue**: Environment variables undefined
- **Solution**: Verify all required variables are set in Vercel

**Issue**: API routes returning 404
- **Solution**: Ensure routes are in `/app/api/` with `route.ts` files

### Import Errors

**Issue**: Cannot find module '@/...'
- **Solution**: Check `tsconfig.json` has correct path mappings

---

## 📞 Support

If you encounter issues during migration:

1. Check this guide first
2. Review the SECURITY.md file
3. Check the Next.js 15 documentation
4. Contact the development team

---

## 📝 Changelog

### 2025-12-30 - Repository Reorganization

**Security**
- Removed `.env*` files from git tracking
- Created `.env.example` template
- Added SECURITY.md with credential rotation instructions

**Structure**
- Removed duplicate `/src/` directory
- Removed duplicate `/app/api/api/` directory
- Consolidated all components into `/components/`
- Moved services to `/lib/services/`
- Organized scripts into `/scripts/`
- Moved telephony config to `/lib/telephony/`

**Files**
- Renamed files with unusual characters
- Moved type definitions to `/types/`
- Organized documentation in `/docs/`

**Documentation**
- Created MIGRATION_GUIDE.md
- Created SECURITY.md
- Updated .gitignore
