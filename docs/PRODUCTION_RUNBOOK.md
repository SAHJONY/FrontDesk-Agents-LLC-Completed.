# Production Runbook - FrontDesk Agents Platform

**Document Type:** Technical Operations Manual  
**Classification:** Internal Use Only  
**Last Updated:** January 7, 2026  
**Version:** 2.0

---

## ⚠️ Security Notice

This document contains technical implementation details for production deployment.

**DO NOT include:**
- Personal email addresses or phone numbers
- API keys, secrets, or credentials
- Customer data or PII
- Unverifiable security claims

**All sensitive credentials must be stored in:**
- Environment variables (`.env` files, never committed)
- Secure secrets management (AWS Secrets Manager, HashiCorp Vault, etc.)
- Password managers for team access

---

## System Overview

The **FrontDesk Agents Platform** is an AI-powered front office automation system with role-based access control and comprehensive audit logging.

### Architecture

```
Frontend (Next.js)
├── Public Pages (/, /pricing, /features)
├── Authentication (/login, /signup)
└── Protected Dashboards (/dashboard/*)

Backend API (Next.js API Routes)
├── Public APIs (/api/bland/webhook)
├── Authenticated APIs (/api/dashboard/*)
└── Privileged APIs (/api/owner/*, /api/ai/*)

AI Workforce (lib/ai-agents/)
├── Supreme Commander (orchestration)
├── Owner Access Control (RBAC + audit)
├── Self-Healing System (monitoring)
└── 8 Specialized Divisions
```

---

## Authentication & Authorization

### Role-Based Access Control (RBAC)

The platform implements a 4-tier role hierarchy:

| Role | Access Level | Capabilities |
|:-----|:------------|:-------------|
| `owner` | Full access | All operations, financial data, system controls |
| `admin` | Administrative | User management, configuration, reports |
| `operator` | Operational | Day-to-day operations, customer support |
| `viewer` | Read-only | View dashboards and reports only |

### JWT Token Structure

```typescript
{
  userId: string;        // Unique user identifier
  email: string;         // User email (for display only)
  role: UserRole;        // One of: owner, admin, operator, viewer
  iat: number;           // Issued at (Unix timestamp)
  exp: number;           // Expires at (Unix timestamp)
  sessionId: string;     // Unique session identifier
}
```

### Token Configuration

**Environment Variables Required:**

```bash
# JWT Configuration
JWT_SECRET=<strong-random-secret-min-32-chars>
JWT_EXPIRATION=24h

# Owner Configuration (DO NOT use personal emails)
OWNER_USER_ID=owner_<random-id>
OWNER_EMAIL=<configured-in-auth-system>
```

**Token Lifetime:**
- Default: 24 hours
- Refresh: Implemented via `/api/auth/refresh`
- Revocation: Stored in database (not yet implemented)

---

## API Endpoints

### Privileged Endpoints (Owner Role Required)

All endpoints under `/api/owner/*` require:
1. Valid JWT token in `Authorization: Bearer <token>` header
2. Token must contain `role: 'owner'`
3. Session must not be expired
4. All actions are logged to audit trail

#### POST /api/owner/command

Execute privileged commands.

**Request:**
```json
{
  "command": "status" | "override" | "shutdown" | "create_mission" | "access_data" | "view_financials" | "report" | "scale_division" | "restart_system",
  "params": {
    // Command-specific parameters
    "approvalConfirmed": true  // Required for irreversible actions
  }
}
```

**Irreversible Actions:**

These commands require `approvalConfirmed: true`:
- `shutdown` - Emergency system shutdown
- `override` - Override AI decision
- `restart_system` - System restart

