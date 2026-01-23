// lib/sovereign-sync.ts
import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

type UpstashRedisClient = {
  set: (key: string, value: string, opts?: { ex?: number }) => Promise<unknown>;
};

async function getRedis(): Promise<UpstashRedisClient | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const mod = await import("@upstash/redis");
    return new mod.Redis({ url, token }) as unknown as UpstashRedisClient;
  } catch {
    return null;
  }
}

/**
 * Cache tenant status for fast enforcement / UI.
 * Keys written:
 * - tenant_status:{tenantId}
 * - (optional) block:{ownerId} => EXHAUSTED if used>=max
 */
export async function syncTenantStatus(tenantId: string) {
  const redis = await getRedis();
  if (!redis) return;

  const { data: tenant } = await supabaseAdmin
    .from("tenants")
    .select("id, owner_id, used_minutes, max_minutes, subscription_status")
    .eq("id", tenantId)
    .maybeSingle();

  if (!tenant) return;

  const used = Number(tenant.used_minutes || 0);
  const max = Math.max(1, Number(tenant.max_minutes || 1));
  const exhausted = used >= max;

  await redis.set(
    `tenant_status:${tenant.id}`,
    JSON.stringify({
      tenant_id: tenant.id,
      owner_id: tenant.owner_id,
      used_minutes: used,
      max_minutes: max,
      subscription_status: tenant.subscription_status || null,
      exhausted,
      updated_at: new Date().toISOString(),
    }),
    { ex: 3600 }
  );

  if (tenant.owner_id) {
    await redis.set(`block:${tenant.owner_id}`, exhausted ? "EXHAUSTED" : "OK", { ex: 3600 });
  }
}
