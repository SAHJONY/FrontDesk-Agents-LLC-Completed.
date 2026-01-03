import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { sendOwnerNotification } from '@/lib/mail-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { secrets } = req.body;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const VERCEL_TOKEN = process.env.VERCEL_AUTH_TOKEN;

  try {
    // 1. BACKUP: Guardar estado previo en Supabase
    await supabase.from('secrets_backups').insert({
      backup_data: secrets,
      owner_email: 'frontdeskllc@outlook.com'
    });

    // 2. SYNC: Actualizar Vercel mediante su API REST
    const promises = secrets.map((s: any) => 
      fetch(`https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/env`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: s.key.toUpperCase(),
          value: s.value,
          type: 'secret',
          target: ['production', 'preview', 'development'],
        }),
      })
    );

    await Promise.all(promises);

    // 3. NOTIFICACIÓN: Alerta inmediata al Owner con IP
    const keysList = secrets.map((s: any) => s.key).join(', ');
    await sendOwnerNotification(
      '⚠️ CAMBIO DE SECRETOS DETECTADO',
      `Se han actualizado las siguientes variables en la infraestructura: <strong>${keysList}</strong>. El backup ha sido guardado en la base de datos de forma segura.`,
      req
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error en Sync Process:", error);
    return res.status(500).json({ error: 'Fallo crítico en el proceso de sincronización.' });
  }
}
