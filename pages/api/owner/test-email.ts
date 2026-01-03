import { NextApiRequest, NextApiResponse } from 'next';
import { sendOwnerNotification } from '@/lib/mail-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await sendOwnerNotification(
      '✅ PRUEBA DE CONECTIVIDAD EXITOSA',
      'Tu infraestructura en Portland (pdx1) está vinculada correctamente con SendGrid. Los reportes financieros ahora son operativos.',
      req
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar el correo de prueba' });
  }
}
