import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createClient();

  // 1. Fetch Bland AI API Key from your new provider_configs table
  const { data: config } = await supabase
    .from('provider_configs')
    .select('api_key')
    .eq('provider_name', 'bland_ai')
    .single();

  if (!config?.api_key) {
    return NextResponse.json({ error: 'Bland AI API Key not found in Profile.' }, { status: 400 });
  }

  // 2. Identify leads that haven't been called yet
  const { data: leads } = await supabase
    .from('leads')
    .select('id, full_name, phone_number')
    .not('id', 'in', (
      supabase.from('call_results').select('lead_id')
    ));

  if (!leads || leads.length === 0) {
    return NextResponse.json({ message: 'No idle leads found.' });
  }

  // 3. Trigger Bland AI Batch (Simulation of the external POST request)
  // In production, you would use fetch('https://api.bland.ai/v1/calls', ...)
  const results = await Promise.all(leads.map(async (lead) => {
    // Insert initial "In Call" status into call_results to update the Dashboard UI
    return supabase.from('call_results').insert({
      lead_id: lead.id,
      status: 'In Call 📞',
      summary: 'Establishing neural uplink...'
    });
  }));

  return NextResponse.json({ 
    message: `Swarm deployed. ${leads.length} nodes active.`,
    count: leads.length 
  });
}
