# FrontDesk Agents LLC - Deployment Guide

## Production Deployment

### Prerequisites

- Node.js 22.x or higher
- PostgreSQL 14+ (Supabase)
- Vercel account (or alternative hosting)
- Domain name configured
- SSL certificate
- Environment variables configured

### Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Authentication
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret

# AI Services
OPENAI_API_KEY=your_openai_api_key
BLAND_AI_API_KEY=your_bland_ai_api_key

# Billing
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email
RESEND_API_KEY=your_resend_api_key

# Storage
SUPABASE_STORAGE_BUCKET=call-recordings

# Application
NEXT_PUBLIC_APP_URL=https://frontdeskagents.com
NODE_ENV=production
```

### Deployment Steps

#### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add SUPABASE_URL
# ... add all other environment variables
```

#### 2. Manual Deployment

```bash
# Build the application
pnpm install
pnpm build

# Start production server
pnpm start
```

#### 3. Docker Deployment

```bash
# Build Docker image
docker build -t frontdesk-agents .

# Run container
docker run -p 3000:3000 --env-file .env.production frontdesk-agents
```

### Database Setup

#### 1. Run Migrations

```sql
-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  company_name TEXT,
  phone TEXT,
  industry TEXT,
  plan TEXT DEFAULT 'basic',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  name TEXT NOT NULL,
  role TEXT,
  personality TEXT,
  voice TEXT,
  status TEXT DEFAULT 'active',
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calls (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  agent_id TEXT REFERENCES agents(id),
  phone_number TEXT,
  duration INTEGER,
  status TEXT,
  recording_url TEXT,
  transcript TEXT,
  sentiment TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  key TEXT UNIQUE NOT NULL,
  name TEXT,
  permissions JSONB,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  resource TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  status TEXT
);

-- Additional tables for advanced features
CREATE TABLE IF NOT EXISTS integrations (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  provider TEXT NOT NULL,
  name TEXT,
  category TEXT,
  status TEXT DEFAULT 'active',
  credentials JSONB,
  config JSONB,
  last_sync TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_metrics (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT NOW(),
  cpu FLOAT,
  memory FLOAT,
  disk FLOAT,
  network_inbound FLOAT,
  network_outbound FLOAT,
  active_connections INTEGER,
  requests_per_second FLOAT,
  average_response_time FLOAT,
  error_rate FLOAT
);

CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  severity TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  source TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  acknowledged BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scaling_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  reason TEXT,
  instances_before INTEGER,
  instances_after INTEGER,
  timestamp TIMESTAMP DEFAULT NOW(),
  duration INTEGER
);

CREATE TABLE IF NOT EXISTS sso_providers (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  config JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  name TEXT NOT NULL,
  description TEXT,
  permissions JSONB,
  is_custom BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id TEXT REFERENCES users(id),
  role_id TEXT REFERENCES roles(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS marketplace_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags JSONB,
  author JSONB,
  rating FLOAT DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  price FLOAT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  config JSONB,
  version TEXT,
  compatibility JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketplace_installations (
  customer_id TEXT REFERENCES customers(id),
  item_id TEXT REFERENCES marketplace_items(id),
  installed_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (customer_id, item_id)
);

CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id TEXT PRIMARY KEY,
  item_id TEXT REFERENCES marketplace_items(id),
  user_id TEXT REFERENCES users(id),
  user_name TEXT,
  rating INTEGER NOT NULL,
  comment TEXT,
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_calls_customer_id ON calls(customer_id);
CREATE INDEX idx_calls_created_at ON calls(created_at);
CREATE INDEX idx_agents_customer_id ON agents(customer_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_system_metrics_timestamp ON system_metrics(timestamp);
CREATE INDEX idx_marketplace_items_category ON marketplace_items(category);
CREATE INDEX idx_marketplace_items_featured ON marketplace_items(featured);
```

#### 2. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Customers can view own data" ON customers
  FOR SELECT USING (auth.uid() = user_id);
```

### SSL Configuration

Ensure SSL/TLS is enabled for all connections:

1. Database connections use SSL
2. API endpoints use HTTPS
3. WebSocket connections use WSS
4. All external integrations use secure protocols

### Performance Optimization

#### 1. Enable Caching

```typescript
// Redis configuration
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});
```

#### 2. CDN Configuration

Configure CDN for static assets:
- Images
- JavaScript bundles
- CSS files
- Fonts

#### 3. Database Optimization

- Enable connection pooling
- Create appropriate indexes
- Set up read replicas for analytics
- Configure automatic backups

### Monitoring Setup

#### 1. Application Monitoring

```bash
# Install monitoring tools
npm install @sentry/nextjs

# Configure Sentry
# sentry.client.config.js
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: 'production',
});
```

#### 2. Infrastructure Monitoring

- Set up Vercel Analytics
- Configure uptime monitoring
- Enable error tracking
- Set up log aggregation

### Security Checklist

- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] CSP headers set
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Security headers configured

### Backup Strategy

#### 1. Database Backups

```bash
# Automated daily backups
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > backup_$(date +%Y%m%d).sql

# Upload to S3
aws s3 cp backup_$(date +%Y%m%d).sql s3://backups/database/
```

#### 2. File Backups

- Call recordings backed up to S3
- Configuration files versioned in Git
- Environment variables stored in secure vault

### Scaling Configuration

#### 1. Horizontal Scaling

```yaml
# vercel.json
{
  "regions": ["iad1", "sfo1", "lhr1"],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30,
      "memory": 3008
    }
  }
}
```

#### 2. Auto-Scaling Rules

- Scale up when CPU > 80%
- Scale up when memory > 85%
- Scale down when CPU < 30%
- Minimum 2 instances
- Maximum 100 instances

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    storage: await checkStorage(),
    ai: await checkAI(),
    cache: await checkCache(),
  };

  const healthy = Object.values(checks).every(check => check.status === 'ok');

  return Response.json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  });
}
```

### Rollback Procedure

If deployment fails:

```bash
# Revert to previous version
vercel rollback

# Or deploy specific version
vercel deploy --prod --force
```

### Post-Deployment Verification

1. **Smoke Tests**
   - Login functionality
   - API endpoints responding
   - Database connectivity
   - External integrations working

2. **Performance Tests**
   - Response times < 500ms
   - No memory leaks
   - CPU usage normal
   - Database queries optimized

3. **Security Tests**
   - SSL certificates valid
   - API authentication working
   - Rate limiting active
   - No exposed secrets

### Maintenance Windows

- Schedule: Every Sunday 2:00 AM - 4:00 AM UTC
- Notifications: 48 hours advance notice
- Rollback plan: Ready within 15 minutes
- Communication: Status page updates

### Support Contacts

- **Technical Issues**: tech@frontdeskagents.com
- **Emergency**: +1-XXX-XXX-XXXX
- **Status Page**: status.frontdeskagents.com

## Continuous Deployment

### GitHub Actions Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables updated
- [ ] Database migrations applied
- [ ] Dependencies updated
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Rollback plan prepared
- [ ] Monitoring configured
- [ ] Backup verified
- [ ] Team notified

## Conclusion

This deployment guide ensures a smooth, secure, and scalable production deployment of the FrontDesk Agents platform. Follow all steps carefully and maintain regular backups and monitoring.
