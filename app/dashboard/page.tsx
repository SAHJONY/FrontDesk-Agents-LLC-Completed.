'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { LegalComplianceBadge } from '../components/LegalComplianceBadge';
// Ensure the path is exactly: /app/components/dashboard/DashboardStats.tsx
import DashboardStats from '../components/dashboard/DashboardStats';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sovereign Overview</h1>
        <LegalComplianceBadge />
      </div>
      <DashboardStats />
    </div>
  );
}
