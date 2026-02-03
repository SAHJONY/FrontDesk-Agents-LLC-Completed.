import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const healthStatus: {
    status: "operational" | "degraded";
    timestamp: string;
    checks: {
      supabase: string;
      stripe: string;
    };
  } = {
    status: "operational",
    timestamp: new Date().toISOString(),
    checks: {
      supabase: "untested",
      stripe: "untested",
    },
  };

  /* ----------------------------
   * 1) Supabase Health Check: Validates connection to the database layer
   * ---------------------------- */
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      healthStatus.checks.supabase = "missing configuration";
    } else {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Execute a lightweight, non-destructive check against the 'tenants' table
      const { error } = await supabase
        .from("tenants")
        .select("id", { head: true, count: "exact" });

      healthStatus.checks.supabase = error
        ? `error: ${error.message}`
        : "healthy";
    }
  } catch (err: any) {
    healthStatus.checks.supabase = `failed: ${err.message}`;
  }

  /* ----------------------------
   * 2) Stripe Health Check: Validates API versioning and connectivity
   * ---------------------------- */
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      healthStatus.checks.stripe = "missing configuration";
    } else {
      const stripe = new Stripe(stripeKey, {
        // ✅ Explicitly set to match requirements of stripe@20.x
        apiVersion: "2025-12-15.clover",
      });

      await stripe.balance.retrieve();
      healthStatus.checks.stripe = "healthy";
    }
  } catch (err: any) {
    healthStatus.checks.stripe = `failed: ${err.message}`;
  }

  /* ----------------------------
   * Overall Status Evaluation
   * ---------------------------- */
  if (
    healthStatus.checks.supabase !== "healthy" ||
    healthStatus.checks.stripe !== "healthy"
  ) {
    healthStatus.status = "degraded";
  }

  return NextResponse.json(healthStatus, { status: 200 });
}
