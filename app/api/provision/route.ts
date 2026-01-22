// app/api/provision/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function getAuthedUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnon) return null;

  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }: any) => {
            cookieStore.set(name, value, options);
          });
        } catch {}
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}

export async function POST() {
  try {
    const user = await getAuthedUser();
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const service = getServiceSupabase();
    if (!service) return NextResponse.json({ error: "Server config missing" }, { status: 500 });

    // Check if tenant exists
    const { data: existing } = await service
      .from("tenants")
      .select("id, owner_id")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (existing?.id) {
      return NextResponse.json({ success: true, tenantId: existing.id, created: false });
    }

    // Create tenant (assume columns exist; adjust names if your schema differs)
    const now = new Date().toISOString();
    const { data: tenant, error } = await service
      .from("tenants")
      .insert({
        owner_id: user.id,
        name: user.email,
        used_minutes: 0,
        max_minutes: 500, // default; align with tier later
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true, tenantId: tenant.id, created: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Internal error" }, { status: 500 });
  }
}
