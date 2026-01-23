// lib/rbac/RBACManager.ts
import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env/server";
import type { Role } from "./roles";

export type WorkspaceId = string;
export type LocationId = string;

export class RBACManager {
  private supabase = createClient(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  async addRole(params: {
    userId: string;
    role: Role;
    workspaceId: WorkspaceId;
    locationId?: LocationId | null;
  }) {
    const { error } = await this.supabase.from("user_roles").insert({
      user_id: params.userId,
      role: params.role,
      workspace_id: params.workspaceId,
      location_id: params.locationId ?? null,
    });
    if (error) throw new Error(`RBAC addRole failed: ${error.message}`);
  }

  // ✅ REQUIRED by your failing enterprise route
  async removeRole(params: {
    userId: string;
    role: Role;
    workspaceId: WorkspaceId;
    locationId?: LocationId | null;
  }) {
    let q = this.supabase
      .from("user_roles")
      .delete()
      .eq("user_id", params.userId)
      .eq("role", params.role)
      .eq("workspace_id", params.workspaceId);

    if (params.locationId !== undefined) {
      q = q.eq("location_id", params.locationId ?? null);
    }

    const { error } = await q;
    if (error) throw new Error(`RBAC removeRole failed: ${error.message}`);
  }

  async getRoles(params: { userId: string; workspaceId: WorkspaceId }): Promise<Role[]> {
    const { data, error } = await this.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", params.userId)
      .eq("workspace_id", params.workspaceId);

    if (error) throw new Error(`RBAC getRoles failed: ${error.message}`);
    return (data ?? []).map((r: any) => r.role as Role);
  }

  async hasRole(params: { userId: string; workspaceId: WorkspaceId; role: Role }): Promise<boolean> {
    const { data, error } = await this.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", params.userId)
      .eq("workspace_id", params.workspaceId)
      .eq("role", params.role)
      .limit(1);

    if (error) throw new Error(`RBAC hasRole failed: ${error.message}`);
    return (data ?? []).length > 0;
  }
}
