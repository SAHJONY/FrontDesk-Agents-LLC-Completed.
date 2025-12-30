'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function NumbersPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Phone Provisioning</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Managing local numbers for {profile?.company_name}</p>
      </div>
    </div>
  );
}
