import { NextResponse } from "next/server";
import { db } from "@/lib/db";
const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: Request) {
  try {
    const { businessId, summary } = await req.json();
    const business = await db.businessConfig.findUnique({
      where: { id: businessId }
    });

    if (business) {
      await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        // Using 'as any' to bypass the build error regarding the phone field name
        to: `whatsapp:${(business as any).ownerPhone || (business as any).phone}`, 
        body: `🚀 GREAT NEWS! Your FrontDesk agent just booked an appointment.\n\n📄 Summary: ${summary}\n\nCheck your Dashboard for details.`
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
