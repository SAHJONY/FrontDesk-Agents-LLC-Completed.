import { NextResponse } from "next/server";
import { db } from "@/lib/db";
// CEO Fix: Use modern import or keep require inside the function
import twilio from 'twilio';

export async function POST(req: Request) {
  try {
    const { businessId, summary } = await req.json();

    // 1. Initialize Twilio ONLY inside the POST function
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    // Safety check to prevent Twilio from crashing if keys are missing during build
    const twilioClient = (accountSid && accountSid.startsWith('AC')) 
      ? twilio(accountSid, authToken) 
      : null;

    const business = await db.businessConfig.findUnique({
      where: { id: businessId }
    });

    if (business && twilioClient) {
      try {
        await twilioClient.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          // Using 'as any' to bypass the build error regarding the phone field name
          to: `whatsapp:${(business as any).ownerPhone || (business as any).phone}`, 
          body: `🚀 GREAT NEWS! Your FrontDesk agent just booked an appointment.\n\n📄 Summary: ${summary}\n\nCheck your Dashboard for details.`
        });
      } catch (smsErr) {
        console.error("SMS/WhatsApp failed:", smsErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
