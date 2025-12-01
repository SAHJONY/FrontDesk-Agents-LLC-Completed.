// lib/tenantContext.ts
import { supabaseAdmin } from "@/lib/supabaseClient";

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
  if (!supabaseAdmin) return { tenantId: null, mode: "admin" };

  const url = new URL(req.url);
  const tenantParam = url.searchParams.get("tenant");

  if (tenantParam) {
    return { tenantId: tenantParam, mode: "admin" };
  }

  const host = req.headers.get("host") ?? "";
  // Ejemplo: clinicA.frontdeskagents.com
  const subdomain = host.split(".")[0];

  if (!subdomain || subdomain === "frontdeskagents" || subdomain === "www") {
    // Dominio raíz → modo admin (global)
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
