# Setup & Deployment Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit http://localhost:3000

---

## Detailed Setup

### Prerequisites
- Node.js 22.x: `node --version`
- pnpm 10.x: `pnpm --version`
- Git: `git --version`

### Step 1: Clone Repository
```bash
git clone https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed..git
cd FrontDesk-Agents-LLC-Completed.
```

### Step 2: Install Dependencies
```bash
pnpm install
```

### Step 3: Environment Variables

Create `.env.local`:
```bash
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Authentication
NEXTAUTH_SECRET=your_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# OpenAI API
OPENAI_API_KEY=sk-your_key_here

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Owner Email (Admin Access)
NEXT_PUBLIC_OWNER_EMAIL=admin@example.com

# Redis (Optional)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### Step 4: Run Development Server
```bash
pnpm dev
```

### Step 5: Access Application
- Home: http://localhost:3000
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard

---

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Configure environment variables
   - Click "Deploy"

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy

4. **Configure Domain**
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records

### Option 2: Docker

```bash
# Build image
docker build -t frontdesk-agents .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  frontdesk-agents
```

### Option 3: Self-Hosted (VPS)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone and setup
git clone https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed..git
cd FrontDesk-Agents-LLC-Completed.
pnpm install

# Build
pnpm build

# Run with PM2
npm install -g pm2
pm2 start "pnpm start" --name "frontdesk"
pm2 save
```

---

## Database Setup

### Supabase

1. Create account at https://supabase.com
2. Create new project
3. Get credentials from Settings → API
4. Run migrations:

```bash
pnpm db:migrate
```

---

## Authentication Setup

### Email/Password Login

1. Users can register at `/register`
2. Email verification required
3. JWT tokens issued on login
4. Tokens stored in httpOnly cookies

### OAuth (Optional)

Configure in `.env.local`:
```env
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
```

### Build Fails
```bash
# Check for errors
pnpm build

# If TypeScript errors:
pnpm build --no-lint

# Clear Next.js cache
rm -rf .next
pnpm build
```

### Database Connection Error
- Verify Supabase credentials
- Check network connectivity
- Review Supabase dashboard

---

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle
pnpm build --analyze
```

### Image Optimization
- Use Next.js Image component
- Optimize images before upload
- Use WebP format

### Caching
- Set appropriate cache headers
- Use Redis for session storage
- Implement CDN

---

## Security Checklist

- [ ] Environment variables not committed
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Security headers set

---

## Monitoring & Logs

### Vercel Logs
```bash
# View logs
vercel logs

# Real-time logs
vercel logs --follow
```

### Local Logs
```bash
# Enable debug mode
DEBUG=* pnpm dev
```

---

## Maintenance

### Regular Tasks
- Monitor error rates
- Review analytics
- Update dependencies monthly
- Security patches immediately
- Database backups daily

### Update Dependencies
```bash
pnpm update
pnpm audit fix
```

---

## Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Email: support@frontdeskagents.com

---

**Last Updated**: February 1, 2026
