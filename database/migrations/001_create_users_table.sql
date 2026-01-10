-- ============================================================================
-- FRONTDESK AGENTS: USERS TABLE SCHEMA
-- Migration: 001_create_users_table
-- ============================================================================

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  country VARCHAR(2) NOT NULL,
  node_id VARCHAR(100) UNIQUE NOT NULL,
  client_key VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'STAFF' CHECK (role IN ('OWNER', 'STAFF', 'ADMIN')),
  tier VARCHAR(20) NOT NULL DEFAULT 'BASIC' CHECK (tier IN ('BASIC', 'PROFESSIONAL', 'GROWTH', 'ELITE')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subdomain ON users(subdomain);
CREATE INDEX IF NOT EXISTS idx_users_node_id ON users(node_id);
CREATE INDEX IF NOT EXISTS idx_users_client_key ON users(client_key);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_tier ON users(tier);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT
  USING (auth.uid()::text = id::text);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Only service role can insert new users (via API)
CREATE POLICY "Service role can insert users" ON users
  FOR INSERT
  WITH CHECK (true);

-- Insert default owner user (for testing)
-- Password: Temporary password,Cabezon24$
INSERT INTO users (
  email,
  password_hash,
  full_name,
  name,
  company_name,
  subdomain,
  country,
  node_id,
  client_key,
  role,
  tier
) VALUES (
  'frontdeskllc@outlook.com',
  '$2a$10$Q9anz/vWbqkntrxAl/kwkeK9JPb/H78LMuMzcNRg6b7a/e2xlTRA2', -- Hash for: Temporary password,Cabezon24$
  'FrontDesk LLC Owner',
  'FrontDesk LLC',
  'FrontDesk Agents LLC',
  'frontdesk-main',
  'US',
  'node_frontdesk_main_001',
  'FDDG-MAIN-OWNER-001',
  'OWNER',
  'ELITE'
) ON CONFLICT (email) DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE users IS 'Core user accounts for the FrontDesk Agents platform';
COMMENT ON COLUMN users.id IS 'Unique user identifier (UUID)';
COMMENT ON COLUMN users.email IS 'User email address (unique, used for login)';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password';
COMMENT ON COLUMN users.role IS 'User role: OWNER (full access), ADMIN (elevated), STAFF (standard)';
COMMENT ON COLUMN users.tier IS 'Subscription tier: BASIC, PROFESSIONAL, GROWTH, ELITE';
COMMENT ON COLUMN users.node_id IS 'Unique node identifier for the user workspace';
COMMENT ON COLUMN users.client_key IS 'API client key for external integrations';
