import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(email: string, callData: any) {
  try {
    await resend.emails.send({
      from: 'AI FrontDesk <alerts@yourdomain.com>',
      to: email,
      subject: `🔥 New Lead Captured: ${callData.customer_number}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #10b981;">New Lead Identified</h2>
          <p>Your AI Agent just finished a call with a high-intent customer.</p>
          <hr />
          <p><strong>Customer:</strong> ${callData.customer_number}</p>
          <p><strong>AI Summary:</strong> ${callData.summary}</p>
          <p><strong>Duration:</strong> ${callData.duration} seconds</p>
          <hr />
          <a href="https://your-app.com/dashboard/calls/${callData.call_id}" 
             style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
             View Full Transcript
          </a>
        </div>
      `
    });
  } catch (error) {
    console.error("Email failed", error);
  }
}
