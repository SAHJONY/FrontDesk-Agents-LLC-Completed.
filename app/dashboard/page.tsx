'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LegalComplianceBadge } from '../../components/LegalComplianceBadge';
import { DashboardStats } from '../../components/dashboard/DashboardStats';
import { RevenueChart } from '../../components/dashboard/RevenueChart';

export default function DashboardPage() {
  const { user, profile } = useAuth();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sovereign Overview</h1>
          <p className="text-sm text-gray-500">
            Node: pdx1 | {profile?.companyName || 'Global Hub'}
          </p>
        </div>
        <LegalComplianceBadge />
      </div>
      
      {/* DashboardStats is protected with internal defaults if data isn't ready */}
      <DashboardStats tenantId={profile?.id} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart tenantId={profile?.id} />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">Market Identity</h3>
          <p className="text-sm text-gray-500 italic">
            Tier: {profile?.tier?.toUpperCase() || 'PROVISIONING'}
          </p>
          <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Regional Multiplier: {profile?.regionalMultiplier || 1.0}x
          </div>
        </div>
      </div>
    </div>
  );
}
