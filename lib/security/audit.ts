// lib/security/audit.ts
import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env/server";

const supabase = createClient(serverEnv.NEXT_PUBLIC_SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function auditLog(params: {
  workspaceId: string;
  actorUserId: string;
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}) {
  const { error } = await supabase.from("audit_logs").insert({
    workspace_id: params.workspaceId,
    actor_user_id: params.actorUserId,
    action: params.action,
    target_type: params.targetType ?? null,
    target_id: params.targetId ?? null,
    metadata: params.metadata ?? {},
    ip: params.ip ?? null,
    user_agent: params.userAgent ?? null,
  });

  if (error) throw new Error(`Audit log insert failed: ${error.message}`);
}
