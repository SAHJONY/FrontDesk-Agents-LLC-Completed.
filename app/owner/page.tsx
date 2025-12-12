// app/owner/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Assuming you have separate components for complex financial charts or tables:
// import RevenueChart from '../components/owner/RevenueChart'; 

export default function OwnerDashboardPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        
        {/* 🌟 1. Cinematic Header Banner for Owner Authority */}
        {/* Uses a dark, data-focused image to convey command and control. */}
        <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
            <Image
                // NOTE: Use a highly executive, data-centric image here (e.g., control-center-bg.jpg)
                src="/images/control-center-bg.jpg" 
                alt="Executive control center with holographic displays"
                layout="fill"
                objectFit="cover"
                quality={80}
                // Deep dark overlay for contrast and dramatic effect
                className="brightness-[0.25] contrast-[1.1]" 
            />
        </div>

        {/* 🌟 2. Content Container (Positioned Above the Image) */}
        <div className="max-w-7xl mx-auto relative z-10 pt-28"> 
            
            <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
                Owner Command Center
            </h1>
            <p className="text-primary-300 text-xl mb-12">
                Unrestricted control and comprehensive financial oversight.
            </p>
            
            {/* --- SYSTEM STATUS & ACCESS (High-Priority Cards) --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                
                {/* Status Card: System Health */}
                <div className="card-premium bg-green-600/10 p-6 shadow-2xl border-l-4 border-green-500">
                    <h3 className="text-sm font-semibold text-green-300">SYSTEM HEALTH</h3>
                    <p className="text-3xl font-bold text-white mt-1">Operational</p>
                    <p className="text-green-500 text-sm mt-1">No incidents reported</p>
                </div>
                
                {/* Status Card: Superuser Mode */}
                <div className="card-premium bg-gray-800 p-6 shadow-2xl border-l-4 border-yellow-500">
                    <h3 className="text-sm font-semibold text-yellow-400">ACCESS LEVEL</h3>
                    <p className="text-3xl font-bold text-white mt-1">OWNER (Unrestricted)</p>
                    <Link href="/owner/settings" className="text-sm text-primary-300 hover:text-white transition">Manage Global Settings →</Link>
                </div>

                {/* Status Card: Active Tenants */}
                <div className="card-premium bg-gray-800 p-6 shadow-2xl">
                    <h3 className="text-sm font-semibold text-gray-400">TOTAL TENANTS</h3>
                    <p className="text-3xl font-bold text-white mt-1">87</p>
                    <Link href="/admin/tenants" className="text-sm text-primary-300 hover:text-white transition">View All Tenants →</Link>
                </div>
                
                {/* Status Card: Data Latency */}
                <div className="card-premium bg-gray-800 p-6 shadow-2xl">
                    <h3 className="text-sm font-semibold text-gray-400">DATA LATENCY</h3>
                    <p className="text-3xl font-bold text-white mt-1">45 ms</p>
                    <p className="text-gray-500 text-sm mt-1">Real-time sync</p>
                </div>
            </div>
            
            {/* --- FINANCIAL COMMAND CENTER --- */}
            <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-3">
                Financial Command Center
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Financial Metric 1: MRR (Monthly Recurring Revenue) */}
                <div className="card-premium bg-gray-900 p-6 shadow-2xl">
                    <h3 className="text-sm font-semibold text-gray-400">CURRENT MRR</h3>
                    <p className="text-4xl font-extrabold text-green-400 mt-2">$215,840</p>
                    <p className="text-green-500 text-sm mt-2">+4.2% MoM</p>
                </div>
                
                {/* Financial Metric 2: ARR (Annual Recurring Revenue) */}
                <div className="card-premium bg-gray-900 p-6 shadow-2xl">
                    <h3 className="text-sm font-semibold text-gray-400">PROJECTED ARR</h3>
                    <p className="text-4xl font-extrabold text-white mt-2">$2.59 M</p>
                    <p className="text-gray-500 text-sm mt-2">Annualized Projection</p>
                </div>
                
                {/* Financial Metric 3: Churn Rate */}
                <div className="card-premium bg-gray-900 p-6 shadow-2xl">
                    <h3 className="text-sm font-semibold text-gray-400">NET CHURN RATE</h3>
                    <p className="text-4xl font-extrabold text-red-400 mt-2">0.8%</p>
                    <Link href="/owner/payments" className="text-sm text-primary-300 hover:text-white transition">Review Payment History →</Link>
                </div>
                
                {/* Main Financial Chart Area */}
                <div className="lg:col-span-3 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Trend Analysis</h3>
                    {/* Placeholder for a complex chart library like Recharts or Nivo */}
                    <div className="h-80 flex items-center justify-center text-gray-600">
                        [Complex Chart Component: Revenue, Billing Cycles]
                    </div>
                </div>
            </div>

            {/* --- APPLICATION CONTROL --- */}
            <h2 className="text-3xl font-extrabold text-white mt-12 mb-6 border-b border-gray-700 pb-3">
                Application Control
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Control Panel Link: Onboarding */}
                <Link href="/owner/onboarding" className="card-premium bg-gray-800 p-6 shadow-2xl hover:bg-gray-700/50 transition duration-200">
                    <h3 className="text-2xl font-bold text-white">Manage Onboarding Flow</h3>
                    <p className="text-gray-400 mt-1">Override default settings and review pending clients.</p>
                </Link>

                {/* Control Panel Link: Billing/Pricing */}
                <Link href="/owner/pricing" className="card-premium bg-gray-800 p-6 shadow-2xl hover:bg-gray-700/50 transition duration-200">
                    <h3 className="text-2xl font-bold text-white">Global Pricing & Tiers</h3>
                    <p className="text-gray-400 mt-1">Adjust service pricing and subscription rules globally.</p>
                </Link>
            </div>
            
        </div>
    </div>
  );
}
