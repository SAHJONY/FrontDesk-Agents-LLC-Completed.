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

// Utility to verify environment is ready
const isDbConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Small helper: safely call methods that may not exist on managers
function getMethod<T extends object>(obj: T, name: string) {
  const fn = (obj as any)?.[name];
  return typeof fn === "function" ? fn : null;
}

export async function GET(request: NextRequest) {
  try {
    if (!isDbConfigured) {
      console.warn("Database credentials missing. Skipping enterprise action.");
      return NextResponse.json(
        { error: "Database configuration missing" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const customerId = searchParams.get("customerId");

    // SSO endpoints
    if (action === "sso_providers" && customerId) {
      const providers = await ssoManager.getProviders(customerId);
      return NextResponse.json({ success: true, data: providers });
    }

    // RBAC endpoints
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
        return NextResponse.json(
          { error: "Missing parameters" },
          { status: 400 }
        );
      }
      const hasPermission = await rbacManager.hasPermission(userId, permission);
      return NextResponse.json({ success: true, data: { hasPermission } });
    }

    // Audit log endpoints
    if (action === "audit_logs") {
      const userId = searchParams.get("userId") || undefined;
      const actionFilter = searchParams.get("actionFilter") || undefined;
      const resource = searchParams.get("resource") || undefined;

      const startDate = searchParams.get("startDate")
        ? new Date(searchParams.get("startDate")!)
        : undefined;
      const endDate = searchParams.get("endDate")
        ? new Date(searchParams.get("endDate")!)
        : undefined;

      const limit = searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!, 10)
        : undefined;

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

    // Export audit logs (compile-safe even if exportLogs doesn't exist)
    if (action === "export_audit_logs") {
      const startDateStr = searchParams.get("startDate");
      const endDateStr = searchParams.get("endDate");

      if (!startDateStr || !endDateStr) {
        return NextResponse.json(
          { error: "Missing date parameters" },
          { status: 400 }
        );
      }

      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      const exportLogsFn = getMethod(auditLogger as any, "exportLogs");
      if (exportLogsFn) {
        const logs = await exportLogsFn.call(auditLogger, startDate, endDate);
        return NextResponse.json({ success: true, data: logs });
      }

      // Fallback: use getLogs with a high limit
      const logs = await auditLogger.getLogs({
        startDate,
        endDate,
        limit: 5000,
      });
      return NextResponse.json({
        success: true,
        data: logs,
        note: "exportLogs not implemented; returned getLogs fallback",
      });
    }

    // Compliance endpoints
    if (action === "compliance_report" && customerId) {
      const reportType = searchParams.get("type");

      if (reportType === "gdpr") {
        const report = await complianceManager.generateGDPRReport(customerId);
        return NextResponse.json({ success: true, data: report });
      }

      if (reportType === "hipaa") {
        const hipaaFn = getMethod(complianceManager as any, "generateHIPAAReport");
        if (!hipaaFn) {
          return NextResponse.json(
            { error: "HIPAA report not implemented on ComplianceManager" },
            { status: 501 }
          );
        }
        const report = await hipaaFn.call(complianceManager, customerId);
        return NextResponse.json({ success: true, data: report });
      }

      if (reportType === "soc2") {
        const soc2Fn = getMethod(complianceManager as any, "generateSOC2Report");
        if (!soc2Fn) {
          return NextResponse.json(
            { error: "SOC2 report not implemented on ComplianceManager" },
            { status: 501 }
          );
        }
        const report = await soc2Fn.call(complianceManager, customerId);
        return NextResponse.json({ success: true, data: report });
      }

      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Enterprise GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    const body = await request.json();
    const { action } = body;

    // SSO endpoints
    if (action === "configure_sso") {
      const { customerId, provider } = body;
      await ssoManager.configureProvider(customerId, provider);
      return NextResponse.json({ success: true });
    }

    if (action === "sso_authenticate") {
      const { providerId, credentials } = body;
      const result = await ssoManager.authenticate(providerId, credentials);
      return NextResponse.json({ success: true, data: result });
    }

    // RBAC endpoints
    if (action === "create_role") {
      const { customerId, role } = body;
      const newRole = await rbacManager.createRole(customerId, role);
      return NextResponse.json({ success: true, data: newRole });
    }

    if (action === "assign_role") {
      const { userId, roleId } = body;
      if (!userId || !roleId) {
        return NextResponse.json(
          { error: "Missing parameters" },
          { status: 400 }
        );
      }
      await rbacManager.assignRole(userId, roleId);
      return NextResponse.json({ success: true });
    }

    // IMPORTANT: remove_role method name differs across implementations.
    // We safely try: removeRole -> unassignRole -> revokeRole
    if (action === "remove_role") {
      const { userId, roleId } = body;
      if (!userId || !roleId) {
        return NextResponse.json(
          { error: "Missing parameters" },
          { status: 400 }
        );
      }

      const removeFn =
        getMethod(rbacManager as any, "removeRole") ||
        getMethod(rbacManager as any, "unassignRole") ||
        getMethod(rbacManager as any, "revokeRole");

      if (!removeFn) {
        return NextResponse.json(
          { error: "RBAC remove role not implemented on RBACManager" },
          { status: 501 }
        );
      }

      await removeFn.call(rbacManager, userId, roleId);
      return NextResponse.json({ success: true });
    }

    // Audit log endpoints
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

    // Compliance endpoints
    if (action === "data_subject_request") {
      const { customerId, requestType, subjectEmail } = body;
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
