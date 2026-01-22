// app/admin/page.tsx
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // ignore in restricted contexts
        }
      },
    },
  });
}

function isOwnerEmail(email?: string | null) {
  const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
  if (!ownerEmail) return false;
  return (email || "").trim().toLowerCase() === ownerEmail;
}

export default async function AdminPage() {
  const supabase = await getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware should already protect, but keep page safe too:
  if (!user?.id) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-50">Admin</h1>
        <p className="text-slate-300">You are not signed in.</p>
        <Link
          href="/login"
          className="inline-flex rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
        >
          Go to login
        </Link>
      </div>
    );
  }

  // Owner check: email or tenant owner_id
  let isOwner = isOwnerEmail(user.email);

  if (!isOwner) {
    const { data: tenant } = await supabase
      .from("tenants")
      .select("id, owner_id")
      .eq("owner_id", user.id)
      .maybeSingle();

    isOwner = Boolean(tenant?.owner_id);
  }

  if (!isOwner) {
    return (
      <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <h1 className="text-2xl font-semibold text-slate-50">Access denied</h1>
        <p className="text-sm text-slate-300">
          Your account does not have Owner/Admin permissions.
        </p>
        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300"
          >
            Go to dashboard
          </Link>
          <Link
            href="/support"
            className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Contact support
          </Link>
        </div>
        <p className="text-[11px] text-slate-500">
          Owner access is granted via OWNER_EMAIL or tenants.owner_id.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-50">Admin</h1>
      <p className="text-slate-300">
        Welcome, {user.email || "Owner"}.
      </p>
      <p className="text-muted-foreground">
        Admin console ready. Next step: wire up controls (tenants, billing, usage, agents).
      </p>
    </div>
  );
}
