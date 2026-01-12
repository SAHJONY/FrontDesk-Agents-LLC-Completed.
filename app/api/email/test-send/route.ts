import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail/emailService';

/**
 * POST /api/email/test-send
 * 
 * This endpoint allows users to send a test email to verify the email service is working.
 * It accepts an optional recipient email address and sends a sample email from the Sales Team.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientEmail = 'frontdeskllc@outlook.com', department = 'sales' } = body;

    console.log(`[EMAIL TEST] Sending test email to: ${recipientEmail} from department: ${department}`);

    // Send the test email
    const result = await sendEmail({
      to: recipientEmail,
      subject: `Live Test Email from FrontDesk Agents LLC - ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to FrontDesk Agents LLC</h2>
          <p>This is a <strong>live test email</strong> to verify your email service integration is working correctly.</p>
          <p><strong>Email Details:</strong></p>
          <ul>
            <li>Sent from: <code>${department}@frontdeskagents.com</code></li>
            <li>Timestamp: ${new Date().toISOString()}</li>
            <li>Service: Resend (High-Volume Automated Emails)</li>
          </ul>
          <p>If you received this email, your email system is fully operational and ready for production!</p>
          <hr />
          <p style="color: #666; font-size: 12px;">
            This is an automated test email. Please do not reply to this message.
          </p>
        </div>
      `,
      text: `Live Test Email from FrontDesk Agents LLC\n\nThis is a test email to verify your email service integration.\n\nIf you received this email, your system is working correctly!`,
      department: department as any,
    });

    if (result.success) {
      console.log(`[EMAIL TEST] Test email sent successfully. Message ID: ${result.messageId}`);
      return NextResponse.json(
        {
          success: true,
          message: `Test email sent successfully to ${recipientEmail}`,
          messageId: result.messageId,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } else {
      console.error(`[EMAIL TEST] Failed to send test email: ${result.error}`);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to send test email: ${result.error}`,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[EMAIL TEST] Exception occurred:', error);
    return NextResponse.json(
      {
        success: false,
        message: `Exception occurred while sending test email: ${error.message}`,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/test-send
 * 
 * Returns information about the email test endpoint.
 */
export async function GET() {
  return NextResponse.json(
    {
      endpoint: '/api/email/test-send',
      method: 'POST',
      description: 'Send a test email to verify the email service is working',
      requestBody: {
        recipientEmail: 'string (optional, defaults to frontdeskllc@outlook.com)',
        department: 'string (optional, defaults to sales)',
      },
      responseBody: {
        success: 'boolean',
        message: 'string',
        messageId: 'string (if successful)',
        error: 'string (if failed)',
        timestamp: 'ISO 8601 timestamp',
      },
      example: {
        curl: `curl -X POST https://frontdesk-rebuild.vercel.app/api/email/test-send \\
  -H "Content-Type: application/json" \\
  -d '{"recipientEmail":"your-email@example.com","department":"sales"}'`,
      },
    },
    { status: 200 }
  );
}
