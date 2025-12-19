'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { 
  CheckBadgeIcon, 
  ArrowRightIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon, 
  CpuChipIcon 
} from '@heroicons/react/24/solid';

// @ts-ignore
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  // CEO Touch: Celebrate the new partnership
  useEffect(() => {
    try {
      // @ts-ignore
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa']
      });
    } catch (e) {
      console.error("Confetti launch failed", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl text-center">
        
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <CheckBadgeIcon className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Deployment Successful.
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Welcome to **FrontDesk Agents LLC**. Your enterprise AI infrastructure is currently being provisioned.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <RocketLaunchIcon className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className="text-white font-bold text-sm">Active Answering</h4>
            <p className="text-gray-500 text-xs">Provisioning your dedicated phone line...</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <CpuChipIcon className="w-6 h-6 text-cyan-400 mb-2" />
            <h4 className="text-white font-bold text-sm">AI Training</h4>
            <p className="text-gray-500 text-xs">Syncing with your business protocols...</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <ShieldCheckIcon className="w-6 h-6 text-green-400 mb-2" />
            <h4 className="text-white font-bold text-sm">Security</h4>
            <p className="text-gray-500 text-xs">Encrypting communication channels...</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/dashboard"
            className="group flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all"
          >
            Enter Management Console
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-sm text-gray-500 italic">
            A confirmation receipt and onboarding guide has been sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
}

