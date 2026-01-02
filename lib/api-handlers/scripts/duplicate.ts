/**
 * FRONTDESK AGENTS — SCRIPT DUPLICATION
 * Node: pdx1 Deployment
 * Logic: Securely clones script configurations across tenants
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Missing token' });

    // Validate the token and use 'decoded' to enforce security
    const decoded = (await verifyJWT(token)) as any;
    const userId = decoded.userId;

    const { script_id, target_tenant_id } = req.body;

    // 1. Fetch original script (Ensuring it belongs to the user or is public)
    const { data: originalScript, error: fetchError } = await supabase
      .from('scripts')
      .select('*')
      .eq('id', script_id)
      .eq('user_id', userId) // Security: Use decoded data here
      .single();

    if (fetchError || !originalScript) {
      return res.status(404).json({ error: 'Original script not found or unauthorized' });
    }

    // 2. Duplicate script for the target tenant
    const { data: newScript, error: insertError } = await supabase
      .from('scripts')
      .insert([{
        ...originalScript,
        id: undefined, // Let database generate new ID
        tenant_id: target_tenant_id,
        created_at: new Date().toISOString(),
        name: `${originalScript.name} (Copy)`
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    return res.status(201).json(newScript);
  } catch (err) {
    return res.status(500).json({ error: 'Script duplication failed' });
  }
}
