// pages/api/wholesale/sync-bulk-secrets.ts
import { sendSecurityAlert } from '@/lib/mail-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ... (Lógica de backup y Vercel anterior)

  try {
    // Después del éxito en Vercel, enviamos la alerta
    const keysChanged = secrets.map((s: any) => s.key).join(', ');
    await sendSecurityAlert(`Claves modificadas: ${keysChanged} desde el Dashboard de Portland (pdx1).`);

    return res.status(200).json({ success: true, alert: 'Enviada' });
  } catch (error) {
    return res.status(500).json({ error: 'Sincronizado, pero falló la notificación' });
  }
}
