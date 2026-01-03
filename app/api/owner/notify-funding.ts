import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifySovereignOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const session = verifySovereignOwner(req.headers.authorization);
    const { closingId, amount } = req.body;

    // 1. Actualizar estado en la DB
    const { error } = await supabase
      .from('closings')
      .update({ status: 'FUNDED' })
      .eq('id', closingId);

    if (error) throw error;

    // 2. Simulación de notificación Sovereign
    // Aquí conectarías con tu proveedor de SMS (Twilio/Plivo)
    console.log(`[SMS ALERTA]: ¡Depósito confirmado! +$${amount} de comisión de cesión.`);

    return res.status(200).json({ 
      success: true, 
      message: `Cierre marcado como FUNDED. Notificación enviada a ${session.email}` 
    });

  } catch (error: any) {
    return res.status(403).json({ error: error.message });
  }
}
