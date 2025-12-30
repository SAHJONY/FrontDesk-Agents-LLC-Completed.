'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
// If LegalComplianceBadge is in the root of components:
import { LegalComplianceBadge } from '@/components/LegalComplianceBadge';
// If these are in the dashboard folder inside components:
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RevenueChart } from '@/components/dashboard/RevenueChart';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sovereign Overview</h1>
          <p className="text-sm text-gray-500">Tenant: {profile?.tenant_id || 'Loading...'}</p>
        </div>
        <LegalComplianceBadge />
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Active AI Nodes</h3>
          <p className="text-gray-500 text-sm">Real-time market monitoring active in US West (pdx1).</p>
        </div>
      </div>
    </div>
  );
}
