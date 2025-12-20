'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import UsageTracker from '@/components/dashboard/UsageTracker';

export default function PaymentSuccessPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserName(user.email?.split('@')[0] || 'Agent');
    }
    getProfile();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="w-20 h-20 text-green-500 animate-bounce" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-600 mb-8">
          Welcome to the next level, {userName}. Your AI FrontDesk Agents have been recharged and are ready for duty.
        </p>

        {/* This component will now show the updated 2,500 or 10,000 limit */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
          <h2 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-widest">
            Updated Status
          </h2>
          <UsageTracker />
        </div>

        <div className="space-y-4">
          <Link 
            href="/admin/dashboard"
            className="flex items-center justify-center w-full py-3 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition duration-200 group"
          >
            Go to Dashboard
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-xs text-slate-400">
            A receipt has been sent to your email. Your new limits are applied instantly thanks to our automated global infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
