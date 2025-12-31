"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, CheckCircle, Phone, Clock, Activity 
} from 'lucide-react';

// CORRECT RELATIVE PATH: 
// [id] -> calls -> dashboard -> app -> components
import { LegalComplianceBadge } from '../../../components/LegalComplianceBadge';

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();
  const callId = params?.id;

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </button>
          <LegalComplianceBadge />
        </div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Phone className="text-green-500" /> Call: {callId}
        </h1>
      </div>
    </div>
  );
}
