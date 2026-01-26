// app/api/cron/daily-digest/route.ts
import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server";
import { Resend } from 'resend';

// Initialize Resend with your verified API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  
  // Security check using your CRON_SECRET
  if (!serverEnv.CRON_SECRET || secret !== serverEnv.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Fetch your digest data here (e.g., from Supabase or Redis)
    // 2. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'FrontDesk AI <alerts@yourverifieddomain.com>',
      to: [serverEnv.OWNER_EMAIL || 'admin@yourdomain.com'], // Uses your OWNER_EMAIL env
      subject: `Daily Performance Digest - ${new Date().toLocaleDateString()}`,
      html: `
        <h1>Daily Digest Report</h1>
        <p>Your AI agents are performing as expected.</p>
        <ul>
          <li>Date: ${new Date().toLocaleTimeString()}</li>
          <li>Status: All systems operational</li>
        </ul>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Digest failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
