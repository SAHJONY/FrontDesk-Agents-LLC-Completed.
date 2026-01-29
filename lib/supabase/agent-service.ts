import { createClient } from '@supabase/supabase-js';

// Centralized client for the agent-service
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface AgentDNA {
  id?: string;
  type: 'voice' | 'email' | 'sms';
  name: string;
  system_prompt: string;
  tools: string[];
  risk_threshold: number;
  status?: 'active' | 'training' | 'offline';
}

/**
 * Syncs Agent DNA to Supabase.
 * Uses an UPSERT logic to ensure we don't duplicate agent nodes.
 */
export async function syncAgentDNA(dna: AgentDNA) {
  // Ensure we are hitting the correct table 'workforce_agents' 
  // with a conflict strategy on the 'type' column.
  const { data, error } = await supabase
    .from('workforce_agents')
    .upsert(
      { 
        type: dna.type,
        name: dna.name,
        system_prompt: dna.system_prompt,
        tools: dna.tools, // Stored as JSONB in Postgres
        risk_threshold: dna.risk_threshold,
        updated_at: new Date().toISOString() 
      }, 
      { onConflict: 'type' } 
    )
    .select()
    .single();

  if (error) {
    console.error('🔴 DNA Sync Error:', error.message);
    throw error;
  }

  return data;
}
