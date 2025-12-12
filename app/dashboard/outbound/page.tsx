// app/dashboard/outbound/page.tsx
import React from 'react';
import Image from 'next/image';

export default function OutboundDashboardPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        
        {/* 🌟 1. Cinematic Background Banner */}
        <div className="absolute top-0 left-0 w-full h-[350px] z-0 overflow-hidden">
            <Image
                // NOTE: Place your chosen "Outbound Calls" image (e.g., outbound-bg.jpg) 
                // in your 'public' directory and reference it here.
                src="/images/outbound-calls-bg.jpg" 
                alt="Business professionals reviewing detailed outbound call metrics"
                layout="fill"
                objectFit="cover"
                quality={80}
                // Apply a dark overlay (low brightness, high contrast)
                className="brightness-[0.3] contrast-[1.1]" 
            />
        </div>

        {/* 🌟 2. Content Container (Positioned Above the Image) */}
        <div className="max-w-7xl mx-auto relative z-10 pt-24"> 
            
            <h2 className="text-4xl font-extrabold text-white mb-2 uppercase">
                Outbound Call Metrics Command Center
            </h2>
            <p className="text-primary-300 text-lg mb-10">
                Track conversion rates, agent efficiency, and operational success.
            </p>
            
            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Example Metric Card 1: Ensures content is visible (bg-white) */}
                <div className="card-premium bg-white p-6 shadow-xl">
                    <h3 className="text-sm font-semibold text-gray-500">Total Calls</h3>
                    <p className="text-3xl font-bold text-gray-900">981</p>
                    <p className="text-green-500 text-sm mt-1">+12% last month</p>
                </div>
                
                {/* Example Metric Card 2 */}
                <div className="card-premium bg-white p-6 shadow-xl">
                    <h3 className="text-sm font-semibold text-gray-500">Answered Rate</h3>
                    <p className="text-3xl font-bold text-gray-900">44.0%</p>
                    <p className="text-red-500 text-sm mt-1">-1.5% last week</p>
                </div>

                {/* Example Metric Card 3 */}
                <div className="card-premium bg-white p-6 shadow-xl">
                    <h3 className="text-sm font-semibold text-gray-500">Conversion Ratio</h3>
                    <p className="text-3xl font-bold text-gray-900">7.2%</p>
                    <p className="text-green-500 text-sm mt-1">On target</p>
                </div>
                
                {/* Example Metric Card 4 */}
                <div className="card-premium bg-white p-6 shadow-xl">
                    <h3 className="text-sm font-semibold text-gray-500">Avg Call Time</h3>
                    <p className="text-3xl font-bold text-gray-900">4:15 min</p>
                    <p className="text-gray-500 text-sm mt-1">Stable</p>
                </div>
                
            </div>
            
            {/* Additional charts/tables can go here */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-premium">
                {/* Placeholder for your main data charts/tables */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Call Log</h3>
                <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
                    [Table or Chart Component]
                </div>
            </div>

        </div>
    </div>
  );
}
