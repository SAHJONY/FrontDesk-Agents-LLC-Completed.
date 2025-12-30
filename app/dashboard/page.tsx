'use client';

import React from 'react';
// These relative paths bypass all alias configuration errors
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
          <p className="text-sm text-gray-500">Identity: {user?.email}</p>
        </div>
        <LegalComplianceBadge />
      </div>
      
      {/* We pass an empty object or real stats; the component is now protected */}
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-2">Regional Status</h3>
          <p className="text-sm text-gray-500">Node active in pdx1 (Oregon, US)</p>
          <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            15% Revenue Share Tracking Active
          </div>
        </div>
      </div>
    </div>
  );
}
