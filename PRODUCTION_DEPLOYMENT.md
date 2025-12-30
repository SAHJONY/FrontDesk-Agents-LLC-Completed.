# Production Deployment Guide

## 🚀 FrontDesk Agents - Live Production Deployment

This guide provides step-by-step instructions for deploying the FrontDesk Agents platform to live production on Vercel.

---

## ⚠️ CRITICAL: Pre-Deployment Requirements

### 1. Security - Credential Rotation (MANDATORY)

**All credentials MUST be rotated before production deployment:**

- [ ] **Supabase**
  - [ ] Generate new service role key
  - [ ] Generate new JWT secret
  - [ ] Update database URL with new password

- [ ] **Stripe**
  - [ ] Create new live API keys (sk_live_*)
  - [ ] Create new webhook secret (whsec_*)
  - [ ] Update product and price IDs for production

- [ ] **Twilio**
  - [ ] Rotate auth token
  - [ ] Verify account SID
  - [ ] Update phone numbers for production

- [ ] **Anthropic (Claude)**
  - [ ] Generate new API key
  - [ ] Verify usage limits

- [ ] **Redis**
  - [ ] Change password
  - [ ] Verify connection string
  - [ ] Enable TLS

- [ ] **Application Secrets**
  - [ ] Generate new JWT_SECRET (32+ characters)
  - [ ] Generate new MASTER_SOVEREIGN_KEY
  - [ ] Update any other API keys

### 2. Environment Variables Setup

Copy all variables from `.env.example` and fill with **NEW** production values.

---

## 📋 Production Deployment Checklist

### Phase 1: Pre-Deployment Verification

- [ ] Run pre-deployment check script:
  ```bash
  ./scripts/pre-deployment-check.sh
  ```

- [ ] Verify all tests pass
- [ ] Review and fix any warnings
- [ ] Ensure no `.env` files are committed

### Phase 2: Vercel Project Setup

#### 2.1 Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository: `FrontDesk-Agents-LLC-Completed`

#### 2.2 Configure Build Settings

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 22.x
```

#### 2.3 Set Environment Variables

Go to **Settings → Environment Variables** and add ALL variables from `.env.example`:

**Core Application:**
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://app.frontdeskagents.com
NEXT_PUBLIC_API_URL=https://app.frontdeskagents.com/api
DEPLOYMENT_PLATFORM=vercel
DEPLOYMENT_REGION=pdx1
```

**Supabase (NEW credentials):**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key
SUPABASE_SERVICE_KEY=your-new-service-key
SUPABASE_JWT_SECRET=your-new-jwt-secret
DATABASE_URL=postgresql://postgres:new-password@db.your-project.supabase.co:5432/postgres
```

**Redis (NEW credentials):**
```
REDIS_URL=redis://default:new-password@redis-host:6379
REDIS_PASSWORD=your-new-redis-password
REDIS_TLS_ENABLED=true
```

**Twilio (NEW credentials):**
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-new-auth-token
TWILIO_WEBHOOK_BASE_URL=https://app.frontdeskagents.com/api/webhooks/twilio
TWILIO_VOICE_URL=https://app.frontdeskagents.com/api/telephony/voice
TWILIO_STATUS_CALLBACK_URL=https://app.frontdeskagents.com/api/telephony/status
```

