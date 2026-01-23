// lib/audit-logger.ts
import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type AuditAction =
  | "AUTH_LOGIN"
  | "AUTH_LOGOUT"
  | "TENANT_CREATED"
  | "TENANT_UPDATED"
  | "SUBSCRIPTION_UPDATED"
  | "WEBHOOK_RECEIVED"
  | "WEBHOOK_PROCESSED"
  | "CAPACITY_ALERT_SENT"
  | "WHATSAPP_SENT"
  | "ERROR";

export type AuditLogRecord = {
  id?: string;
  tenant_id?: string | null;
  actor_user_id?: string | null;
  actor_email?: string | null;
  action: AuditAction | string;
  level?: "info" | "warn" | "error";
  message?: string | null;
  meta?: Record<string, any> | null;
  created_at?: string;
};

type ExportRow = {
  id: string;
  created_at: string;
  tenant_id: string | null;
  actor_user_id: string | null;
  actor_email: string | null;
  action: string;
  level: string | null;
  message: string | null;
  meta: any;
};

export class AuditLogger {
  private tableName: string;

  constructor(opts?: { tableName?: string }) {
    this.tableName = opts?.tableName || "audit_logs";
  }

  /**
   * Write a log entry (best-effort).
   */
  async log(entry: AuditLogRecord) {
    try {
      const now = new Date().toISOString();
      const payload: AuditLogRecord = {
        level: "info",
        ...entry,
        created_at: entry.created_at || now,
      };

      const { error } = await supabaseAdmin.from(this.tableName).insert(payload);
      if (error) {
        // don't throw in audit logger; never break prod flows
        console.error("AuditLogger.insert error:", error.message);
      }
    } catch (e: any) {
      console.error("AuditLogger.log failed:", e?.message || e);
    }
  }

  /**
   * Query logs (simple filter).
   */
  async query(params: {
    tenantId?: string;
    start?: Date;
    end?: Date;
    limit?: number;
  }): Promise<ExportRow[]> {
    const limit = Math.min(Math.max(params.limit || 500, 1), 5000);

    let q = supabaseAdmin
      .from(this.tableName)
      .select(
        "id, created_at, tenant_id, actor_user_id, actor_email, action, level, message, meta"
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (params.tenantId) q = q.eq("tenant_id", params.tenantId);
    if (params.start) q = q.gte("created_at", params.start.toISOString());
    if (params.end) q = q.lte("created_at", params.end.toISOString());

    const { data, error } = await q;
    if (error) throw new Error(error.message);

    return (data || []) as ExportRow[];
  }

  /**
   * ✅ This is what your enterprise route expects.
   * Export logs between [startDate, endDate].
   */
  async exportLogs(startDate: Date, endDate: Date, opts?: { tenantId?: string }) {
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
      throw new Error("Invalid startDate");
    }
    if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
      throw new Error("Invalid endDate");
    }
    if (endDate < startDate) {
      throw new Error("endDate must be >= startDate");
    }

    // pull up to 5000 rows for export window
    const rows = await this.query({
      tenantId: opts?.tenantId,
      start: startDate,
      end: endDate,
      limit: 5000,
    });

    // return in a stable export shape
    return rows.map((r) => ({
      id: r.id,
      created_at: r.created_at,
      tenant_id: r.tenant_id,
      actor_user_id: r.actor_user_id,
      actor_email: r.actor_email,
      action: r.action,
      level: r.level,
      message: r.message,
      meta: r.meta,
    }));
  }
}

// default singleton if you prefer
export const auditLogger = new AuditLogger();
