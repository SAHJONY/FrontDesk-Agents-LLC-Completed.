import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Provision a phone number to a location and persist it in Supabase.
 * Expected JSON body:
 * {
 *   "locationId": "uuid-or-id",
 *   "purchasedNumber": "+1XXXXXXXXXX"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { locationId, purchasedNumber } = body ?? {};

    if (!locationId || !purchasedNumber) {
      return NextResponse.json(
        { success: false, error: "Missing locationId or purchasedNumber" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required)",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // 2. Update the location in Supabase with the new phone number
    // FIX: do not destructure `data` if you don't use it (prevents noUnusedLocals failure)
    const { error } = await supabase
      .from("locations")
      .update({
        phone_number: purchasedNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", locationId);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || "Failed to update location" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      locationId,
      purchasedNumber,
      message: "Location provisioned successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || "Provision failed" },
      { status: 500 }
    );
  }
}
