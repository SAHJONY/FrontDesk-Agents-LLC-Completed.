export const dynamic = 'force-dynamic';

'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function CampaignsPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Market Campaigns</h1>
        <p className="text-gray-500 text-sm">Active AI Workforce for {profile?.countryCode || 'Global'}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-4">
            Campaign synchronization active for node <strong>{profile?.id || 'Root'}</strong>.
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Tier Status: {profile?.tier || 'Basic'}
          </div>
        </div>
      </div>
    </div>
  );
}
