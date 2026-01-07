# Owner Access Guide - FrontDesk Agents Platform

## Owner Authentication Setup Complete ✅

Your business email **frontdeskllc@outlook.com** has been configured as the platform owner with full administrative access.

---

## How to Access the Platform

### 1. **Navigate to the Login Page**
Visit: [https://frontdeskagents.com/login](https://frontdeskagents.com/login)

### 2. **Enter Your Credentials**
- **Email**: `frontdeskllc@outlook.com`
- **Password**: Your chosen password

### 3. **First-Time Login**
On your first login, the system will automatically:
- Create your owner account in the database
- Assign you the **Owner** role with full privileges
- Grant you access to the **Owner Command Center**
- Set your tier to **Enterprise** level

### 4. **Subsequent Logins**
After your first login, the system will:
- Verify your credentials
- Authenticate you as the platform owner
- Grant immediate access to all features

---

## Access Levels

### ✅ Owner Access (Your Account)
- **Full Platform Control**: Complete access to all features
- **Owner Command Center**: `/dashboard/owner` - Supreme command interface
- **AI Workforce Management**: Control all 8 AI divisions
- **Analytics & Reporting**: Comprehensive business intelligence
- **Security & Compliance**: Full audit logs and security controls
- **Team Management**: Add/remove users, assign roles
- **Billing & Subscriptions**: Manage payments and plans
- **API Access**: All API endpoints including owner-only routes
- **Configuration**: System settings and integrations

### 🔒 Protected Routes (Owner Only)
- `/dashboard/owner` - Owner Command Center
- `/api/owner/*` - Owner-level API endpoints
- `/api/secrets/*` - Sensitive configuration endpoints

### 🌐 Public Routes (No Auth Required)
- `/` - Landing page
- `/pricing` - Pricing information
- `/features` - Feature showcase
- `/dashboard` - Public dashboard view
- `/dashboard/agents` - AI agents overview
- `/dashboard/calls` - Call logs overview

---

## Security Features

### 🔐 Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **7-Day Sessions**: Automatic token expiration after 7 days
- **Refresh Tokens**: 30-day refresh token for extended sessions
- **HTTPS Only**: All communications encrypted in production
- **Password Hashing**: bcrypt with 10 rounds for password security

### 🛡️ Role-Based Access Control (RBAC)
Your owner account has the highest privilege level:
- **Owner** (You) → Full access to everything
- **Admin** → Administrative access (can be assigned by you)
- **Manager** → Team management access
- **User** → Standard user access

### 📊 Audit Logging
All owner actions are logged for compliance:
- Login/logout events
- Configuration changes
- User management actions
- API access patterns
- Security events

---

## Next Steps

### 1. **Set Your Password**
Choose a strong password for your first login. Requirements:
- Minimum 8 characters
- Mix of uppercase and lowercase
- Include numbers and special characters
- Avoid common passwords

### 2. **Access the Owner Command Center**
After logging in, navigate to:
- **URL**: `https://frontdeskagents.com/dashboard/owner`
- **Features**: Supreme AI Commander, Analytics, Team Management

### 3. **Configure Integrations** (Optional)
Set up external services for full functionality:
- **Bland.AI**: Voice AI integration
- **Twilio**: SMS operations
- **SendGrid**: Email operations
- **Stripe**: Payment processing

### 4. **Apply Database Schema** (If Not Done)
The database schema needs to be applied to Supabase:
```bash
# Schema file: database/schema.sql
# Apply via Supabase Dashboard → SQL Editor
```

### 5. **Set Environment Variables in Vercel**
Configure the following in Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `JWT_SECRET` - Secure random string for JWT signing
- `BLAND_AI_API_KEY` - Bland.AI API key (optional)
- `TWILIO_ACCOUNT_SID` - Twilio account SID (optional)
- `TWILIO_AUTH_TOKEN` - Twilio auth token (optional)
- `SENDGRID_API_KEY` - SendGrid API key (optional)
- `STRIPE_SECRET_KEY` - Stripe secret key (optional)

---

## Troubleshooting

### ❌ "Invalid credentials" Error
- Verify you're using the correct email: `frontdeskllc@outlook.com`
- Check your password is correct
- Clear browser cache and cookies
- Try incognito/private browsing mode

### ❌ "Server configuration error"
- Supabase environment variables may not be set in Vercel
- Check Vercel Dashboard → Settings → Environment Variables
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set

### ❌ Cannot Access Owner Command Center
- Verify you're logged in with the owner email
- Check the URL: `https://frontdeskagents.com/dashboard/owner`
- Clear browser cache and try again
- Check browser console for errors (F12)

### ❌ Database Connection Issues
- Ensure Supabase project is active
- Verify database schema has been applied
- Check Supabase service key is correct in Vercel

---

## Technical Details

### Owner Authentication Flow
1. User enters email and password on login page
2. System detects owner email (`frontdeskllc@outlook.com`)
3. Owner authentication service is invoked
4. If first login: Creates owner account with hashed password
5. If existing: Verifies password against stored hash
6. Generates JWT access token (7-day expiry)
7. Generates refresh token (30-day expiry)
8. Returns user object with owner role and enterprise tier
9. Redirects to dashboard with authenticated session

### Token Structure
```json
{
  "userId": "uuid",
  "email": "frontdeskllc@outlook.com",
  "role": "owner",
  "tier": "enterprise",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Database Schema
Your owner account is stored in the `users` table:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  tier VARCHAR(50) DEFAULT 'basic',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Support & Documentation

### 📚 Documentation Files
- **User Guide**: `docs/USER_GUIDE.md`
- **Admin Guide**: `docs/ADMIN_GUIDE.md`
- **API Reference**: `docs/API_REFERENCE.md`
- **Production Runbook**: `docs/PRODUCTION_RUNBOOK.md`
- **Platform Overview**: `docs/PLATFORM_OVERVIEW.md`

### 🔗 Important Links
- **Production URL**: https://frontdeskagents.com
- **GitHub Repository**: https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard

### 💬 Need Help?
If you encounter any issues or need assistance:
1. Check the troubleshooting section above
2. Review the technical documentation
3. Check browser console for error messages
4. Verify all environment variables are set correctly

---

## Platform Status

### ✅ Completed Features
- ✅ Owner authentication system
- ✅ Role-based access control (RBAC)
- ✅ JWT token authentication
- ✅ Owner Command Center
- ✅ 8-Division AI Workforce
- ✅ Analytics & Reporting
- ✅ Security & Compliance
- ✅ Team Management
- ✅ Scheduling System
- ✅ CRM Integration
- ✅ SMS Operations
- ✅ Email Operations
- ✅ Integrations Layer
- ✅ Responsive UI/UX
- ✅ Dark Theme
- ✅ Multi-language Support (50+ languages)

### 🔄 Pending Configuration
- ⏳ Database schema application (Supabase)
- ⏳ External API keys (Bland.AI, Twilio, SendGrid, Stripe)
- ⏳ Production environment variables (Vercel)

---

**Welcome to FrontDesk Agents Platform, Juan! Your 24/7 AI workforce is ready to serve.** 🚀
