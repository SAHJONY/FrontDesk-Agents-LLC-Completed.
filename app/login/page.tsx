// app/login/page.tsx
// This is a Server Component, handling the static background and layout.

import React from 'react';
import Image from 'next/image'; // Assuming you use the Next.js Image component
import LoginForm from '../../components/LoginForm'; // Import the new Client Component

export default function LoginPage() {
    
    // We will use a dedicated class for the background and container (see CSS notes below)
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            
            {/* 🌟 1. Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                {/* NOTE: You must place your cinematic login image file (e.g., login-bg.jpg) 
                  in your 'public' directory and reference it here.
                */}
                <Image
                    src="/images/login-bg-cinematic.jpg" // Replace with the actual path to your image
                    alt="Corporate professionals observing a holographic login prompt"
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority // Prioritize loading since this is a critical page
                    // Add a dark overlay class to ensure text visibility
                    className="brightness-[0.3] contrast-[1.1]" 
                />
            </div>

            {/* 🌟 2. Login Form Container (z-10 ensures it's above the image) */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700">
                
                <h1 className="text-4xl font-extrabold text-white text-center mb-2 tracking-tight">
                    LOGIN
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    Access the FrontDesk Agents platform
                </p>

                {/* 🌟 3. The Interactive Client Form */}
                <LoginForm />
                
            </div>
        </div>
    );
}
