// lib/rbac/RBACManager.ts
import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env/server";
import { isRole, type Role } from "./roles";

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

  /**
   * removeRole supports:
   *  1) New API: removeRole({ userId, role, workspaceId, locationId? })
   *  2) Legacy API used by app/api/enterprise/route.ts: removeRole(userId, roleOrId, workspaceId?)
   *
   * Legacy behavior:
   *  - If roleOrId matches a known Role => delete by { user_id, role, workspace_id? }
   *  - Else => assume roleOrId is a user_roles row id and delete by { id, user_id, workspace_id? }
   *  - If workspaceId is not provided in legacy form, deletion occurs across all workspaces.
   */
  async removeRole(params: {
    userId: string;
    role: Role;
    workspaceId: WorkspaceId;
    locationId?: LocationId | null;
  }): Promise<void>;
  async removeRole(userId: string, roleOrId: string, workspaceId?: WorkspaceId): Promise<void>;
  async removeRole(
    arg1:
      | {
          userId: string;
          role: Role;
          workspaceId: WorkspaceId;
          locationId?: LocationId | null;
        }
      | string,
    arg2?: string,
    arg3?: WorkspaceId
  ): Promise<void> {
    // --- New API form ---
    if (typeof arg1 !== "string") {
      const params = arg1;

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
      return;
    }

    // --- Legacy API form: (userId, roleOrId, workspaceId?) ---
    const userId = arg1;
    const roleOrId = String(arg2 ?? "").trim();
    const workspaceId = arg3;

    if (!roleOrId) {
      throw new Error("RBAC removeRole legacy call missing roleOrId");
    }

    // If roleOrId is actually a Role enum, delete by role; otherwise assume it's a row id.
    if (isRole(roleOrId)) {
      let q = this.supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", roleOrId);

      if (workspaceId) q = q.eq("workspace_id", workspaceId);

      const { error } = await q;
      if (error) throw new Error(`RBAC removeRole (legacy role) failed: ${error.message}`);
      return;
    }

    // Assume roleOrId is a user_roles row id (id/uuid)
    let q = this.supabase
      .from("user_roles")
      .delete()
      .eq("id", roleOrId)
      .eq("user_id", userId);

    if (workspaceId) q = q.eq("workspace_id", workspaceId);

    const { error } = await q;
    if (error) throw new Error(`RBAC removeRole (legacy id) failed: ${error.message}`);
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
