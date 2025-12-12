// app/dashboard/page.tsx
import React from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        
        {/* 🌟 OPTIONAL: Full-width background element for a cinematic banner look */}
        <div className="absolute top-0 left-0 w-full h-[300px] z-0 overflow-hidden">
            <Image
                src="/images/dashboard-bg.jpg" // Add your cinematic dashboard image here
                alt="Executive dashboard with real-time analytics"
                layout="fill"
                objectFit="cover"
                quality={80}
                // Apply a dark overlay for contrast against the text
                className="brightness-[0.4] contrast-[1.1]" 
            />
        </div>

        {/* 🌟 Content Container: Use generous top padding and position content above the background (z-10) */}
        <div className="max-w-7xl mx-auto relative z-10 pt-20"> 
            
            <h2 className="text-4xl font-extrabold text-white mb-2">
                Client Analytics Dashboard
            </h2>
            <p className="text-primary-300 text-lg mb-8">
                Executive overview of key operational metrics.
            </p>
            
            {/* Main content grid starts here (your cards and charts) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Your content (e.g., FeatureCard components) goes here. 
                    They will look great against the dark image background. 
                */}
                <div className="card-premium bg-white p-6 shadow-xl">... Card 1 Content ...</div>
                <div className="card-premium bg-white p-6 shadow-xl">... Card 2 Content ...</div>
                <div className="card-premium bg-white p-6 shadow-xl">... Card 3 Content ...</div>
            </div>
        </div>
    </div>
  );
}
