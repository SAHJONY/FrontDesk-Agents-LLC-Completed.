'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function CampaignsPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Market Campaigns</h1>
      {/* Campaign List Component */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Active campaigns for node: {profile?.tenant_id}</p>
      </div>
    </div>
  );
}
