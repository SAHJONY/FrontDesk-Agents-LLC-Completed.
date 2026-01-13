# Database Setup Instructions

## Overview

This directory contains database migrations and setup scripts for the FrontDesk Agents platform.

## Prerequisites

- Supabase account and project
- Database connection details configured in `.env.local`

## Setup Steps

### 1. Configure Environment Variables

Ensure your `.env.local` file has the correct Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres
```

### 2. Run Migrations

#### Option A: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/001_create_users_table.sql`
4. Paste into the SQL editor
5. Click **Run**

#### Option B: Via Command Line

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. Verify Setup

After running the migration, verify that:

1. The `users` table exists
2. The default owner account is created (frontdeskllc@outlook.com)
3. Row Level Security (RLS) policies are enabled

You can check this in the Supabase dashboard under **Table Editor** > **users**.

### 4. Test Authentication

Try logging in with the default owner account:

- **Email**: frontdeskllc@outlook.com
- **Password**: Temporary password,Cabezon24$

## Migrations

### 001_create_users_table.sql

Creates the core `users` table with the following schema:

| Column | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| email | VARCHAR(255) | Unique email address |
| password_hash | TEXT | Bcrypt hashed password |
| full_name | VARCHAR(255) | User's full name |
| name | VARCHAR(255) | Display name |
| company_name | VARCHAR(255) | Company name |
| subdomain | VARCHAR(100) | Unique subdomain |
| country | VARCHAR(2) | Country code |
| node_id | VARCHAR(100) | Unique node identifier |
| client_key | VARCHAR(100) | API client key |
| role | VARCHAR(20) | User role (OWNER, ADMIN, STAFF) |
| tier | VARCHAR(20) | Subscription tier (BASIC, PROFESSIONAL, GROWTH, ELITE) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Security

- **Row Level Security (RLS)** is enabled on all tables
- Users can only view and update their own data
- Service role is required for user creation (via API)
- Passwords are hashed using bcrypt with salt rounds = 10

## Troubleshooting

### Migration Fails

If the migration fails, check:

1. Database connection is working
2. Service role key has sufficient permissions
3. No conflicting table names exist

### Cannot Login

If you cannot login with the default account:

1. Verify the user exists in the `users` table
2. Check that the password hash is correct
3. Ensure JWT_SECRET environment variable is set
4. Check browser console for errors

## Support

For issues or questions, contact: frontdeskllc@outlook.com
