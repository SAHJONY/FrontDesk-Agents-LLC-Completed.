// lib/tenantContext.ts
import { createClient } from '@supabase/supabase-js';

// Initialize the admin client directly to bypass the broken @/lib/supabaseClient path
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface TenantContext {
  tenantId: string | null;
  mode: "tenant" | "admin";
}

/**
 * Resolución simple:
 * 1. Si hay ?tenant=<id> en la URL → usamos eso (modo admin / consola interna).
 * 2. Si no, leemos el host y buscamos un mapping host → tenant_id en Supabase.
 * 3. Si nada matchea → tenantId = null (modo admin global o error controlado).
 */
export async function resolveTenantContextFromRequest(
  req: Request
): Promise<TenantContext> {
  // Safe check for environment variables
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { tenantId: null, mode: "admin" };
  }

  const url = new URL(req.url);
  const tenantParam = url.searchParams.get("tenant");

  if (tenantParam) {
    return { tenantId: tenantParam, mode: "admin" };
  }

  const host = req.headers.get("host") ?? "";
  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts[0] : "";

  // Dominio raíz → modo admin (sin tenant)
  if (!subdomain || subdomain === "frontdeskagents" || subdomain === "www") {
    return { tenantId: null, mode: "admin" };
  }

  const { data, error } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .eq("subdomain", subdomain)
    .maybeSingle();

  if (error) {
    console.error("[resolveTenantContextFromRequest] error:", error);
    return { tenantId: null, mode: "admin" };
  }

  if (!data) {
    return { tenantId: null, mode: "admin" };
  }

  return { tenantId: data.id, mode: "tenant" };
}
