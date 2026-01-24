/**
 * Security API Endpoints - Corrected for Vercel Build
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  encryptionService,
  accessControlService,
  auditLoggingService,
  securityMonitoringService,
  Role,
  // Permission eliminado por no usarse
  AuditEventType,
  // AuditSeverity eliminado por no usarse
} from '@/lib/security/security-infrastructure';
import {
  dataClassificationService,
  gdprComplianceService,
  // dataRetentionService eliminado por no usarse
  dataAnonymizationService,
  GDPRDataSubjectRight,
} from '@/lib/security/data-protection';
import {
  secretsVault,
  proprietaryAlgorithmsVault,
  businessLogicVault,
  SecretType,
  SecretAccessLevel,
} from '@/lib/security/secrets-vault';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'security_metrics') {
      const timeRange = {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date(),
      };

      const metrics = securityMonitoringService.getMetrics(timeRange);
      const anomalies = securityMonitoringService.detectAnomalies();

      return NextResponse.json({
        success: true,
        data: { metrics, anomalies, timeRange },
      });
    }

    if (action === 'audit_logs') {
      const userId = searchParams.get('userId') || undefined;
      const eventType = searchParams.get('eventType') as AuditEventType | undefined;
      const limit = parseInt(searchParams.get('limit') || '100');

      const logs = auditLoggingService.query({ userId, eventType, limit });

      return NextResponse.json({ success: true, data: logs });
    }

    if (action === 'export_audit_logs') {
      const format = (searchParams.get('format') || 'json') as 'json' | 'csv';
      const exported = auditLoggingService.export(format);

      return new NextResponse(exported, {
        headers: {
          'Content-Type': format === 'json' ? 'application/json' : 'text/csv',
          'Content-Disposition': `attachment; filename="audit-logs.${format}"`,
        },
      });
    }

    if (action === 'secrets_for_rotation') {
      const secrets = secretsVault.getSecretsForRotation();

      return NextResponse.json({
        success: true,
        data: secrets.map(s => ({
          id: s.id,
          name: s.name,
          type: s.type,
          nextRotation: s.rotationPolicy?.nextRotation,
        })),
      });
    }

    if (action === 'proprietary_algorithms') {
      const userId = searchParams.get('userId') || 'system';
      const algorithms = proprietaryAlgorithmsVault.listAlgorithms(userId);

      return NextResponse.json({ success: true, data: algorithms });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Security API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'encrypt_data') {
      const { data } = body;
      if (!data) return NextResponse.json({ error: 'Missing data' }, { status: 400 });
      const encrypted = encryptionService.encryptAtRest(data);
      return NextResponse.json({ success: true, data: { encrypted } });
    }

    if (action === 'decrypt_data') {
      const { encrypted } = body;
      if (!encrypted) return NextResponse.json({ error: 'Missing encrypted data' }, { status: 400 });
      const decrypted = encryptionService.decryptAtRest(encrypted);
      return NextResponse.json({ success: true, data: { decrypted } });
    }

    if (action === 'check_permission') {
      const { userRole, permission } = body;
      if (!userRole || !permission) return NextResponse.json({ error: 'Missing params' }, { status: 400 });
      const hasPermission = accessControlService.hasPermission(userRole as Role, permission);
      return NextResponse.json({ success: true, data: { hasPermission } });
    }

    if (action === 'classify_data') {
      const { data } = body;
      if (!data) return NextResponse.json({ error: 'Missing data' }, { status: 400 });
      const classification = dataClassificationService.classifyData(data);
      const sensitivity = dataClassificationService.determineSensitivity(classification);
      return NextResponse.json({ success: true, data: { classification, sensitivity } });
    }

    if (action === 'submit_data_subject_request') {
      const { userId, requestType } = body;
      if (!userId || !requestType) return NextResponse.json({ error: 'Missing params' }, { status: 400 });
      const dsrRequest = gdprComplianceService.submitDataSubjectRequest(
        userId,
        requestType as GDPRDataSubjectRight
      );
      return NextResponse.json({ success: true, data: dsrRequest });
    }

    if (action === 'anonymize_data') {
      const { data } = body;
      if (!data) return NextResponse.json({ error: 'Missing data' }, { status: 400 });
      const anonymized = dataAnonymizationService.anonymize(data);
      return NextResponse.json({ success: true, data: { anonymized } });
    }

    if (action === 'store_secret') {
      const { name, value, type, accessLevel, createdBy, expiresAt, rotationIntervalDays } = body;
      const secretId = await secretsVault.storeSecret({
        name, value, type: type as SecretType,
        accessLevel: accessLevel as SecretAccessLevel,
        createdBy, expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        rotationIntervalDays,
      });
      return NextResponse.json({ success: true, data: { secretId } });
    }

    if (action === 'retrieve_secret') {
      const { secretId, userId, requiredAccessLevel } = body;
      const secret = await secretsVault.retrieveSecret(secretId, userId, requiredAccessLevel as SecretAccessLevel);
      return NextResponse.json({ success: true, data: { secret } });
    }

    if (action === 'rotate_secret') {
      const { secretId, newValue, userId } = body;
      await secretsVault.rotateSecret(secretId, newValue, userId);
      return NextResponse.json({ success: true, data: { message: 'Rotated' } });
    }

    if (action === 'store_proprietary_algorithm') {
      const { name, description, code, version, classification, owner, accessRestrictions } = body;
      const algorithmId = await proprietaryAlgorithmsVault.storeAlgorithm({
        name, description, code, version, classification, owner,
        accessRestrictions: accessRestrictions || [],
      });
      return NextResponse.json({ success: true, data: { algorithmId } });
    }

    if (action === 'retrieve_proprietary_algorithm') {
      const { algorithmId, userId } = body;
      const algorithm = await proprietaryAlgorithmsVault.retrieveAlgorithm(algorithmId, userId);
      return NextResponse.json({ success: true, data: { algorithm } });
    }

    if (action === 'store_business_logic') {
      const { name, description, logic, category, confidentialityLevel, owner, dependencies } = body;
      const logicId = await businessLogicVault.storeLogic({
        name, description, logic, category, confidentialityLevel, owner, dependencies,
      });
      return NextResponse.json({ success: true, data: { logicId } });
    }

    if (action === 'retrieve_business_logic') {
      const { logicId, userId } = body;
      const logic = await businessLogicVault.retrieveLogic(logicId, userId);
      return NextResponse.json({ success: true, data: { logic } });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
