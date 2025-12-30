'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LegalComplianceBadge } from '@/components/LegalComplianceBadge';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RevenueChart } from '@/components/dashboard/RevenueChart';

export default function DashboardPage() {
  const { user, profile } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sovereign Overview</h1>
        <LegalComplianceBadge />
      </div>
      
      <DashboardStats tenantId={profile?.tenant_id} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart tenantId={profile?.tenant_id} />
        {/* Additional widgets */}
      </div>
    </div>
  );
}
