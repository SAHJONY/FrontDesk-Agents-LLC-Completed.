import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy initialization
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await getResend().emails.send({
      from: 'FrontDesk Agents <noreply@resend.dev>', // Using resend.dev until domain is verified
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-top: none;
              }
              .message {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
              }
              .footer {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 0 0 10px 10px;
                text-align: center;
                font-size: 14px;
                color: #666;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: 600;
              }
              .stats {
                display: flex;
                justify-content: space-around;
                margin: 20px 0;
              }
              .stat {
                text-align: center;
              }
              .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
              }
              .stat-label {
                font-size: 12px;
                color: #666;
                text-transform: uppercase;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 FrontDesk Agents LLC</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">AI-Powered Workforce Platform</p>
            </div>
            
            <div class="content">
              <h2 style="color: #667eea; margin-top: 0;">Test Email Successful!</h2>
              
              <div class="message">
                ${message}
              </div>
              
              <div class="stats">
                <div class="stat">
                  <div class="stat-value">✅</div>
                  <div class="stat-label">Resend Active</div>
                </div>
                <div class="stat">
                  <div class="stat-value">50</div>
                  <div class="stat-label">Languages</div>
                </div>
                <div class="stat">
                  <div class="stat-value">20+</div>
                  <div class="stat-label">Features</div>
                </div>
              </div>
              
              <p>This email confirms that your Resend integration is working perfectly! Your platform can now send:</p>
              
              <ul>
                <li>✉️ Welcome emails to new customers</li>
                <li>🔐 Password reset emails</li>
                <li>🔔 Notification emails</li>
                <li>📊 Report emails with analytics</li>
                <li>🎉 Onboarding sequences</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://frontdeskagents.com" class="button">Visit Platform</a>
              </div>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #666;">
                <strong>Platform Status:</strong> 🎯 Production Ready<br>
                <strong>Email Service:</strong> Resend (via Vercel Marketplace)<br>
                <strong>Sent:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">
                <strong>FrontDesk Agents LLC</strong><br>
                AI-Powered Revenue Workforce
              </p>
              <p style="margin: 10px 0 0 0; font-size: 12px;">
                This is a test email from your production platform<br>
                <a href="https://frontdeskagents.com" style="color: #667eea;">frontdeskagents.com</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
      emailId: data.id,
      data: data,
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send email',
        details: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Test Email API Endpoint',
    status: 'active',
    method: 'POST',
    requiredFields: ['to', 'subject', 'message'],
    example: {
      to: 'user@example.com',
      subject: 'Test Email from FrontDesk Agents',
      message: 'This is a test email to verify Resend integration.',
    },
  });
}
