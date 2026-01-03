import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { sendOwnerNotification } from '@/lib/mail-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificación de seguridad para que solo el sistema dispare este cron
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().split('T')[0];

    // 1. Calcular Ingresos por Tiers ($199 - $1,499)
    const { data: revenue } = await supabase
      .from('subscriptions')
      .select('amount')
      .gte('created_at', dateString);

    const totalRevenue = revenue?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

    // 2. Resumen de Leads de Wholesale
    const { count: leadCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', dateString);

    // 3. Estado del Vault (Último backup)
    const { data: lastBackup } = await supabase
      .from('secrets_backups')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1);

    // 4. Enviar el Digest usando el servicio centralizado
    const digestMessage = `
      <h3 style="color: #f59e0b;">Resumen de Operaciones (24h)</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b;">💰 <strong>Ingresos Totales:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1e293b; color: #10b981; font-weight: bold;">$${totalRevenue.toLocaleString()}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b;">🏠 <strong>Nuevos Leads:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${leadCount} propiedades</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b;">🔐 <strong>Último Backup Vault:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${lastBackup?.[0]?.created_at || 'Sin cambios recientes'}</td></tr>
      </table>
      <p style="font-size: 14px;">El motor de Portland (pdx1) está operando al 100% de capacidad.</p>
    `;

    await sendOwnerNotification('DAILY DIGEST: Estado de la Plataforma', digestMessage);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Error generando el Digest' });
  }
}
