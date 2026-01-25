import { NextResponse } from "next/server";
import * as z from "zod";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { logCallEvent } from "@/lib/airtable"; // <--- BLENDED IN
import {
  sendLeadNotification,
  sendCapacityAlert,
  sendWhatsAppConfirmation,
} from "@/lib/notifications";
import { syncTenantStatus } from "@/lib/sovereign-sync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BlandWebhookSchema = z.object({
  call_id: z.union([z.string(), z.number()]).optional(),
  customer_number: z.string().min(3).optional(),
  duration: z.number().nonnegative().optional(), // seconds
  summary: z.string().optional(),
  completed: z.boolean().optional(),
  tenant_id: z.union([z.string(), z.number()]),
  transcript: z.string().optional(),
  outcome: z.string().optional(), // Added for data parity
});

export async function POST(req: Request) {
  const raw = await req.json().catch(() => ({}));
  const parsed = BlandWebhookSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const body = parsed.data;
  const {
    call_id,
    customer_number,
    duration = 0,
    summary = "",
    completed = false,
    tenant_id,
    transcript = "",
    outcome = "completed",
  } = body;

  if (!completed) return NextResponse.json({ status: "ignored" });

  try {
    // 1) Fetch tenant
    const { data: tenant, error } = await supabaseAdmin
      .from("tenants")
      .select(
        "id, owner_id, name, email, used_minutes, max_minutes, tier, whatsapp_enabled"
      )
      .eq("id", String(tenant_id))
      .single();

    if (error || !tenant) throw new Error("Tenant not found");

    // 2) Update minutes and Save Call to Supabase (System of Record)
    const callDurationMinutes = duration / 60;

    const { error: callError } = await supabaseAdmin.from("calls").insert({
      tenant_id: tenant.id,
      call_id: call_id ? String(call_id) : null,
      phone_number: customer_number,
      duration_seconds: duration,
      summary,
      transcript,
      outcome,
    });

    if (callError) {
      throw new Error(callError.message || "Failed to insert call");
    }

    const { error: rpcError } = await supabaseAdmin.rpc(
      "increment_tenant_minutes",
      {
        t_id: tenant.id,
        mins: callDurationMinutes,
      }
    );

    if (rpcError) {
      throw new Error(rpcError.message || "Failed to increment tenant minutes");
    }

    // 3) BLENDED: Sync to Airtable CRM
    // We wrap this in try/catch so an Airtable failure doesn't crash the whole webhook
    try {
      await logCallEvent({
        call_id: call_id ? String(call_id) : "unknown",
        phone: customer_number || "unknown",
        summary: summary || "No summary",
        outcome: outcome,
      });
    } catch (atError) {
      console.error("Airtable Sync Bypassed:", atError);
    }

    // 4) Lead intelligence & WhatsApp (Original Logic)
    if (duration > 30) {
      await sendLeadNotification({
        email: tenant.email,
        tenant_id: tenant.id,
        call_id: call_id ? String(call_id) : undefined,
        customer_number: customer_number || undefined,
        summary,
        duration_seconds: duration,
      });

      const t = transcript.toLowerCase();
      const successKeywords = ["agendado", "confirmado", "booked", "scheduled"];
      const isBooked = successKeywords.some((k) => t.includes(k));

      if (isBooked && tenant.whatsapp_enabled && customer_number) {
        await sendWhatsAppConfirmation({
          to: customer_number,
          type: "APPOINTMENT_CONFIRMATION",
          tenant_name: tenant.name || "FrontDesk",
          summary: summary || "Cita confirmada",
        });
      }
    }

    // (Optional) Capacity alerts — only if you actually use it in your product
    // If you have a defined threshold, keep it; otherwise this is safe to remove.
    if (tenant.max_minutes && tenant.used_minutes != null) {
      const projectedUsed = tenant.used_minutes + callDurationMinutes;
      const utilization = projectedUsed / tenant.max_minutes;

      if (utilization >= 0.9) {
        try {
          await sendCapacityAlert({
            email: tenant.email,
            tenant_id: tenant.id,
            used_minutes: projectedUsed,
            max_minutes: tenant.max_minutes,
            tier: tenant.tier,
          });
        } catch (capErr) {
          console.error("Capacity alert failed (non-fatal):", capErr);
        }
      }
    }

    // 5) Capacity thresholds & Redis Sync
    await syncTenantStatus(String(tenant.id));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook processing failed:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
