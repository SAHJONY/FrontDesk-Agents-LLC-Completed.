import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';
import { InvitationEmail } from '@/emails/InvitationEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { clientName, clientEmail } = await req.json();
    
    // FIX: Added 'await' to resolve the Promise before calling .from()
    const supabase = await createClient();

    // 1. Generate a unique access key
    const { data, error } = await supabase
      .from('client_invitations')
      .insert({ client_name: clientName })
      .select()
      .single();

    if (error) {
      console.error('Database Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/portal?key=${data.access_key}`;

    // 2. Send the Whitelabel Email
    await resend.emails.send({
      from: 'FrontDesk Agents <ops@youragency.com>',
      to: clientEmail,
      subject: 'Uplink Established: Access Your Intelligence Portal',
      react: InvitationEmail({ clientName, magicLink }),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Invite Route Error:', err.message);
    return NextResponse.json({ error: 'Process failed' }, { status: 500 });
  }
}
