import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as z from "zod";
import { sendLeadNotification } from "@/lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  company: z.string().min(2),
  trade: z.string().min(2),
  serviceArea: z.string().min(2),
  monthlyCalls: z.string().optional(),
  source: z.string().optional(),
  utm: z.record(z.string()).optional(),
});

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const data = schema.parse(body);

    const supabase = getServiceSupabase();
    if (!supabase) return NextResponse.json({ error: "Missing server config" }, { status: 500 });

    const now = new Date().toISOString();

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        full_name: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        company: data.company,
        trade: data.trade,
        service_area: data.serviceArea,
        monthly_calls: data.monthlyCalls || null,
        source: data.source || "demo",
        utm: data.utm || null, // JSON column recommended
        status: "NEW",
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await sendLeadNotification({
      leadId: lead?.id,
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      source: data.source || "demo",
      notes: `${data.trade} | ${data.company} | ${data.serviceArea} | monthlyCalls=${data.monthlyCalls || ""}`,
    });

    return NextResponse.json({ success: true, leadId: lead?.id });
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: e?.message || "Internal error" }, { status: 500 });
  }
}
