// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as z from "zod";
import { sendLeadNotification } from "@/lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  fullName: z.string().min(2).transform((s) => s.trim()),
  email: z.string().email().transform((s) => s.trim().toLowerCase()),
  phone: z
    .string()
    .min(6)
    .transform((s) => s.trim())
    .refine((s) => s.replace(/[^\d+]/g, "").length >= 7, "Invalid phone"),
  company: z.string().min(2).transform((s) => s.trim()),
  trade: z.string().min(2).transform((s) => s.trim()),
  serviceArea: z.string().min(2).transform((s) => s.trim()),
  monthlyCalls: z.string().optional().transform((s) => s?.trim()),
  source: z.string().optional().transform((s) => s?.trim()),
  // Accept only string values, but tolerate non-string inputs by stringifying
  utm: z
    .record(z.any())
    .optional()
    .transform((obj) => {
      if (!obj) return undefined;
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(obj)) out[k] = String(v);
      return out;
    }),
});

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE; // optional legacy fallback

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const data = schema.parse(body);

    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Missing server config: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      );
    }

    // Insert with minimal assumptions; let DB defaults handle timestamps if present.
    const insertPayload: Record<string, any> = {
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      trade: data.trade,
      service_area: data.serviceArea,
      monthly_calls: data.monthlyCalls || null,
      source: data.source || "demo",
      utm: data.utm || null, // requires JSON/JSONB column in Supabase
      status: "NEW",
    };

    const { data: lead, error } = await supabase
      .from("leads")
      .insert(insertPayload)
      .select("id, full_name, email, phone, company, trade, service_area, source")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Best-effort notification (never block lead creation)
    try {
      await sendLeadNotification({
        leadId: lead?.id,
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        source: data.source || "demo",
        notes: `${data.trade} | ${data.company} | ${data.serviceArea} | monthlyCalls=${data.monthlyCalls || ""}`,
      });
    } catch (notifyErr) {
      console.error("[leads] notification failed:", notifyErr);
    }

    return NextResponse.json({ success: true, leadId: lead?.id });
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: e.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: e?.message || "Internal error" },
      { status: 500 }
    );
  }
}
