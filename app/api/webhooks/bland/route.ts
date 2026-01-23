// app/api/webhooks/bland/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

import { supabaseAdmin } from "@/lib/supabase-admin";
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
});

export async function POST(req: NextRequest) {
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
  } = body;

  // If Bland marks it not completed, ignore fast.
  if (!completed) return NextResponse.json({ status: "ignored" });

  let isBooked = false;

  try {
    // 1) Fetch tenant
    const { data: tenant, error } = await supabaseAdmin
      .from("tenants")
      .select("id, owner_id, name, email, used_minutes, max_minutes, tier, whatsapp_enabled")
      .eq("id", String(tenant_id))
      .single();

    if (error || !tenant) throw new Error("Tenant not found");

    const usedMinutes = Number(tenant.used_minutes || 0);
    const maxMinutes = Math.max(1, Number(tenant.max_minutes || 1));

    // 2) Update minutes (duration is seconds)
    const callDurationMinutes = duration / 60;
    const newUsedMinutes = usedMinutes + callDurationMinutes;

    await supabaseAdmin
      .from("tenants")
      .update({
        used_minutes: newUsedMinutes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", tenant.id);

    // 3) Lead intelligence (duration > 30s => lead)
    if (duration > 30) {
      await sendLeadNotification({
        // keep these consistent with notifications.ts
        email: tenant.email,
        tenant_id: tenant.id,
        call_id: call_id ? String(call_id) : undefined,
        customer_number: customer_number || undefined,
        summary,
        duration_seconds: duration,
      });

      // Booking detection from transcript
      const t = transcript.toLowerCase();
      const successKeywords = [
        "agendado",
        "confirmado",
        "cita",
        "appointment",
        "booked",
        "listo",
        "scheduled",
      ];
      isBooked = successKeywords.some((k) => t.includes(k));

      if (isBooked && tenant.whatsapp_enabled && customer_number) {
        await sendWhatsAppConfirmation({
          to: customer_number,
          type: "APPOINTMENT_CONFIRMATION",
          tenant_name: tenant.name || "FrontDesk",
          summary: summary || "Cita confirmada",
        });

        // conversion record for ROI
        await supabaseAdmin.from("conversions").insert({
          tenant_id: tenant.id,
          call_id: call_id ? String(call_id) : null,
          type: "APPOINTMENT",
          value: 50, // default value; tune per trade
          created_at: new Date().toISOString(),
        });
      }
    }

    // 4) Capacity thresholds (80% / 95%)
    const usageRatio = newUsedMinutes / maxMinutes;

    if (usageRatio >= 0.95) {
      await sendCapacityAlert({
        email: tenant.email,
        tenant_id: tenant.id,
        tier: tenant.tier,
        threshold: 95,
        used_minutes: newUsedMinutes,
        max_minutes: maxMinutes,
      });
    } else if (usageRatio >= 0.8) {
      await sendCapacityAlert({
        email: tenant.email,
        tenant_id: tenant.id,
        tier: tenant.tier,
        threshold: 80,
        used_minutes: newUsedMinutes,
        max_minutes: maxMinutes,
      });
    }

    // 5) Redis sync (real-time enforcement/cache)
    await syncTenantStatus(String(tenant.id));

    return NextResponse.json({
      success: true,
      processed_at: new Date().toISOString(),
      conversion_detected: isBooked,
    });
  } catch (err: any) {
    console.error("Webhook processing failed:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
