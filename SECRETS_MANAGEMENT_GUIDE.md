# 🔐 Secrets Management System - Owner's Guide

## Overview

The FrontDesk Agents platform now includes a comprehensive **Secrets Management System** that allows you to securely store, manage, and rotate all platform secrets and environment variables from the Owner Dashboard.

---

## Features

### ✅ **Complete CRUD Operations**
- **Create** new secrets with encryption
- **Read** secrets (with security warnings)
- **Update** existing secrets
- **Delete** secrets (with confirmation)

### ✅ **Security Features**
- **AES-256-GCM Encryption** - Military-grade encryption for all secret values
- **Audit Logging** - Every action is logged (who, what, when)
- **Access Control** - Owner-only access (can be extended to admin roles)
- **View Warnings** - Security warnings before viewing sensitive data
- **Copy Protection** - Secure clipboard operations

### ✅ **Organization**
- **Categories** - Organize secrets by type:
  - 🔑 API Keys (OpenAI, Bland.AI, Stripe, etc.)
  - 🗄️ Database (Connection strings, credentials)
  - 🔐 OAuth (Client IDs and secrets)
  - 🔗 Webhooks (URLs and signing secrets)
  - 📧 Email (SMTP credentials, SendGrid)
  - 💳 Payment (Stripe, PayPal)
  - ⚙️ Other (JWT secrets, encryption keys)

- **Environments** - Separate secrets by environment:
  - Development
  - Staging
  - Production
  - All (shared across environments)

### ✅ **Import/Export**
- **Export to .env** - Download secrets in environment variable format
- **Import from .env** - Bulk import secrets from existing .env files
- **Environment-specific exports** - Export only production secrets, etc.

### ✅ **Search & Filter**
- Search by key name or description
- Filter by environment
- Group by category

---

## How to Access

1. **Log in** to the Owner Dashboard
2. **Navigate to:** `/dashboard/owner`
3. **Scroll down** to the **"Secrets & Environment Variables"** section
4. You'll see the Secrets Manager interface

---

## How to Add a Secret

1. Click the **"Add Secret"** button (top right)
2. Fill in the form:
   - **Key** - Variable name (e.g., `OPENAI_API_KEY`)
     - Must be uppercase
     - Letters, numbers, and underscores only
   - **Value** - The actual secret value
   - **Category** - Select the appropriate category
   - **Environment** - Choose which environment(s)
   - **Description** (optional) - What this secret is for
3. Click **"Add Secret"**
4. The secret is encrypted and stored securely

---

## How to View a Secret

⚠️ **Security Warning:** Viewing secrets exposes sensitive data. Only do this when necessary.

1. Find the secret in the list
2. Click the **eye icon** (👁️) in the Actions column
3. **Confirm** the security warning
4. The secret value will be displayed
5. You can **copy to clipboard** using the copy button
6. Click **"Close"** when done

---

## How to Delete a Secret

1. Find the secret in the list
2. Click the **trash icon** (🗑️) in the Actions column
3. **Confirm** the deletion
4. The secret is permanently deleted (soft delete with audit trail)

---

## How to Export Secrets

### Export All Secrets:
1. Click the **"Export"** button (top right)
2. Select the environment (or "All")
3. A `.env` file will be downloaded

### Export Format:
```bash
# Environment: production
# Generated: 2026-01-07T10:45:00.000Z
# DO NOT COMMIT THIS FILE

# OpenAI API key for AI agents
OPENAI_API_KEY=<encrypted_value>

# Bland.AI API key for voice agents
BLAND_AI_API_KEY=<encrypted_value>

# Supabase database connection string
DATABASE_URL=<encrypted_value>
```

---

## How to Import Secrets

1. Prepare a `.env` file with your secrets:
   ```bash
   OPENAI_API_KEY=sk-...
   BLAND_AI_API_KEY=...
   DATABASE_URL=postgresql://...
   ```

2. Use the API endpoint:
   ```bash
   POST /api/secrets/export
   {
     "envContent": "OPENAI_API_KEY=sk-...\nBLAND_AI_API_KEY=...",
     "environment": "production"
   }
   ```

3. The system will:
   - Parse the file
   - Validate each key
   - Encrypt each value
   - Create the secrets
   - Return a summary (imported count, errors)

---

## API Endpoints

### List Secrets
```http
GET /api/secrets?environment=production
```

**Response:**
```json
{
  "success": true,
  "secrets": [
    {
      "id": "secret_1",
      "key": "OPENAI_API_KEY",
      "value": "***ENCRYPTED***",
      "category": "api_key",
      "description": "OpenAI API key for AI agents",
      "environment": "production",
      "createdAt": "2026-01-07T10:00:00.000Z",
      "updatedAt": "2026-01-07T10:00:00.000Z",
      "isActive": true
    }
  ]
}
```

### Create Secret
```http
POST /api/secrets
Content-Type: application/json

{
  "key": "OPENAI_API_KEY",
  "value": "sk-...",
  "category": "api_key",
  "environment": "production",
  "description": "OpenAI API key for AI agents"
}
```

### Get Secret (Decrypted)
```http
GET /api/secrets/{secretId}?confirm=true
```

⚠️ **Requires `confirm=true`** parameter for security

### Update Secret
```http
PUT /api/secrets
Content-Type: application/json

{
  "secretId": "secret_1",
  "value": "new_value",
  "description": "Updated description"
}
```

