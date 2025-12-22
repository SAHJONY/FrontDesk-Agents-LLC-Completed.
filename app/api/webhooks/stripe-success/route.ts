import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendWelcomePackage } from '@/utils/email'; // Ensure this utility is exported

export async function POST(req: Request) {
  try {
    const event = await req.json();
    
    // Initialize Supabase Client
    const supabase = await createClient();

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const clientId = session.client_reference_id;

      if (!clientId) {
        console.error('No client_reference_id found in Stripe session');
        return NextResponse.json({ error: 'Missing client reference' }, { status: 400 });
      }

      // 1. Update client status in Database
      const { error: dbError } = await supabase
        .from('clients')
        .update({ 
          status: 'active', 
          stripe_customer_id: session.customer 
        })
        .eq('id', clientId);

      if (dbError) throw dbError;

      // 2. Trigger Welcome Sequence
      await sendWelcomePackage(session.customer_details.email, clientId);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Stripe Webhook Error:', error.message);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}
