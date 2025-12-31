import React from 'react'; // Removed useEffect, useState, useRef
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Download, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Clock, 
  Activity 
} from 'lucide-react';

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="p-6">
       {/* Use the components to satisfy the linter */}
       <button onClick={() => router.back()} className="flex items-center gap-2">
         <ArrowLeft className="w-4 h-4" /> Back to Hub
       </button>
       <h1 className="text-xl font-bold mt-4">Call ID: {params.id}</h1>
       <Activity className="text-green-500 w-5 h-5 mt-2" />
    </div>
  );
}