### Delete Secret
```http
DELETE /api/secrets?secretId=secret_1
```

### Export Secrets
```http
GET /api/secrets/export?environment=production
```

### Import Secrets
```http
POST /api/secrets/export
Content-Type: application/json

{
  "envContent": "KEY1=value1\nKEY2=value2",
  "environment": "production"
}
```

---

## Security Best Practices

### ✅ **DO:**
- Use strong, unique secrets for each service
- Rotate secrets regularly (every 90 days recommended)
- Use environment-specific secrets (don't share prod secrets with dev)
- Review audit logs regularly
- Delete unused secrets immediately
- Use descriptive names and descriptions

### ❌ **DON'T:**
- Share secrets via email, Slack, or other insecure channels
- Commit secrets to version control (even in private repos)
- Reuse the same secret across multiple services
- Leave old secrets active after rotation
- Take screenshots of secret values
- Copy secrets to unsecured locations

---

## Encryption Details

### Algorithm: **AES-256-GCM**
- **Key Size:** 256 bits
- **Mode:** Galois/Counter Mode (authenticated encryption)
- **IV:** Randomly generated for each secret (16 bytes)
- **Auth Tag:** Included for integrity verification

### Storage Format:
```
{encrypted_value}:{iv}:{auth_tag}
```

### Encryption Key:
- Stored in environment variable: `SECRETS_ENCRYPTION_KEY`
- **CRITICAL:** Keep this key secure and backed up
- **WARNING:** If you lose this key, all secrets are unrecoverable

---

## Audit Logging

Every secret operation is logged with:
- **Action** - created, read, updated, deleted, rotated
- **User ID** - Who performed the action
- **Timestamp** - When it happened
- **IP Address** (optional) - Where it came from
- **User Agent** (optional) - What browser/tool was used
- **Details** - Additional context

### View Audit Logs:
```http
GET /api/secrets/audit?secretId=secret_1&limit=50
```

---

## Troubleshooting

### Problem: Can't see secrets in the dashboard

**Solution:**
1. Make sure you're logged in as the owner
2. Check browser console for errors
3. Verify the API endpoint is responding: `/api/secrets`

### Problem: "Failed to create secret"

**Possible causes:**
1. **Invalid key format** - Must be uppercase, letters/numbers/underscores only
2. **Duplicate key** - Secret with this key already exists in this environment
3. **Missing required fields** - Key, value, category, and environment are required

**Solution:**
- Check the error message in the alert
- Verify key format matches: `^[A-Z_][A-Z0-9_]*$`
- Check if secret already exists

### Problem: "Failed to view secret"

**Possible causes:**
1. **Missing confirmation** - Must add `?confirm=true` to the request
2. **Secret not found** - Secret may have been deleted
3. **Decryption failed** - Encryption key may have changed

**Solution:**
- Confirm the security warning
- Check if secret still exists in the list
- Verify `SECRETS_ENCRYPTION_KEY` environment variable

### Problem: Export downloads empty file

**Possible causes:**
1. **No secrets in selected environment**
2. **API endpoint not responding**

**Solution:**
- Check if secrets exist for the selected environment
- Try exporting "All" environments
- Check browser network tab for errors

---

## Database Schema

### `secrets` Table:
```sql
CREATE TABLE secrets (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  value TEXT NOT NULL,  -- Encrypted: {encrypted}:{iv}:{tag}
  category TEXT NOT NULL,
  description TEXT,
  environment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by TEXT NOT NULL,
  last_accessed_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(key, environment)
);
```

### `secret_audit_logs` Table:
```sql
CREATE TABLE secret_audit_logs (
  id TEXT PRIMARY KEY,
  secret_id TEXT NOT NULL,
  action TEXT NOT NULL,  -- created, read, updated, deleted, rotated
  user_id TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  details TEXT
);
```

---

## Environment Variables Required

### `SECRETS_ENCRYPTION_KEY`
- **Required:** Yes
- **Format:** 64-character hex string (32 bytes)
- **Generate:** `openssl rand -hex 32`
- **Example:** `a1b2c3d4e5f6...` (64 characters)
- **⚠️ CRITICAL:** Back this up securely. If lost, all secrets are unrecoverable.

### `DATABASE_URL`
- **Required:** Yes (for production)
- **Format:** PostgreSQL connection string
- **Example:** `postgresql://user:pass@host:5432/db`

---

## Roadmap / Future Enhancements

### Planned Features:
- [ ] **Secret Rotation Reminders** - Notify when secrets are 90+ days old
- [ ] **Secret Sharing** - Securely share secrets with team members (time-limited)
- [ ] **Secret Versioning** - Keep history of secret values
- [ ] **Integration with Vercel** - Auto-sync secrets to Vercel environment variables
- [ ] **Integration with Supabase** - Auto-sync secrets to Supabase secrets
- [ ] **Secret Templates** - Pre-configured templates for common services
- [ ] **Secret Strength Validator** - Check if secrets meet security requirements
- [ ] **2FA for Viewing Secrets** - Require additional authentication
- [ ] **Secret Expiration** - Auto-expire secrets after a set time
- [ ] **Role-Based Access** - Allow admins to manage non-critical secrets

---

## Support

**Questions or Issues?**
- Check the troubleshooting section above
- Review the API documentation
- Contact: support@frontdeskagents.com

---

**Created:** January 7, 2026  
**Version:** 1.0.0  
**Author:** Manus AI  
**Platform:** FrontDesk Agents LLC
