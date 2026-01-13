import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = verifySovereignOwner(req.headers.authorization);

    // Consulta para obtener todas las comisiones del dueño
    const { data: closings, error } = await supabase
      .from('closings')
      .select('assignment_fee, status')
      .eq('tenant_id', session.tenant_id);

    if (error) throw error;

    const summary = closings.reduce((acc, curr) => {
      if (curr.status === 'FUNDED') acc.paid += Number(curr.assignment_fee);
      if (curr.status === 'PENDING') acc.pending += Number(curr.assignment_fee);
      return acc;
    }, { paid: 0, pending: 0 });

    return res.status(200).json({
      success: true,
      ...summary,
      total_pipeline: summary.paid + summary.pending
    });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
