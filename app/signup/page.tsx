// app/signup/page.tsx
// This is a Server Component, handling the static background and layout.

import React from 'react';
import Image from 'next/image';
import SignupForm from '../../components/SignupForm'; // Import the new Client Component

export default function SignupPage() {
    
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            
            {/* 🌟 1. Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                {/* NOTE: Place your cinematic signup image file (e.g., signup-bg.jpg) 
                  in your 'public' directory.
                */}
                <Image
                    src="/images/signup-bg-cinematic.jpg" // Replace with the actual path to your image
                    alt="Group of professional advisors ready to partner"
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority 
                    // Add a dark overlay class to ensure text visibility
                    className="brightness-[0.35] contrast-[1.1]" 
                />
            </div>

            {/* 🌟 2. Sign Up Form Container (z-10 ensures it's above the image) */}
            <div className="relative z-10 w-full max-w-lg p-8 sm:p-10 mx-4 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700">
                
                <h1 className="text-4xl font-extrabold text-white text-center mb-2 tracking-tight">
                    CREATE ACCOUNT
                </h1>
                <p className="text-gray-400 text-center mb-6">
                    Start your journey with FrontDesk Agents LLC
                </p>

                {/* 🌟 3. The Interactive Client Form */}
                <SignupForm />
                
            </div>
        </div>
    );
}
