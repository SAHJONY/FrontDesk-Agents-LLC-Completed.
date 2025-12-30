'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function CampaignsPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Market Campaigns</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-gray-600">Managing workforce for: {profile?.companyName || 'Sovereign Node'}</p>
      </div>
    </div>
  );
}
