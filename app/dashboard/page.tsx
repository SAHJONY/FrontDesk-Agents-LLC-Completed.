'use client';

import React from 'react';
import Image from 'next/image';
// This relative path is correct if team/page.tsx is in /app/dashboard/
import { useAuth } from '../contexts/AuthContext';

export default function TeamPage() {
  const { profile } = useAuth();
  return (
    <div className="p-6">
      <div className="mb-8 relative h-64 rounded-xl overflow-hidden">
        <Image 
          src="/images/premium/ai-agents-hero.jpg" 
          alt="AI Team Collaboration" 
          fill 
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <h2 className="text-3xl font-bold text-white ml-8">Node Workforce: {profile?.companyName}</h2>
        </div>
      </div>
    </div>
  );
}
