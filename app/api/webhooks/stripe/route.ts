import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY; // Usamos la clave secreta (NUNCA NEXT_PUBLIC)
  if (!stripeKey) return null;
  return new Stripe(stripeKey, { apiVersion: '2024-12-18.acacia' });
};

// IMPORTANTE: Asegúrate de que en Vercel la variable sea STRIPE_WEBHOOK_SECRET (sin NEXT_PUBLIC)
const getWebhookSecret = () => process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();

  if (!stripe || !webhookSecret) {
    console.error('❌ Configuración de Stripe incompleta');
    return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
  }

  let supabase;
  try {
    supabase = requireSupabaseServer();
  } catch (error: any) {
    console.error('❌ Error Supabase:', error.message);
    return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 });
  }
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) return NextResponse.json({ error: 'Sin firma' }, { status: 400 });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('❌ Error de firma:', err.message);
      return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
    }

    console.log(`🔔 Evento recibido: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Aquí es donde vinculamos el pago con el Tenant
        await handleInitialSubscription(session, supabase);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription, supabase);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailure(invoice, supabase);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook handler Error:', error.message);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

/**
 * Maneja la finalización exitosa del checkout
 */
async function handleInitialSubscription(session: Stripe.Checkout.Session, supabase: any) {
  const tenantId = session.metadata?.tenant_id;
  const planTier = session.metadata?.plan;

  if (!tenantId) {
    console.error('❌ Metadata tenant_id no encontrada en la sesión');
    return;
  }

  // Actualizamos la tabla principal 'tenants'
  const { error } = await supabase
    .from('tenants')
    .update({
      tier: planTier || 'Starter',
      stripe_customer_id: session.customer as string,
      subscription_status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', tenantId);

  if (error) console.error('❌ Error actualizando tenant:', error.message);
  else console.log(`✅ Tenant ${tenantId} actualizado a nivel ${planTier}`);
}

/**
 * Maneja cambios en el ciclo de vida de la suscripción (upgrade, downgrade, cancelación)
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription, supabase: any) {
  const tenantId = subscription.metadata?.tenant_id;
  
  // Mapeo de estados de Stripe a tu lógica de negocio
  const status = subscription.status === 'active' ? 'active' : 'inactive';
  const tier = subscription.metadata?.plan || 'Starter';

  const { error } = await supabase
    .from('tenants')
    .update({
      tier: tier,
      subscription_status: subscription.status,
      stripe_subscription_id: subscription.id,
    })
    .eq('id', tenantId);

  if (error) console.error('❌ Error sincronizando suscripción:', error.message);
}

/**
 * Maneja fallos de pago para suspender el servicio
 */
async function handlePaymentFailure(invoice: Stripe.Invoice, supabase: any) {
  const customerId = invoice.customer as string;
  
  const { error } = await supabase
    .from('tenants')
    .update({ subscription_status: 'past_due' })
    .eq('stripe_customer_id', customerId);

  if (error) console.error('❌ Error marcando pago fallido:', error.message);
}
