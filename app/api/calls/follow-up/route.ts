import { NextResponse } from 'next/server';
import { sendFollowUpSMS } from '@/lib/sms';

export async function POST(req: Request) {
  const { phoneNumber, customerName, intent } = await req.json();

  const message = `Hi ${customerName || 'there'}! I saw you just spoke with our AI about ${intent}. Would you like to finalize that booking now? Here is our link: [YOUR_LINK]`;

  const success = await sendFollowUpSMS(phoneNumber, message);

  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}
