// app/api/api-keys/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireSupabaseServer } from "@/lib/supabase-server";

// DELETE /api/api-keys/[id] - Revoke an API key
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = requireSupabaseServer();

  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("api_keys")
      .update({
        revoked: true,
        revoked_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("❌ Error revoking API key:", error);
      return NextResponse.json({ error: "Failed to revoke API key" }, { status: 500 });
    }

    console.log("✅ API key revoked:", id);
    return NextResponse.json({
      message: "API key revoked successfully",
      api_key: {
        id: data.id,
        name: data.name,
        revoked: data.revoked,
        revoked_at: data.revoked_at,
      },
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
