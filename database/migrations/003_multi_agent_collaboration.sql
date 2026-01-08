-- Multi-Agent Collaboration Tables
-- Support for multi-agent orchestration and collaboration

-- Collaboration Sessions
CREATE TABLE IF NOT EXISTS collaboration_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal TEXT NOT NULL,
  participants UUID[] NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  shared_context JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaboration Tasks
CREATE TABLE IF NOT EXISTS collaboration_tasks (
  id VARCHAR(50) PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES collaboration_sessions(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  assigned_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  dependencies TEXT[] DEFAULT '{}',
  result JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent Capabilities (for task assignment)
CREATE TABLE IF NOT EXISTS agent_capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  capability VARCHAR(100) NOT NULL,
  proficiency_level DECIMAL(3,2) DEFAULT 0.50 CHECK (proficiency_level >= 0 AND proficiency_level <= 1),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(agent_id, capability)
);

-- Knowledge Sharing Log
CREATE TABLE IF NOT EXISTS knowledge_sharing_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  target_agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  knowledge_id UUID NOT NULL REFERENCES agent_knowledge(id) ON DELETE CASCADE,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  effectiveness_score DECIMAL(3,2),
  feedback TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_status ON collaboration_sessions(status);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_created_at ON collaboration_sessions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_collaboration_tasks_session_id ON collaboration_tasks(session_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_tasks_status ON collaboration_tasks(status);
CREATE INDEX IF NOT EXISTS idx_collaboration_tasks_assigned_agent ON collaboration_tasks(assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_tasks_priority ON collaboration_tasks(priority DESC);

CREATE INDEX IF NOT EXISTS idx_agent_capabilities_agent_id ON agent_capabilities(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_capabilities_capability ON agent_capabilities(capability);
CREATE INDEX IF NOT EXISTS idx_agent_capabilities_proficiency ON agent_capabilities(proficiency_level DESC);

CREATE INDEX IF NOT EXISTS idx_knowledge_sharing_source ON knowledge_sharing_log(source_agent_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_sharing_target ON knowledge_sharing_log(target_agent_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_sharing_date ON knowledge_sharing_log(shared_at DESC);

-- Function to get agent collaboration stats
CREATE OR REPLACE FUNCTION get_agent_collaboration_stats(agent_id UUID)
RETURNS TABLE (
  total_sessions INTEGER,
  completed_sessions INTEGER,
  total_tasks INTEGER,
  completed_tasks INTEGER,
  success_rate DECIMAL,
  knowledge_shared INTEGER,
  knowledge_received INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT cs.id)::INTEGER AS total_sessions,
    COUNT(DISTINCT cs.id) FILTER (WHERE cs.status = 'completed')::INTEGER AS completed_sessions,
    COUNT(ct.id)::INTEGER AS total_tasks,
    COUNT(ct.id) FILTER (WHERE ct.status = 'completed')::INTEGER AS completed_tasks,
    CASE 
      WHEN COUNT(ct.id) > 0 THEN 
        (COUNT(ct.id) FILTER (WHERE ct.status = 'completed')::DECIMAL / COUNT(ct.id))
      ELSE 0.0
    END AS success_rate,
    (SELECT COUNT(*) FROM knowledge_sharing_log WHERE source_agent_id = get_agent_collaboration_stats.agent_id)::INTEGER AS knowledge_shared,
    (SELECT COUNT(*) FROM knowledge_sharing_log WHERE target_agent_id = get_agent_collaboration_stats.agent_id)::INTEGER AS knowledge_received
  FROM collaboration_sessions cs
  LEFT JOIN collaboration_tasks ct ON ct.session_id = cs.id AND ct.assigned_agent_id = get_agent_collaboration_stats.agent_id
  WHERE get_agent_collaboration_stats.agent_id = ANY(cs.participants);
END;
$$;

-- Trigger to auto-update timestamps
CREATE TRIGGER update_collaboration_sessions_updated_at
  BEFORE UPDATE ON collaboration_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collaboration_tasks_updated_at
  BEFORE UPDATE ON collaboration_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_capabilities_updated_at
  BEFORE UPDATE ON agent_capabilities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON collaboration_sessions TO authenticated;
GRANT ALL ON collaboration_tasks TO authenticated;
GRANT ALL ON agent_capabilities TO authenticated;
GRANT ALL ON knowledge_sharing_log TO authenticated;
