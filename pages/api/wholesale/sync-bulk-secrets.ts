// pages/api/wholesale/sync-bulk-secrets.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { secrets } = req.body;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const VERCEL_TOKEN = process.env.VERCEL_AUTH_TOKEN;

  try {
    // Sincronización masiva con la API de Vercel
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
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Error en la sincronización masiva' });
  }
}