**Anthropic (NEW credentials):**
```
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-new-key
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

**Stripe (LIVE keys):**
```
STRIPE_SECRET_KEY=sk_live_your-new-key
STRIPE_WEBHOOK_SECRET=whsec_your-new-secret
STRIPE_PRICE_ID_BASIC=price_199_usd_live
STRIPE_PRICE_ID_PROFESSIONAL=price_399_usd_live
STRIPE_PRICE_ID_GROWTH=price_799_usd_live
STRIPE_PRICE_ID_ELITE=price_1499_usd_live
STRIPE_PRODUCT_ID_SUCCESS_FEE=prod_elite_15_percent_live
```

**Security:**
```
JWT_SECRET=your-new-32-character-secret
CORS_ALLOWED_ORIGINS=https://frontdeskagents.com,https://app.frontdeskagents.com
```

**Feature Flags:**
```
FEATURE_SUCCESS_FEE_AUTOMATION=true
FEATURE_AI_VOICE_NODES=true
FEATURE_REAL_TIME_DASHBOARD=true
```

**Regional Settings:**
```
DEFAULT_MARKET=US
DEFAULT_CURRENCY=USD
LOCAL_TIMEZONE=America/Los_Angeles
```

**Platform Owner:**
```
PLATFORM_OWNER_EMAIL=frontdeskllc@outlook.com
SOVEREIGN_TENANT_ID=your-tenant-id
MASTER_SOVEREIGN_KEY=your-new-master-key
```

**Bypass Flags (for platform owner only):**
```
BYPASS_SUCCESS_FEE=true
BYPASS_SUBSCRIPTION_CHECK=true
IS_EXEMPT_TENANT=true
```

**Important:** Set these for **Production**, **Preview**, and **Development** environments.

### Phase 3: Domain Configuration

#### 3.1 Add Custom Domain

1. Go to **Settings → Domains**
2. Add your production domain: `app.frontdeskagents.com`
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning

#### 3.2 DNS Configuration

Add these DNS records at your domain registrar:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

### Phase 4: External Service Configuration

#### 4.1 Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: `https://app.frontdeskagents.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to Vercel environment variables

#### 4.2 Twilio Webhooks

1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to Phone Numbers → Manage → Active Numbers
3. For each number, configure:
   - **Voice & Fax:**
     - A Call Comes In: Webhook
     - URL: `https://app.frontdeskagents.com/api/telephony/voice`
     - HTTP POST
   - **Status Callback:**
     - URL: `https://app.frontdeskagents.com/api/telephony/status`
     - HTTP POST

#### 4.3 Supabase Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Settings → API**
3. Update **Site URL**: `https://app.frontdeskagents.com`
4. Add to **Redirect URLs**:
   - `https://app.frontdeskagents.com/auth/callback`
   - `https://app.frontdeskagents.com/login`

5. Navigate to **Authentication → URL Configuration**
6. Set **Site URL**: `https://app.frontdeskagents.com`

### Phase 5: Deploy

#### 5.1 Initial Deployment

1. Push your code to GitHub:
   ```bash
   git add -A
   git commit -m "Production deployment configuration"
   git push origin main
   ```

2. Vercel will automatically deploy
3. Monitor deployment logs in Vercel dashboard

#### 5.2 Verify Deployment

- [ ] Deployment completes successfully
- [ ] No build errors
- [ ] All environment variables loaded
- [ ] Domain is accessible

### Phase 6: Post-Deployment Verification

#### 6.1 Health Checks

Test these endpoints:

```bash
# Health check
curl https://app.frontdeskagents.com/api/health

# Authentication
curl https://app.frontdeskagents.com/api/auth/session

# Billing
curl https://app.frontdeskagents.com/api/billing
```

#### 6.2 Functionality Tests

- [ ] **Landing Page**
  - [ ] Visit `https://app.frontdeskagents.com`
  - [ ] Verify page loads correctly
  - [ ] Check all links work

- [ ] **Authentication**
  - [ ] Test signup flow
  - [ ] Test login flow
  - [ ] Test password reset
  - [ ] Verify session persistence

- [ ] **Dashboard**
  - [ ] Login to dashboard
  - [ ] Verify all widgets load
  - [ ] Check real-time updates
  - [ ] Test navigation

- [ ] **API Routes**
  - [ ] Test telephony endpoints
  - [ ] Test webhook handlers
  - [ ] Verify CORS headers

- [ ] **Billing**
  - [ ] Test Stripe checkout
  - [ ] Verify webhook reception
  - [ ] Check subscription updates

- [ ] **Telephony**
  - [ ] Test outbound calls
  - [ ] Verify call logging
  - [ ] Check Twilio integration

#### 6.3 Performance Checks

- [ ] Lighthouse score > 90
- [ ] Page load time < 3s
- [ ] API response time < 500ms
- [ ] No console errors

#### 6.4 Security Checks

- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] No exposed credentials
- [ ] CORS properly configured
- [ ] Rate limiting active

### Phase 7: Monitoring Setup

#### 7.1 Vercel Analytics

1. Enable Vercel Analytics in dashboard
2. Monitor:
   - Page views
   - Performance metrics
   - Error rates

#### 7.2 Error Tracking

Set up error monitoring:
- Vercel Error Tracking (built-in)
- Or integrate Sentry/Datadog

#### 7.3 Uptime Monitoring

Set up uptime monitoring:
- UptimeRobot
- Pingdom
- Or Vercel's built-in monitoring

### Phase 8: Backup & Rollback Plan

#### 8.1 Database Backups

- [ ] Enable Supabase automatic backups
- [ ] Configure backup retention (7-30 days)
- [ ] Test backup restoration

#### 8.2 Rollback Procedure

If issues occur:

1. Go to Vercel Dashboard → Deployments
2. Find last stable deployment
3. Click "Promote to Production"
4. Verify rollback successful

---

## 🔒 Security Best Practices

### Production Security Checklist

- [ ] All credentials rotated
- [ ] Environment variables in Vercel (not in code)
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CORS properly restricted
- [ ] Rate limiting enabled
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Input validation on all endpoints
- [ ] Authentication on protected routes
- [ ] Role-based access control (RBAC)

### Ongoing Security

- [ ] Regular dependency updates
- [ ] Security audit quarterly
- [ ] Credential rotation every 90 days
- [ ] Monitor for suspicious activity
- [ ] Review access logs weekly

---

## 📊 Performance Optimization

### Enabled Optimizations

✅ **Next.js Optimizations:**
- Image optimization (AVIF/WebP)
- Automatic code splitting
- Server-side rendering (SSR)
- Static generation where possible
- API route optimization

✅ **Vercel Optimizations:**
- Edge network CDN
- Automatic caching
- Compression (Brotli/Gzip)
- HTTP/2 & HTTP/3

✅ **Application Optimizations:**
- React strict mode
- Console log removal in production
- Minification and tree-shaking
- Lazy loading components

---

## 🚨 Troubleshooting

### Common Issues

#### Build Fails

**Problem:** Build fails in Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check for TypeScript errors
5. Verify environment variables are set

#### Environment Variables Not Loading

**Problem:** App can't access environment variables

**Solutions:**
1. Verify variables are set in Vercel
2. Check variable names match exactly
3. Redeploy after adding variables
4. Use `NEXT_PUBLIC_` prefix for client-side variables

#### Webhooks Not Working

**Problem:** Stripe/Twilio webhooks not received

**Solutions:**
1. Verify webhook URLs are correct
2. Check webhook secrets match
3. Test with webhook testing tools
4. Review Vercel function logs
5. Verify CORS headers

#### Database Connection Issues

**Problem:** Can't connect to Supabase

**Solutions:**
1. Verify DATABASE_URL is correct
2. Check Supabase project is active
3. Verify IP allowlist (if enabled)
4. Test connection from Vercel
5. Check service role key

---

## 📞 Support & Escalation

### If Deployment Fails

1. Check Vercel deployment logs
2. Review error messages
3. Test locally first
4. Verify all prerequisites completed
5. Contact Vercel support if needed

### Emergency Rollback

If production is broken:

```bash
# Immediate rollback via Vercel CLI
vercel rollback

# Or use Vercel dashboard
# Deployments → Previous deployment → Promote to Production
```

---

## ✅ Final Verification

Before marking deployment as complete:

- [ ] All pre-deployment checks passed
- [ ] Environment variables configured
- [ ] Domain configured and SSL active
- [ ] External webhooks configured
- [ ] Post-deployment tests passed
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Team notified of deployment

---

## 🎉 Deployment Complete!

Your FrontDesk Agents platform is now live in production!

**Next Steps:**
1. Monitor initial traffic and errors
2. Verify all integrations working
3. Test with real users
4. Set up ongoing monitoring
5. Schedule regular security audits

---

**Deployed:** [Date]  
**Version:** 2.2.0  
**Environment:** Production  
**Region:** pdx1 (US West)
