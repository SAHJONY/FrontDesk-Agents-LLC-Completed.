import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function GET(req: Request) {
  // Solo permitir ejecución si viene con una Key de Cron secreta
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 1. Buscar usuarios que excedieron su límite y tienen minutos sin facturar
    const { data: overageNodes, error } = await supabaseAdmin
      .from('tenants')
      .select('id, stripe_customer_id, used_minutes, max_minutes, overage_rate, billed_overage_minutes')
      .gt('used_minutes', 'max_minutes')
      .not('stripe_customer_id', 'is', null);

    if (error) throw error;

    for (const node of overageNodes) {
      const totalOverage = Math.max(0, node.used_minutes - node.max_minutes);
      const newOverageToBill = Math.floor(totalOverage - (node.billed_overage_minutes || 0));

      if (newOverageToBill > 0) {
        // 2. Crear un cargo pendiente en la próxima factura de Stripe
        await stripe.invoiceItems.create({
          customer: node.stripe_customer_id,
          amount: Math.round(newOverageToBill * node.overage_rate * 100), // Convertir a centavos
          currency: 'usd',
          description: `Exceso de uso FrontDesk Protocol: ${newOverageToBill} minutos adicionales.`,
        });

        // 3. Actualizar registro para no volver a facturar los mismos minutos
        await supabaseAdmin
          .from('tenants')
          .update({ 
            billed_overage_minutes: (node.billed_overage_minutes || 0) + newOverageToBill 
          })
          .eq('id', node.id);
      }
    }

    return NextResponse.json({ success: true, processed: overageNodes.length });
  } catch (err: any) {
    console.error('❌ Overage Billing Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
