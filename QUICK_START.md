# Quick Start - Owner Login

## Immediate Access to Your Platform

Your owner authentication is now live and ready to use. This guide will get you logged in and accessing your platform in under 2 minutes.

---

## Step 1: Navigate to Login Page

Open your browser and visit the login page:

**URL**: [https://frontdeskagents.com/login](https://frontdeskagents.com/login)

---

## Step 2: Enter Your Owner Credentials

The login form has two fields labeled **Identity** and **Access Key**. Enter your credentials:

**Identity (Email)**: `frontdeskllc@outlook.com`

**Access Key (Password)**: Your chosen password

If this is your first login, the system will automatically create your owner account and grant you full administrative access. Choose a strong password that you will remember.

---

## Step 3: Access Your Dashboard

After successful authentication, you will be automatically redirected to your dashboard at:

**Dashboard URL**: [https://frontdeskagents.com/dashboard](https://frontdeskagents.com/dashboard)

From the dashboard, you have access to all platform features including the AI workforce, analytics, team management, and more.

---

## Step 4: Access Owner Command Center

As the platform owner, you have exclusive access to the Owner Command Center. This is your supreme control interface for the entire platform.

**Owner Command Center URL**: [https://frontdeskagents.com/dashboard/owner](https://frontdeskagents.com/dashboard/owner)

The Owner Command Center provides you with:

- **Supreme AI Commander**: Central orchestration of all 8 AI divisions
- **Advanced Analytics**: Real-time business intelligence and performance metrics
- **Security Controls**: Audit logs, compliance monitoring, and security settings
- **System Configuration**: Platform-wide settings and integrations
- **User Management**: Add, remove, and manage team members with role assignments

---

## What Happens on First Login

When you log in for the first time with your owner email (`frontdeskllc@outlook.com`), the authentication system performs the following actions automatically:

The system creates a new owner account in the database with your email address and securely hashed password. Your account is assigned the **Owner** role, which is the highest privilege level in the platform. Your subscription tier is automatically set to **Enterprise**, giving you access to all premium features. The system generates secure JWT authentication tokens with a 7-day expiration for your session. Finally, you are granted immediate access to all platform features including the Owner Command Center.

---

## Security & Authentication

Your owner account is protected by enterprise-grade security measures. All passwords are hashed using bcrypt with 10 rounds before storage, ensuring they cannot be reversed or exposed. Authentication uses JWT (JSON Web Tokens) with 7-day access tokens and 30-day refresh tokens. All communications are encrypted using HTTPS in production. The platform implements role-based access control (RBAC) to ensure only authorized users can access sensitive features. Every owner action is logged in the audit trail for compliance and security monitoring.

---

## Troubleshooting

If you encounter the error **"Invalid credentials"**, verify that you are using the correct email address `frontdeskllc@outlook.com` and that your password is entered correctly. Try clearing your browser cache and cookies, or use an incognito/private browsing window.

If you see **"Server configuration error"**, this indicates that the Supabase environment variables may not be configured in Vercel. Navigate to the Vercel Dashboard, go to Settings, then Environment Variables, and ensure that `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are properly set.

If you successfully log in but **cannot access the Owner Command Center**, verify that you are logged in with the owner email address. Check that you are navigating to the correct URL: `https://frontdeskagents.com/dashboard/owner`. Clear your browser cache and try again, or check the browser console (press F12) for any error messages.

---

## Next Steps After Login

Once you have successfully logged in and accessed your dashboard, there are several important next steps to complete your platform setup.

**Configure Environment Variables**: Set up the required environment variables in Vercel for database connectivity and external integrations. This includes Supabase credentials, JWT secret, and API keys for Bland.AI, Twilio, SendGrid, and Stripe.

**Apply Database Schema**: If not already done, apply the database schema to your Supabase project. The schema file is located at `database/schema.sql` and can be executed through the Supabase Dashboard SQL Editor.

**Set Up Integrations**: Configure external service integrations to enable full platform functionality. This includes voice AI (Bland.AI), SMS operations (Twilio), email operations (SendGrid), and payment processing (Stripe).

**Explore Platform Features**: Familiarize yourself with the platform by exploring the AI workforce divisions, analytics dashboards, team management tools, and other features available in your Owner Command Center.

**Review Documentation**: Read through the comprehensive documentation files to understand all platform capabilities. Key documents include the User Guide, Admin Guide, API Reference, and Production Runbook located in the `docs/` directory.

---

## Important URLs

**Production Platform**: https://frontdeskagents.com

**Login Page**: https://frontdeskagents.com/login

**Dashboard**: https://frontdeskagents.com/dashboard

**Owner Command Center**: https://frontdeskagents.com/dashboard/owner

**GitHub Repository**: https://github.com/SAHJONY/FrontDesk-Agents-LLC-Completed

---

## Support Resources

For detailed information about platform features and capabilities, refer to the **Owner Access Guide** (`OWNER_ACCESS_GUIDE.md`) which provides comprehensive documentation on authentication, security, and platform management.

For technical implementation details and API documentation, consult the **API Reference** (`docs/API_REFERENCE.md`) which covers all available endpoints and integration patterns.

For operational procedures and deployment information, review the **Production Runbook** (`docs/PRODUCTION_RUNBOOK.md`) which contains troubleshooting guides and maintenance procedures.

---

**Your platform is ready. Log in now and take command of your 24/7 AI workforce!** 🚀
