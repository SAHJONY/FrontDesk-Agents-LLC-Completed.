import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { record } = await req.json(); // Data sent from Supabase
    
    // The "Infrastructure" Email Logic
    await resend.emails.send({
      from: 'FrontDesk Agents <onboarding@yourdomain.com>',
      to: [record.email], // Automatically gets the new client's email
      subject: 'Your AI Front Desk is now LIVE – FrontDesk Agents LLC',
      html: `
        <h1>Welcome to the future of your front office, ${record.full_name}.</h1>
        <p>We have successfully deployed your dedicated <strong>AI Infrastructure</strong>.</p>
        <h3>What to expect next:</h3>
        <ul>
          <li><strong>Active Answering:</strong> Your AI Agent is now live.</li>
          <li><strong>Daily Intelligence:</strong> Reports arrive every morning at 8:00 AM.</li>
          <li><strong>Security First:</strong> Your data is hosted on our secure edge network.</li>
        </ul>
        <p>Best regards,<br><strong>Your Name</strong><br>CEO, FrontDesk Agents LLC</p>
      `
    });

    return NextResponse.json({ message: 'Onboarding email sent' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
