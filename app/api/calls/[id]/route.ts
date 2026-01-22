// app/api/calls/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSupabaseServer } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/calls/[id] - Get call details
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = requireSupabaseServer();
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Missing call id" }, { status: 400 });
    }

    // Adjust table/columns if your schema differs
    const { data, error } = await supabase
      .from("calls")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Call not found" },
        { status: error?.code === "PGRST116" ? 404 : 500 }
      );
    }

    return NextResponse.json({ success: true, call: data });
  } catch (error: any) {
    console.error("❌ Get call error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
