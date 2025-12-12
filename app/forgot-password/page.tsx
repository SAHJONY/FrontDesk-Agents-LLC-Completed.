// app/forgot-password/page.tsx
// This is a Server Component, handling the static background and layout.

import React from 'react';
import Image from 'next/image';
import ForgotPasswordForm from '../../components/ForgotPasswordForm'; // Import the new Client Component

export default function ForgotPasswordPage() {
    
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            
            {/* 🌟 1. Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                {/* NOTE: Reuse the Login image or use a similar professional, dark background. 
                  Place the file (e.g., login-bg-cinematic.jpg) in your 'public' directory.
                */}
                <Image
                    src="/images/login-bg-cinematic.jpg" // Using the same dark aesthetic as Login
                    alt="Corporate professionals observing a holographic data display"
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority 
                    // Add a dark overlay class to ensure text visibility
                    className="brightness-[0.3] contrast-[1.1]" 
                />
            </div>

            {/* 🌟 2. Form Container (z-10 ensures it's above the image) */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700">
                
                <h1 className="text-3xl font-extrabold text-white text-center mb-6 tracking-tight">
                    Reset Password
                </h1>

                {/* 🌟 3. The Interactive Client Form */}
                <ForgotPasswordForm />
                
            </div>
        </div>
    );
}
