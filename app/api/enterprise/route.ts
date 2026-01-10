/**
 * Enterprise Features API
 * SSO, RBAC, Audit Logs, Compliance
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  ssoManager,
  rbacManager,
  auditLogger,
  complianceManager,
} from '@/lib/enterprise/enterprise-features';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const customerId = searchParams.get('customerId');

    // SSO endpoints
    if (action === 'sso_providers' && customerId) {
      const providers = await ssoManager.getProviders(customerId);
      return NextResponse.json({ success: true, data: providers });
    }

    // RBAC endpoints
    if (action === 'roles') {
      const roles = rbacManager.getRoles();
      return NextResponse.json({ success: true, data: roles });
    }

    if (action === 'user_roles') {
      const userId = searchParams.get('userId');
      if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
      }
      const roles = await rbacManager.getUserRoles(userId);
      return NextResponse.json({ success: true, data: roles });
    }

    if (action === 'check_permission') {
      const userId = searchParams.get('userId');
      const permission = searchParams.get('permission');
      if (!userId || !permission) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
      }
      const hasPermission = await rbacManager.hasPermission(userId, permission);
      return NextResponse.json({ success: true, data: { hasPermission } });
    }

    // Audit log endpoints
    if (action === 'audit_logs') {
      const userId = searchParams.get('userId') || undefined;
      const actionFilter = searchParams.get('actionFilter') || undefined;
      const resource = searchParams.get('resource') || undefined;
      const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
      const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

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

    if (action === 'export_audit_logs') {
      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
      if (!startDate || !endDate) {
        return NextResponse.json({ error: 'Missing date parameters' }, { status: 400 });
      }
      const logs = await auditLogger.exportLogs(new Date(startDate), new Date(endDate));
      return NextResponse.json({ success: true, data: logs });
    }

    // Compliance endpoints
    if (action === 'compliance_report' && customerId) {
      const reportType = searchParams.get('type');
      let report;
      
      switch (reportType) {
        case 'gdpr':
          report = await complianceManager.generateGDPRReport(customerId);
          break;
        case 'hipaa':
          report = await complianceManager.generateHIPAAReport(customerId);
          break;
        case 'soc2':
          report = await complianceManager.generateSOC2Report(customerId);
          break;
        default:
          return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
      }
      
      return NextResponse.json({ success: true, data: report });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // SSO endpoints
    if (action === 'configure_sso') {
      const { customerId, provider } = body;
      await ssoManager.configureProvider(customerId, provider);
      return NextResponse.json({ success: true });
    }

    if (action === 'sso_authenticate') {
      const { providerId, credentials } = body;
      const result = await ssoManager.authenticate(providerId, credentials);
      return NextResponse.json({ success: true, data: result });
    }

    // RBAC endpoints
    if (action === 'create_role') {
      const { customerId, role } = body;
      const newRole = await rbacManager.createRole(customerId, role);
      return NextResponse.json({ success: true, data: newRole });
    }

    if (action === 'assign_role') {
      const { userId, roleId } = body;
      await rbacManager.assignRole(userId, roleId);
      return NextResponse.json({ success: true });
    }

    if (action === 'remove_role') {
      const { userId, roleId } = body;
      await rbacManager.removeRole(userId, roleId);
      return NextResponse.json({ success: true });
    }

    // Audit log endpoints
    if (action === 'log_action') {
      const { userId, actionName, resource, resourceId, details, ipAddress, userAgent, status } = body;
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
    if (action === 'data_subject_request') {
      const { customerId, requestType, subjectEmail } = body;
      const result = await complianceManager.handleDataSubjectRequest(
        customerId,
        requestType,
        subjectEmail
      );
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
