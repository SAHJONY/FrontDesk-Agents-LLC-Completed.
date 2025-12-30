'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function CampaignsPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Market Campaigns</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600 font-medium">Active campaigns for: {profile?.company_name || 'Your Hub'}</p>
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
          System monitoring live traffic.
        </div>
      </div>
    </div>
  );
}
