import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from 'resend';

// Tell Next.js to skip static generation for this route
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // Use a standard header check (or x-cron-secret per your template)
  const secret = req.headers.get("x-cron-secret") || req.headers.get("authorization")?.replace("Bearer ", "");
  
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Initialize Supabase Admin
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Fetch some actual data for the digest
    // Example: Count total calls in the last 24 hours
    const { count, error: dbError } = await supabase
      .from('calls') 
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (dbError) throw dbError;

    // 3. Send the email via Resend
    const { data, error: mailError } = await resend.emails.send({
      from: 'FrontDesk AI <alerts@yourverifieddomain.com>',
      to: [process.env.OWNER_EMAIL || 'admin@yourdomain.com'],
      subject: `Daily Digest - ${new Date().toLocaleDateString()}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1>Daily Performance Report</h1>
          <p>Here is your 24-hour snapshot:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Total Calls Handled:</strong> ${count || 0}</li>
            <li><strong>System Status:</strong> Operational</li>
            <li><strong>Report Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <hr />
          <p><small>Automated report by FrontDesk Agents LLC</small></p>
        </div>
      `,
    });

    if (mailError) {
      console.error("Resend Error:", mailError);
      return NextResponse.json({ error: mailError }, { status: 500 });
    }

    return NextResponse.json({ ok: true, emailId: data?.id, callsHandled: count });

  } catch (err: any) {
    console.error("Digest runtime crash:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
