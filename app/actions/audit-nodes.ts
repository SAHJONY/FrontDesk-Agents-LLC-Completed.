'use server';
import { createServerAdminSupabase } from '@/lib/supabase/admin';

export async function getAuditData() {
  const supabase = await createServerAdminSupabase();

  // Joint query across schemas (Only possible with Admin/Service Role)
  const { data, error } = await supabase
    .from('public_registry.clients')
    .select(`
      id, business_name, location_tz, preferred_language, ui_direction, is_active,
      vault_core:sovereign_logic(logic_fingerprint)
    `)
    .order('created_at', { ascending: false });

  return data?.map(node => ({
    ...node,
    fingerprint: node.vault_core[0]?.logic_fingerprint || 'MISSING'
  }));
}
