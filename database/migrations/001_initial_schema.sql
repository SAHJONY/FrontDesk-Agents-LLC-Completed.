-- FrontDesk Agents Platform - Initial Database Schema
-- Migration: 001_initial_schema
-- Created: 2026-01-08

-- ============================================================================
-- 1. ALTER EXISTING USERS TABLE
-- ============================================================================

-- Add status column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));

-- Add role column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('owner', 'admin', 'customer', 'agent'));

-- Add created_at and updated_at if they don't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index on status and role for faster queries
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================================================
-- 2. CUSTOMERS TABLE (Multi-tenant support)
-- ============================================================================

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  contact_email VARCHAR(255) NOT NULL UNIQUE,
  contact_phone VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'trial', 'suspended')),
  plan_type VARCHAR(50) DEFAULT 'starter' CHECK (plan_type IN ('starter', 'pro', 'enterprise', 'custom')),
  monthly_limit INTEGER DEFAULT 1000, -- call minutes per month
  api_key VARCHAR(255) UNIQUE,
  webhook_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_api_key ON customers(api_key);

-- ============================================================================
-- 3. AGENTS TABLE (AI Agent Configurations)
-- ============================================================================

CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  voice_id VARCHAR(100), -- Bland.AI voice ID
  voice_provider VARCHAR(50) DEFAULT 'blandai',
  language VARCHAR(10) DEFAULT 'en',
  personality TEXT, -- Agent personality description
  system_prompt TEXT NOT NULL, -- Main prompt for the agent
  greeting_message TEXT,
  fallback_message TEXT,
  max_call_duration INTEGER DEFAULT 600, -- seconds
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'testing')),
  config JSONB DEFAULT '{}', -- Additional configuration
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agents_customer_id ON agents(customer_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);

-- ============================================================================
-- 4. CALLS TABLE (Call Records and Transcripts)
-- ============================================================================

CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  external_call_id VARCHAR(255), -- Bland.AI call ID
  direction VARCHAR(20) CHECK (direction IN ('inbound', 'outbound')),
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  status VARCHAR(50) DEFAULT 'initiated' CHECK (status IN ('initiated', 'ringing', 'in-progress', 'completed', 'failed', 'no-answer', 'busy')),
  duration INTEGER DEFAULT 0, -- seconds
  cost DECIMAL(10, 4) DEFAULT 0.00, -- cost in USD
  recording_url TEXT,
  transcript TEXT,
  summary TEXT,
  sentiment VARCHAR(20), -- positive, negative, neutral
  metadata JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calls_customer_id ON calls(customer_id);
CREATE INDEX IF NOT EXISTS idx_calls_agent_id ON calls(agent_id);
CREATE INDEX IF NOT EXISTS idx_calls_status ON calls(status);
CREATE INDEX IF NOT EXISTS idx_calls_started_at ON calls(started_at);
CREATE INDEX IF NOT EXISTS idx_calls_external_call_id ON calls(external_call_id);

-- ============================================================================
-- 5. SUBSCRIPTIONS TABLE (Billing and Subscription Data)
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('starter', 'pro', 'enterprise', 'custom')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  amount DECIMAL(10, 2) NOT NULL, -- monthly amount
  currency VARCHAR(3) DEFAULT 'USD',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- ============================================================================
-- 6. API_KEYS TABLE (Customer API Keys)
-- ============================================================================

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) NOT NULL UNIQUE, -- hashed API key
  key_prefix VARCHAR(20) NOT NULL, -- first 8 chars for display
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_customer_id ON api_keys(customer_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status);

-- ============================================================================
-- 7. AUDIT_LOGS TABLE (Security and Activity Logging)
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- e.g., 'user.login', 'agent.create', 'call.start'
  resource_type VARCHAR(50), -- e.g., 'user', 'agent', 'call'
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  status VARCHAR(20) CHECK (status IN ('success', 'failure')),
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_customer_id ON audit_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================================
-- 8. TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calls_updated_at BEFORE UPDATE ON calls 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own data
CREATE POLICY customers_isolation ON customers
  FOR ALL
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('owner', 'admin')
  ));

-- Agents can only be accessed by their customer
CREATE POLICY agents_isolation ON agents
  FOR ALL
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('owner', 'admin')
  ));

-- Calls can only be accessed by their customer
CREATE POLICY calls_isolation ON calls
  FOR ALL
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('owner', 'admin')
  ));

-- Subscriptions can only be accessed by their customer
CREATE POLICY subscriptions_isolation ON subscriptions
  FOR ALL
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('owner', 'admin')
  ));

-- API keys can only be accessed by their customer
CREATE POLICY api_keys_isolation ON api_keys
  FOR ALL
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('owner', 'admin')
  ));

-- Audit logs can only be accessed by owner/admin
CREATE POLICY audit_logs_admin_only ON audit_logs
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('owner', 'admin')
  ));

-- ============================================================================
-- 10. SEED DATA
-- ============================================================================

-- Update existing owner user to have correct role and status
UPDATE users 
SET role = 'owner', status = 'active'
WHERE email = 'frontdeskllc@outlook.com';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
