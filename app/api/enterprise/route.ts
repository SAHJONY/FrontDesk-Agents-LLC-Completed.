/**
 * Enterprise Features API
 * SSO, RBAC, Audit Logs, Compliance
 */

import { NextRequest, NextResponse } from "next/server";

import {
  ssoManager,
  rbacManager,
  auditLogger,
  complianceManager,
} from "@/lib/enterprise/enterprise-features";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// DB readiness (prefer service key for server actions)
const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL || !!process.env.SUPABASE_URL;
const hasAnon =
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !!process.env.SUPABASE_ANON_KEY;
const hasService =
  !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.SUPABASE_SERVICE_KEY;

const isDbConfigured = hasUrl && (hasService || hasAnon);

function parseDateOrUndefined(value: string | null): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

function parseRequiredDate(value: string | null, label: string): Date {
  if (!value) throw new Error(`Missing ${label}`);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid ${label}`);
  return d;
}

function parseLimit(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || Number.isNaN(n)) return undefined;
  return Math.min(Math.max(n, 1), 5000);
}

export async function GET(request: NextRequest) {
  try {
    if (!isDbConfigured) {
      console.warn("Enterprise API: DB credentials missing.");
      return NextResponse.json(
        { error: "Database configuration missing" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const customerId = searchParams.get("customerId");

    // -------------------------
    // SSO endpoints
    // -------------------------
    if (action === "sso_providers") {
      if (!customerId) {
        return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
      }
      const providers = await ssoManager.getProviders(customerId);
      return NextResponse.json({ success: true, data: providers });
    }

    // -------------------------
    // RBAC endpoints
    // -------------------------
    if (action === "roles") {
      const roles = rbacManager.getRoles();
      return NextResponse.json({ success: true, data: roles });
    }

    if (action === "user_roles") {
      const userId = searchParams.get("userId");
      if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
      }
      const roles = await rbacManager.getUserRoles(userId);
      return NextResponse.json({ success: true, data: roles });
    }

    if (action === "check_permission") {
      const userId = searchParams.get("userId");
      const permission = searchParams.get("permission");
      if (!userId || !permission) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
      const hasPermission = await rbacManager.hasPermission(userId, permission);
      return NextResponse.json({ success: true, data: { hasPermission } });
    }

    // -------------------------
    // Audit log endpoints
    // -------------------------
    if (action === "audit_logs") {
      const userId = searchParams.get("userId") || undefined;
      const actionFilter = searchParams.get("actionFilter") || undefined;
      const resource = searchParams.get("resource") || undefined;

      const startDate = parseDateOrUndefined(searchParams.get("startDate"));
      const endDate = parseDateOrUndefined(searchParams.get("endDate"));
      const limit = parseLimit(searchParams.get("limit"));

      const logs = await auditLogger.getLogs({
        userId,
        action: actionFilter,
        resource,
        startDate,
        endDate,
        limit,
      });

      return NextResponse.json({ success: true, data: logs });
    }

    /**
     * IMPORTANT:
     * Your AuditLogger type does NOT implement exportLogs().
     * So we implement "export" by calling getLogs() with the date range.
     * This returns JSON logs suitable for download/CSV conversion later.
     */
    if (action === "export_audit_logs") {
      const startDate = parseRequiredDate(searchParams.get("startDate"), "startDate");
      const endDate = parseRequiredDate(searchParams.get("endDate"), "endDate");

      if (endDate < startDate) {
        return NextResponse.json(
          { error: "endDate must be >= startDate" },
          { status: 400 }
        );
      }

      const limit = parseLimit(searchParams.get("limit"));

      const logs = await auditLogger.getLogs({
        startDate,
        endDate,
        limit: limit ?? 5000,
      });

      return NextResponse.json({ success: true, data: logs });
    }

    // -------------------------
    // Compliance endpoints
    // -------------------------
    if (action === "compliance_report") {
      if (!customerId) {
        return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
      }

      const reportType = searchParams.get("type");
      let report: any;

      switch (reportType) {
        case "gdpr":
          report = await complianceManager.generateGDPRReport(customerId);
          break;
        case "hipaa":
          report = await complianceManager.generateHIPAAReport(customerId);
          break;
        case "soc2":
          report = await complianceManager.generateSOC2Report(customerId);
          break;
        default:
          return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: report });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Enterprise GET Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured) {
      return NextResponse.json(
        { error: "Database configuration missing" },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { action } = body || {};

    // -------------------------
    // SSO endpoints
    // -------------------------
    if (action === "configure_sso") {
      const { customerId, provider } = body;
      if (!customerId || !provider) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
      await ssoManager.configureProvider(customerId, provider);
      return NextResponse.json({ success: true });
    }

    if (action === "sso_authenticate") {
      const { providerId, credentials } = body;
      if (!providerId || !credentials) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
      const result = await ssoManager.authenticate(providerId, credentials);
      return NextResponse.json({ success: true, data: result });
    }

    // -------------------------
    // RBAC endpoints
    // -------------------------
    if (action === "create_role") {
      const { customerId, role } = body;
      if (!customerId || !role) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
      const newRole = await rbacManager.createRole(customerId, role);
      return NextResponse.json({ success: true, data: newRole });
    }

    if (action === "assign_role") {
      const { userId, roleId } = body;
      if (!userId || !roleId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
      await rbacManager.assignRole(userId, roleId);
      return NextResponse.json({ success: true });
    }

    if (action === "remove_role") {
      const { userId, roleId } = body;
      if (!userId || !roleId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
      await rbacManager.removeRole(userId, roleId);
      return NextResponse.json({ success: true });
    }

    // -------------------------
    // Audit log endpoints
    // -------------------------
    if (action === "log_action") {
      const {
        userId,
        actionName,
        resource,
        resourceId,
        details,
        ipAddress,
        userAgent,
        status,
      } = body;

      if (!userId || !actionName) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }

      await auditLogger.log({
        userId,
        action: actionName,
        resource,
        resourceId,
        details,
        ipAddress,
        userAgent,
        status,
      });

      return NextResponse.json({ success: true });
    }

    // -------------------------
    // Compliance endpoints
    // -------------------------
    if (action === "data_subject_request") {
      const { customerId, requestType, subjectEmail } = body;
      if (!customerId || !requestType || !subjectEmail) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }

      const result = await complianceManager.handleDataSubjectRequest(
        customerId,
        requestType,
        subjectEmail
      );

      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Enterprise POST Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal error" },
      { status: 500 }
    );
  }
}
