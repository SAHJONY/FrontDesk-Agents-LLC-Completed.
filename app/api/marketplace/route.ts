/**
 * AI Marketplace API
 * Status: Verified Global Hub - Tier: Elite
 * Fix: Corrected Supabase query chains to prevent 'order is not a function' TypeError.
 * Fix: Prevent build-time failures by avoiding top-level Supabase init + env assertions.
 * Security: Service Role stays server-only; never use NEXT_PUBLIC for service keys.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Force dynamic runtime to prevent build-time key errors
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Json = Record<string, any>;

function getSupabaseEnv() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";

  // Service Role for server-side operations (NEVER expose to client)
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    "";

  return { supabaseUrl, serviceRoleKey };
}

function getSupabaseServerClient() {
  const { supabaseUrl, serviceRoleKey } = getSupabaseEnv();
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

// Avoid ReferenceError if aiMarketplace isn't defined/imported
async function maybeInitMarketplace() {
  try {
    const anyGlobal = globalThis as any;
    const aiMarketplace = anyGlobal?.aiMarketplace;

    if (aiMarketplace && typeof aiMarketplace.init === "function") {
      await aiMarketplace.init();
    }
  } catch {
    // Hard-silent: marketplace init must never break requests/builds
  }
}

function ok(data: Json, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

function fail(message: string, status = 500, extra: Json = {}) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      workforce_status: "16 agents stand-by",
      ...extra,
    },
    { status }
  );
}

export async function GET(request: NextRequest) {
  try {
    await maybeInitMarketplace();

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return fail(
        "Supabase server credentials missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        500,
        { status: "degraded" }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = (searchParams.get("action") || "all").toLowerCase();

    // Default: Fetch all items
    if (action === "all") {
      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return ok({ data });
    }

    // Search Logic
    if (action === "search") {
      const query = (searchParams.get("query") || "").trim();

      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .ilike("name", `%${query}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return ok({ data });
    }

    // Featured Items
    if (action === "featured") {
      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return ok({ data });
    }

    // Popular Items
    if (action === "popular") {
      const rawLimit = searchParams.get("limit");
      const limit = rawLimit ? Number.parseInt(rawLimit, 10) : 10;
      const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 10;

      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .order("install_count", { ascending: false })
        .limit(safeLimit);

      if (error) throw error;
      return ok({ data });
    }

    // Specific Item Detail
    if (action === "item") {
      const itemId = searchParams.get("itemId");
      if (!itemId) return fail("Missing itemId", 400);

      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .eq("id", itemId)
        .single();

      if (error) throw error;
      return ok({ data });
    }

    return fail("Invalid action", 400);
  } catch (error: any) {
    // Do not leak internals; keep message but avoid dumping sensitive stack
    const msg = typeof error?.message === "string" ? error.message : "Unknown error";
    console.error("Marketplace API Error:", msg);
    return fail(msg, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await maybeInitMarketplace();

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return fail(
        "Supabase server credentials missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        500,
        { status: "degraded" }
      );
    }

    const body = (await request.json()) as {
      action?: string;
      customerId?: string;
      itemId?: string;
      item?: Record<string, any>;
    };

    const action = (body.action || "").toLowerCase();
    const { customerId, itemId, item } = body;

    if (action === "install") {
      if (!customerId || !itemId) return fail("Missing customerId or itemId", 400);

      const { error } = await supabase
        .from("installed_items")
        .insert([{ customer_id: customerId, item_id: itemId }]);

      if (error) throw error;
      return ok({});
    }

    if (action === "publish") {
      if (!customerId || !item) return fail("Missing customerId or item", 400);

      const { data, error } = await supabase
        .from("marketplace_items")
        .insert([{ ...item, publisher_id: customerId }])
        .select()
        .single();

      if (error) throw error;
      return ok({ data });
    }

    return fail("Invalid action", 400);
  } catch (error: any) {
    const msg = typeof error?.message === "string" ? error.message : "Unknown error";
    return fail(msg, 500);
  }
}
