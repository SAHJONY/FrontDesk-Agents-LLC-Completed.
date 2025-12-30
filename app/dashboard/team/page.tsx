'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function TeamPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workforce Management</h1>
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <p className="text-gray-600">
          Managing AI Agents for <span className="font-semibold">{profile?.companyName || 'Sovereign Node'}</span>
        </p>
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-md">
          Tier: {profile?.tier?.toUpperCase() || 'ELITE'} | Permanent Pricing Active
        </div>
      </div>
    </div>
  );
}
