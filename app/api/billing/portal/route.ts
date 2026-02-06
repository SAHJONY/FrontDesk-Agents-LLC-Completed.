import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

/**
 * STRATEGIC BILLING PORTAL GATEWAY
 * Generates an authenticated session for enterprise subscription management.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Initialize Supabase Client (Auth Context)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Authorization Required" }, { status: 401 });
    }

    // 2. Resolve Tenant Customer Metadata
    const { data: tenant } = await supabase
      .from("tenants")
      .select("stripe_customer_id")
      .eq("owner_id", user.id)
      .single();

    if (!tenant?.stripe_customer_id) {
      return NextResponse.json({ error: "No Active Subscription Detected" }, { status: 404 });
    }

    // 3. Initialize Stripe Portal Session
    // The return_url directs the user back to the Control Node after management
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: tenant.stripe_customer_id,
      return_url: `${new URL(req.url).origin}/dashboard/settings`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err: any) {
    console.error("❌ [BILLING] Portal Session Generation Failed:", err.message);
    return NextResponse.json({ error: "Internal Infrastructure Error" }, { status: 500 });
  }
}
