-- Autonomous Agent System Tables
-- Memory, Knowledge, and Learning capabilities

-- Enable vector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Agent Memory Table (stores all interactions)
CREATE TABLE IF NOT EXISTS agent_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  feedback VARCHAR(20) DEFAULT 'neutral' CHECK (feedback IN ('positive', 'negative', 'neutral')),
  feedback_details TEXT,
  embedding vector(1536), -- OpenAI embedding dimension
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent Knowledge Base (learned information)
CREATE TABLE IF NOT EXISTS agent_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  confidence DECIMAL(3,2) DEFAULT 0.50 CHECK (confidence >= 0 AND confidence <= 1),
  sources TEXT[] DEFAULT '{}',
  embedding vector(1536),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent Learnings (mistakes and improvements)
CREATE TABLE IF NOT EXISTS agent_learnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('mistake', 'improvement', 'pattern')),
  input TEXT NOT NULL,
  output TEXT,
  analysis TEXT NOT NULL,
  applied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent Performance Metrics
CREATE TABLE IF NOT EXISTS agent_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_interactions INTEGER DEFAULT 0,
  positive_feedback INTEGER DEFAULT 0,
  negative_feedback INTEGER DEFAULT 0,
  neutral_feedback INTEGER DEFAULT 0,
  average_confidence DECIMAL(3,2) DEFAULT 0.50,
  success_rate DECIMAL(3,2) DEFAULT 0.50,
  improvement_rate DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(agent_id, metric_date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_id ON agent_memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_memory_conversation_id ON agent_memory(conversation_id);
CREATE INDEX IF NOT EXISTS idx_agent_memory_created_at ON agent_memory(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_memory_feedback ON agent_memory(feedback);

CREATE INDEX IF NOT EXISTS idx_agent_knowledge_agent_id ON agent_knowledge(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_knowledge_topic ON agent_knowledge(topic);
CREATE INDEX IF NOT EXISTS idx_agent_knowledge_confidence ON agent_knowledge(confidence DESC);

CREATE INDEX IF NOT EXISTS idx_agent_learnings_agent_id ON agent_learnings(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_learnings_type ON agent_learnings(type);
CREATE INDEX IF NOT EXISTS idx_agent_learnings_applied ON agent_learnings(applied);

CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent_id ON agent_metrics(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_date ON agent_metrics(metric_date DESC);

-- Vector similarity search indexes
CREATE INDEX IF NOT EXISTS idx_agent_memory_embedding ON agent_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_agent_knowledge_embedding ON agent_knowledge USING ivfflat (embedding vector_cosine_ops);

-- Function to match similar memories using vector search
CREATE OR REPLACE FUNCTION match_agent_memories(
  agent_id UUID,
  query_embedding vector(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  agent_id UUID,
  conversation_id UUID,
  input TEXT,
  output TEXT,
  feedback VARCHAR(20),
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    agent_memory.id,
    agent_memory.agent_id,
    agent_memory.conversation_id,
    agent_memory.input,
    agent_memory.output,
    agent_memory.feedback,
    agent_memory.metadata,
    1 - (agent_memory.embedding <=> query_embedding) AS similarity
  FROM agent_memory
  WHERE agent_memory.agent_id = match_agent_memories.agent_id
    AND 1 - (agent_memory.embedding <=> query_embedding) > match_threshold
  ORDER BY agent_memory.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function to match similar knowledge using vector search
CREATE OR REPLACE FUNCTION match_agent_knowledge(
  agent_id UUID,
  query_embedding vector(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  agent_id UUID,
  topic VARCHAR(255),
  content TEXT,
  confidence DECIMAL(3,2),
  sources TEXT[],
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    agent_knowledge.id,
    agent_knowledge.agent_id,
    agent_knowledge.topic,
    agent_knowledge.content,
    agent_knowledge.confidence,
    agent_knowledge.sources,
    1 - (agent_knowledge.embedding <=> query_embedding) AS similarity
  FROM agent_knowledge
  WHERE agent_knowledge.agent_id = match_agent_knowledge.agent_id
    AND 1 - (agent_knowledge.embedding <=> query_embedding) > match_threshold
  ORDER BY agent_knowledge.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function to get agent learning metrics
CREATE OR REPLACE FUNCTION get_agent_learning_metrics(agent_id UUID)
RETURNS TABLE (
  success_rate DECIMAL,
  average_confidence DECIMAL,
  total_interactions INTEGER,
  positive_feedback INTEGER,
  negative_feedback INTEGER,
  improvement_rate DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(AVG(am.success_rate), 0.5)::DECIMAL AS success_rate,
    COALESCE(AVG(am.average_confidence), 0.5)::DECIMAL AS average_confidence,
    COALESCE(SUM(am.total_interactions), 0)::INTEGER AS total_interactions,
    COALESCE(SUM(am.positive_feedback), 0)::INTEGER AS positive_feedback,
    COALESCE(SUM(am.negative_feedback), 0)::INTEGER AS negative_feedback,
    COALESCE(AVG(am.improvement_rate), 0.0)::DECIMAL AS improvement_rate
  FROM agent_metrics am
  WHERE am.agent_id = get_agent_learning_metrics.agent_id
    AND am.metric_date >= CURRENT_DATE - INTERVAL '30 days';
END;
$$;

-- Function to update agent learning metrics
CREATE OR REPLACE FUNCTION update_agent_learning_metrics(agent_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_total INTEGER;
  v_positive INTEGER;
  v_negative INTEGER;
  v_neutral INTEGER;
  v_avg_confidence DECIMAL;
  v_success_rate DECIMAL;
  v_prev_success_rate DECIMAL;
  v_improvement_rate DECIMAL;
BEGIN
  -- Get today's stats
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE feedback = 'positive'),
    COUNT(*) FILTER (WHERE feedback = 'negative'),
    COUNT(*) FILTER (WHERE feedback = 'neutral'),
    AVG((metadata->>'confidence')::DECIMAL)
  INTO v_total, v_positive, v_negative, v_neutral, v_avg_confidence
  FROM agent_memory
  WHERE agent_memory.agent_id = update_agent_learning_metrics.agent_id
    AND DATE(created_at) = CURRENT_DATE;

  -- Calculate success rate
  IF v_total > 0 THEN
    v_success_rate := v_positive::DECIMAL / v_total;
  ELSE
    v_success_rate := 0.5;
  END IF;

  -- Get previous day's success rate
  SELECT success_rate INTO v_prev_success_rate
  FROM agent_metrics
  WHERE agent_metrics.agent_id = update_agent_learning_metrics.agent_id
    AND metric_date = CURRENT_DATE - INTERVAL '1 day';

  -- Calculate improvement rate
  IF v_prev_success_rate IS NOT NULL THEN
    v_improvement_rate := v_success_rate - v_prev_success_rate;
  ELSE
    v_improvement_rate := 0.0;
  END IF;

  -- Upsert metrics
  INSERT INTO agent_metrics (
    agent_id,
    metric_date,
    total_interactions,
    positive_feedback,
    negative_feedback,
    neutral_feedback,
    average_confidence,
    success_rate,
    improvement_rate,
    updated_at
  )
  VALUES (
    update_agent_learning_metrics.agent_id,
    CURRENT_DATE,
    v_total,
    v_positive,
    v_negative,
    v_neutral,
    COALESCE(v_avg_confidence, 0.5),
    v_success_rate,
    v_improvement_rate,
    NOW()
  )
  ON CONFLICT (agent_id, metric_date)
  DO UPDATE SET
    total_interactions = EXCLUDED.total_interactions,
    positive_feedback = EXCLUDED.positive_feedback,
    negative_feedback = EXCLUDED.negative_feedback,
    neutral_feedback = EXCLUDED.neutral_feedback,
    average_confidence = EXCLUDED.average_confidence,
    success_rate = EXCLUDED.success_rate,
    improvement_rate = EXCLUDED.improvement_rate,
    updated_at = NOW();
END;
$$;

-- Trigger to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agent_memory_updated_at
  BEFORE UPDATE ON agent_memory
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_metrics_updated_at
  BEFORE UPDATE ON agent_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON agent_memory TO authenticated;
GRANT ALL ON agent_knowledge TO authenticated;
GRANT ALL ON agent_learnings TO authenticated;
GRANT ALL ON agent_metrics TO authenticated;
