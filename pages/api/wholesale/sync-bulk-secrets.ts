import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { secrets } = req.body;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const VERCEL_TOKEN = process.env.VERCEL_AUTH_TOKEN;

  try {
    // 1. BACKUP ESTRATÉGICO
    // Guardamos una captura de lo que se va a enviar para poder revertir si falla
    await supabase.from('secrets_backups').insert({
      backup_data: secrets,
      owner_email: 'frontdeskllc@outlook.com' // Tu correo de Owner Sovereign
    });

    // 2. SINCRONIZACIÓN CON VERCEL
    const promises = secrets.map((s: any) => 
      fetch(`https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/env`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: s.key,
          value: s.value,
          type: 'secret',
          target: ['production', 'preview'],
        }),
      })
    );

    await Promise.all(promises);
    return res.status(200).json({ success: true, backup: 'Guardado con éxito' });
  } catch (error) {
    return res.status(500).json({ error: 'Fallo en backup o sincronización' });
  }
}
