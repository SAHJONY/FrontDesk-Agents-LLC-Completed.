import { createClient } from '@supabase/supabase-js';

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
 * Updates based on the 'type' unique constraint.
 */
export async function syncAgentDNA(dna: AgentDNA) {
  const { data, error } = await supabase
    .from('workforce_agents')
    .upsert(
      { 
        ...dna, 
        updated_at: new Date().toISOString() 
      }, 
      { onConflict: 'type' } // Matches the unique 'type' column
    )
    .select()
    .single();

  if (error) {
    console.error('🔴 DNA Sync Error:', error.message);
    throw error;
  }

  return data;
}
