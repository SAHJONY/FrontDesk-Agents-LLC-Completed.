import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Security check: Only internal calls allowed
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, nodeId, dashboardUrl } = await req.json();

    if (!email || !nodeId) {
      return NextResponse.json({ error: 'Missing lead data' }, { status: 400 });
    }

    // Deliver the Sovereign Welcome Package
    const data = await resend.emails.send({
      from: 'FrontDesk Agents <team@frontdeskagents.com>',
      to: [email],
      subject: '🛡️ Welcome to the Future: Your Sovereign Node is Provisioned',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #1a1a1a;">Welcome to FrontDesk Agents</h2>
          <p>Your business now has a <strong>Sovereign Workforce</strong> that never sleeps and never breaks character.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #000; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your Mission Control:</strong></p>
            <a href="${dashboardUrl}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 5px;">
              Access Your Dashboard
            </a>
          </div>

          <h3>Next Steps to Go Live:</h3>
          <ol>
            <li><strong>Login:</strong> Use this email to access your dashboard.</li>
            <li><strong>Human Sync:</strong> Upload your pricing, services, and FAQs.</li>
            <li><strong>Test:</strong> Call your private testing line to hear your agent.</li>
          </ol>

          <p>We have attached the <strong>Sovereign Training Guide</strong> to this email (see attachment) to help you build an elite human persona.</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 40px;">
            Node ID: ${nodeId} | Security Status: 🟢 Aegis Shield Active
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'Sovereign_Training_Manual.pdf',
          path: 'https://cdn.frontdeskagents.com/Sovereign_Training_Manual.pdf',
        },
      ],
    });

    return NextResponse.json({ success: true, emailId: data.id });
  } catch (error: any) {
    console.error('❌ Notification Delivery Error:', error.message);
    return NextResponse.json({ error: 'Failed to deliver welcome package' }, { status: 500 });
  }
}