**Response:**
```json
{
  "success": true,
  "command": "status",
  "result": { /* command-specific result */ },
  "timestamp": "2026-01-07T12:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient role (not owner)
- `400 Bad Request` - Missing required parameters
- `500 Internal Server Error` - Command execution failed

---

## Audit Logging

### What Gets Logged

Every privileged action is logged with:
- Timestamp (ISO 8601)
- User ID and email
- Action/command name
- Parameters (sanitized, PII masked)
- Result (success/failure/denied)
- Reason (for failures)

### Log Format

```typescript
{
  timestamp: "2026-01-07T12:00:00.000Z",
  userId: "owner_abc123",
  action: "shutdown",
  params: { reason: "Scheduled maintenance", approvalConfirmed: true },
  result: "success",
  reason: null
}
```

### Accessing Audit Logs

```typescript
import { getAuditLog } from '@/lib/ai-agents/owner-access';

// Owner role required
const logs = getAuditLog(session, {
  userId: 'owner_abc123',     // Optional filter
  action: 'shutdown',         // Optional filter
  startDate: new Date('2026-01-01'),
  endDate: new Date('2026-01-31')
});
```

**Production Implementation:**
- Current: In-memory array (development only)
- Required: Database storage with retention policy
- Recommended: AWS CloudWatch, Datadog, or similar

---

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured in Vercel
- [ ] JWT_SECRET is strong random string (min 32 chars)
- [ ] Database migrations applied
- [ ] Owner account created in auth system
- [ ] Supabase RLS policies enabled
- [ ] Rate limiting configured
- [ ] Error monitoring enabled (Sentry, etc.)

### Environment Variables

**Required:**

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Authentication
JWT_SECRET=<strong-random-secret>
NEXTAUTH_URL=https://frontdeskagents.com
NEXTAUTH_SECRET=<strong-random-secret>

# Bland AI
BLAND_API_KEY=<your-bland-api-key>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

**Optional:**

```bash
# OpenAI (for AI features)
OPENAI_API_KEY=<your-openai-key>

# Email (if using custom SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASSWORD=<app-password>

# Monitoring
SENTRY_DSN=<your-sentry-dsn>
```

### Post-Deployment Verification

```bash
# 1. Check homepage loads
curl -I https://frontdeskagents.com
# Expected: 200 OK

# 2. Check API returns 401 without auth
curl https://frontdeskagents.com/api/owner/command
# Expected: 401 Unauthorized

# 3. Check database connection
# (Run from Vercel dashboard or local with production DB)
npm run db:check

# 4. Check Bland webhook endpoint
curl -X POST https://frontdeskagents.com/api/bland/webhook \
  -H "Content-Type: application/json" \
  -d '{"event": "test"}'
