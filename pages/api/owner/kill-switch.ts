import { NextApiRequest, NextApiResponse } from 'next';
import { sendOwnerNotification } from '@/lib/mail-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const VERCEL_TOKEN = process.env.VERCEL_AUTH_TOKEN;

  try {
    // 1. Notificar inmediatamente al Owner con la IP del atacante o del originador
    await sendOwnerNotification(
      '🚨 PROTOCOLO KILL-SWITCH ACTIVADO',
      'Se ha iniciado el protocolo de emergencia. La plataforma está entrando en modo de bloqueo total.',
      req
    );

    // 2. Activar Modo Mantenimiento en Vercel (Pause Project)
    // Esto detiene todas las funciones y el acceso al frontend
    const response = await fetch(`https://api.vercel.com/v1/projects/${VERCEL_PROJECT_ID}/pause`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }
    });

    if (!response.ok) throw new Error('Fallo al pausar el proyecto en Vercel');

    return res.status(200).json({ success: true, message: 'Platform Paused' });
  } catch (error) {
    return res.status(500).json({ error: 'Fallo en la ejecución del protocolo' });
  }
}
