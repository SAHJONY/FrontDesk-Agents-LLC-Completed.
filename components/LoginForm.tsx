// components/LoginForm.tsx
"use client"; // CRITICAL: Enables form interactivity and event handlers

import React, { useState } from 'react';
// FIX APPLIED HERE: Added missing Link import
import Link from 'next/link'; 

export default function LoginForm() {
    // Placeholder state and logic for client-side interactivity
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login Attempt:", email);
        // Add your actual authentication/API call logic here
    };

    return (
        // The actual form with the event handler (now allowed because of "use client")
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email address</label>
                <input 
                    id="email"
                    type="email" 
                    placeholder="Enter email" 
                    className="input-premium bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </div>

            {/* Password Input */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                <input 
                    id="password"
                    type="password" 
                    placeholder="Enter password" 
                    className="input-premium bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>

            {/* Sign In Button */}
            <div className="pt-4"> 
                <button 
                    type="submit" 
                    className="btn-primary-premium w-full text-lg"
                >
                    Sign In
                </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center text-sm">
                <Link href="/forgot-password" className="font-medium text-primary-300 hover:text-primary-200 transition">
                    Forgot password?
                </Link>
            </div>
        </form>
    );
}