# Expected: 200 OK or 400 (not 500)
```

---

## Security Controls

### Implemented

✅ **Authentication**
- JWT-based authentication
- Token expiration (24h default)
- Secure token storage (httpOnly cookies)

✅ **Authorization**
- Role-based access control (RBAC)
- Endpoint-level permission checks
- Session validation on every request

✅ **Audit Logging**
- All privileged actions logged
- Timestamp, user, action, result tracked
- Failure reasons recorded

✅ **Input Validation**
- Required parameters checked
- Type validation on inputs
- SQL injection prevention (Prisma ORM)

✅ **Error Handling**
- No internal details exposed in production
- Proper HTTP status codes
- Error logging for debugging

### Pending Implementation

⚠️ **Rate Limiting**
- Endpoint: All `/api/*` routes
- Limit: 100 requests/minute per IP
- Tool: `@upstash/ratelimit` or Vercel Edge Config

⚠️ **Token Revocation**
- Store active sessions in database
- Implement logout endpoint
- Add session management UI

⚠️ **Audit Log Persistence**
- Move from in-memory to database
- Implement retention policy (90 days)
- Add audit log viewer UI

⚠️ **PII Masking**
- Mask sensitive data in logs
- Implement data access controls
- Add PII detection in audit logs

⚠️ **Compliance Gates**
- Opt-in verification for outreach
- DNC (Do Not Call) list checking
- Quiet hours enforcement (8am-9pm local)

---

## Incident Response

### Emergency Shutdown

**When to use:**
- Security breach detected
- Data integrity compromised
- Critical bug affecting customers
- Scheduled maintenance

**How to execute:**

```bash
# Via API (requires owner role + JWT token)
curl -X POST https://frontdeskagents.com/api/owner/command \
  -H "Authorization: Bearer <owner-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "shutdown",
    "params": {
      "reason": "Security incident - investigating",
      "approvalConfirmed": true
    }
  }'
```

**What happens:**
1. All AI operations paused
2. Incoming webhooks queued (not processed)
3. Dashboard shows maintenance mode
4. Audit log entry created
5. Owner notified

**Recovery:**
```bash
# Restart system after issue resolved
curl -X POST https://frontdeskagents.com/api/owner/command \
  -H "Authorization: Bearer <owner-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "restart_system",
    "params": {
      "approvalConfirmed": true
    }
  }'
```

### Key Rotation

**JWT Secret Rotation:**

1. Generate new secret: `openssl rand -base64 32`
2. Update `JWT_SECRET` in Vercel environment variables
3. Redeploy application
4. All existing tokens invalidated (users must re-login)

**Database Credentials Rotation:**

1. Create new database user in Supabase
2. Update `DATABASE_URL` in Vercel
3. Redeploy application
4. Revoke old database user

---

## Monitoring & Alerting

### Key Metrics

**System Health:**
- API response time (p50, p95, p99)
- Error rate (5xx responses)
- Database connection pool usage
- Memory usage

**Business Metrics:**
- Active users (DAU, MAU)
- API calls per day
- Call completion rate
- Revenue per customer

**Security Metrics:**
- Failed authentication attempts
- Privileged command executions
- API rate limit hits
- Unusual access patterns

### Recommended Tools

- **Application Monitoring:** Vercel Analytics, Datadog
- **Error Tracking:** Sentry
- **Log Aggregation:** AWS CloudWatch, Logtail
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Security:** Snyk, Dependabot

---

## Troubleshooting

### Common Issues

**"Unauthorized: Invalid or missing authentication token"**
- Verify JWT_SECRET is set in environment variables
- Check token expiration (default 24h)
- Ensure Authorization header is present: `Bearer <token>`

**"Forbidden: Owner role required"**
- Verify JWT token contains `role: 'owner'`
- Check user account has owner role in database
- Ensure token is not expired

**"Failed to execute command"**
- Check application logs in Vercel dashboard
- Verify required parameters are provided
- For irreversible actions, ensure `approvalConfirmed: true`

**Database connection errors**
- Verify DATABASE_URL is correct
- Check Supabase project is not paused
- Verify IP allowlist includes Vercel IPs (if restricted)

---

## Support & Escalation

### Internal Support

**For deployment issues:**
1. Check Vercel deployment logs
2. Review application logs in Vercel dashboard
3. Verify environment variables are set
4. Check database connectivity

**For security incidents:**
1. Execute emergency shutdown if needed
2. Review audit logs for suspicious activity
3. Rotate credentials if compromised
4. Document incident timeline

### External Support

**Vercel Support:** https://vercel.com/support  
**Supabase Support:** https://supabase.com/support  
**Bland AI Support:** support@bland.ai

---

## Appendix

### A. Environment Variable Reference

See "Environment Variables" section above.

### B. API Endpoint Reference

See "API Endpoints" section above.

### C. Database Schema

See `supabase/migrations/001_ai_workforce_tables.sql` for complete schema.

### D. Security Compliance

**Current Status:**
- ✅ SOC 2-aligned security practices
- ✅ GDPR-ready data handling
- ⚠️ SOC 2 audit pending
- ⚠️ Penetration testing pending

**Roadmap:**
- Q1 2026: Complete SOC 2 Type I audit
- Q2 2026: Implement additional compliance controls
- Q3 2026: SOC 2 Type II audit
- Q4 2026: ISO 27001 certification (if needed)

---

**Document Owner:** Engineering Team  
**Review Frequency:** Quarterly  
**Next Review:** April 2026
