-- FrontDesk Agents AI Workforce Database Schema
-- Migration: 001 - Core AI Workforce Tables

-- ============================================================================
-- CALLS TABLE
-- Stores all call records from Bland.AI
-- ============================================================================
CREATE TABLE IF NOT EXISTS calls (
  id BIGSERIAL PRIMARY KEY,
  call_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  phone_number TEXT NOT NULL,
  direction TEXT CHECK (direction IN ('inbound', 'outbound')),
  status TEXT CHECK (status IN ('in_progress', 'completed', 'failed', 'no_answer')),
  disposition TEXT,
  agent_name TEXT,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration INTEGER DEFAULT 0,
  call_status TEXT,
  summary TEXT,
  transcript TEXT,
  recording_url TEXT,
  recording_available BOOLEAN DEFAULT FALSE,
  transcript_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calls_call_id ON calls(call_id);
CREATE INDEX idx_calls_user_id ON calls(user_id);
CREATE INDEX idx_calls_status ON calls(status);
CREATE INDEX idx_calls_started_at ON calls(started_at DESC);

-- ============================================================================
-- CALL ANALYTICS TABLE
-- Stores AI analysis of calls
-- ============================================================================
CREATE TABLE IF NOT EXISTS call_analytics (
  id BIGSERIAL PRIMARY KEY,
  call_id TEXT REFERENCES calls(call_id) ON DELETE CASCADE,
  summary TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative', 'angry', 'frustrated')),
  keywords TEXT[],
  action_items TEXT[],
  customer_intent TEXT,
  lead_quality TEXT CHECK (lead_quality IN ('hot', 'warm', 'cold', 'unknown')),
  conversion_probability NUMERIC(5,2) DEFAULT 0,
  analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_call_analytics_call_id ON call_analytics(call_id);
CREATE INDEX idx_call_analytics_lead_quality ON call_analytics(lead_quality);

-- ============================================================================
-- AGENT PERFORMANCE TABLE
-- Tracks performance metrics for each AI agent
-- ============================================================================
CREATE TABLE IF NOT EXISTS agent_performance (
  id BIGSERIAL PRIMARY KEY,
  agent_name TEXT UNIQUE NOT NULL,
  total_calls INTEGER DEFAULT 0,
  successful_calls INTEGER DEFAULT 0,
  total_duration INTEGER DEFAULT 0,
  conversion_rate NUMERIC(5,2) DEFAULT 0,
  avg_duration NUMERIC(10,2) DEFAULT 0,
  last_call_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_performance_name ON agent_performance(agent_name);
CREATE INDEX idx_agent_performance_conversion_rate ON agent_performance(conversion_rate DESC);

-- ============================================================================
-- BILLING USAGE TABLE
-- Tracks usage for billing purposes
-- ============================================================================
CREATE TABLE IF NOT EXISTS billing_usage (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  call_id TEXT REFERENCES calls(call_id),
  duration_seconds INTEGER DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0,
  cost_usd NUMERIC(10,2) DEFAULT 0,
  billed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_billing_usage_user_id ON billing_usage(user_id);
CREATE INDEX idx_billing_usage_billed_at ON billing_usage(billed_at DESC);

-- ============================================================================
-- FOLLOW UP TASKS TABLE
-- Stores automated follow-up tasks
-- ============================================================================
CREATE TABLE IF NOT EXISTS follow_up_tasks (
  id BIGSERIAL PRIMARY KEY,
  call_id TEXT REFERENCES calls(call_id),
  task_type TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  scheduled_for TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  action_items TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_follow_up_tasks_scheduled ON follow_up_tasks(scheduled_for);
CREATE INDEX idx_follow_up_tasks_status ON follow_up_tasks(status);

-- ============================================================================
-- ACTION ITEMS TABLE
-- Stores action items from call analysis
-- ============================================================================
CREATE TABLE IF NOT EXISTS action_items (
  id BIGSERIAL PRIMARY KEY,
  call_id TEXT REFERENCES calls(call_id),
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  assigned_to TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_action_items_call_id ON action_items(call_id);
CREATE INDEX idx_action_items_status ON action_items(status);

-- ============================================================================
-- CONVERSION FUNNEL TABLE
-- Tracks conversion funnel stages
-- ============================================================================
CREATE TABLE IF NOT EXISTS conversion_funnel (
  id BIGSERIAL PRIMARY KEY,
  call_id TEXT REFERENCES calls(call_id),
  stage TEXT NOT NULL,
  lead_quality TEXT,
  conversion_probability NUMERIC(5,2) DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversion_funnel_call_id ON conversion_funnel(call_id);
CREATE INDEX idx_conversion_funnel_stage ON conversion_funnel(stage);

-- ============================================================================
-- DAILY METRICS TABLE
-- Aggregated daily metrics for dashboard
-- ============================================================================
CREATE TABLE IF NOT EXISTS daily_metrics (
  id BIGSERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  total_calls INTEGER DEFAULT 0,
  active_calls INTEGER DEFAULT 0,
  completed_calls INTEGER DEFAULT 0,
  total_duration INTEGER DEFAULT 0,
  avg_duration NUMERIC(10,2) DEFAULT 0,
  conversion_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_daily_metrics_date ON daily_metrics(date DESC);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_calls_updated_at BEFORE UPDATE ON calls
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_performance_updated_at BEFORE UPDATE ON agent_performance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_follow_up_tasks_updated_at BEFORE UPDATE ON follow_up_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_action_items_updated_at BEFORE UPDATE ON action_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_metrics_updated_at BEFORE UPDATE ON daily_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_up_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own calls
CREATE POLICY "Users can view own calls" ON calls
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own billing
CREATE POLICY "Users can view own billing" ON billing_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can do everything
CREATE POLICY "Service role full access calls" ON calls
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access analytics" ON call_analytics
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access billing" ON billing_usage
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- INITIAL DATA
-- ============================================================================
-- Insert initial daily metrics for today
INSERT INTO daily_metrics (date, total_calls, active_calls, completed_calls, total_duration)
VALUES (CURRENT_DATE, 0, 0, 0, 0)
ON CONFLICT (date) DO NOTHING;

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE calls IS 'Stores all call records from Bland.AI with full details';
COMMENT ON TABLE call_analytics IS 'AI-powered analysis of calls including sentiment and lead quality';
COMMENT ON TABLE agent_performance IS 'Performance metrics for each AI agent';
COMMENT ON TABLE billing_usage IS 'Usage tracking for billing purposes';
COMMENT ON TABLE daily_metrics IS 'Aggregated daily metrics for dashboard and analytics';
