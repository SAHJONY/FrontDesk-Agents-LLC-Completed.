import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

  try {
    // 1. Validar que eres el Dueño (Sovereign)
    const session = verifySovereignOwner(req.headers.authorization);

    // 2. Consultar leads activos para tu cuenta
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .eq('tenant_id', session.tenant_id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      leads: leads || []
    });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
