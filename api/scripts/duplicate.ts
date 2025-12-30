import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyJWT } from '@/lib/auth/jwt-verify';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = verifyJWT(token!);
    const { script_id, target_tenant_id } = req.body;

    // Fetch original script
    const { data: original, error: fetchError } = await supabase
      .from('conversion_scripts')
      .select('*')
      .eq('id', script_id)
      .single();

    if (fetchError || !original) throw new Error('Original script not found');

    // Remove ID and timestamps to create a fresh copy
    const { id, created_at, updated_at, ...scriptData } = original;

    // Create the duplicate for the target node (e.g., Mexico)
    const { data: duplicate, error: insertError } = await supabase
      .from('conversion_scripts')
      .insert([{ 
        ...scriptData, 
        name: `${original.name} (Copy)`,
        tenant_id: target_tenant_id || original.tenant_id 
      }])
      .select();

    if (insertError) throw insertError;
    return res.status(201).json({ duplicate: duplicate[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
