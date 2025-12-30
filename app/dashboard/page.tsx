'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { LegalComplianceBadge } from '../components/LegalComplianceBadge';
// Updated path and import style for Stats
import DashboardStats from '../components/dashboard/DashboardStats';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sovereign Overview</h1>
          <p className="text-sm text-gray-500">Tier: {profile?.tier || 'Elite'}</p>
        </div>
        <LegalComplianceBadge />
      </div>
      
      {/* Ensure DashboardStats.tsx exists in app/components/dashboard/ */}
      <DashboardStats />
      
      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm text-center">
        <p className="text-sm text-gray-600 font-medium">
          Global Pricing Tiers: $199 | $399 | $799 | $1,499 Permanent
        </p>
      </div>
    </div>
  );
}
