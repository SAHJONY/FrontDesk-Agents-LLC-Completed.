export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const clientId = session.client_reference_id;

    // 1. Actualizar estado del cliente a 'Activo'
    await supabase
      .from('clients')
      .update({ status: 'active', stripe_customer_id: session.customer })
      .eq('id', clientId);

    // 2. Disparar Secuencia de Bienvenida via Resend/SendGrid
    await sendWelcomePackage(session.customer_details.email, clientId);
  }

  return NextResponse.json({ received: true });
}
