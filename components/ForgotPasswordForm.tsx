// components/ForgotPasswordForm.tsx
"use client"; // CRITICAL: Enables form interactivity and event handlers

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    // Placeholder state and logic
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would make an API call here.
        console.log("Password Reset Request for:", email);
        setMessage(`If an account exists for ${email}, a password reset link has been sent.`);
        setEmail(''); // Clear the input field
    };

    return (
        // The actual form with the event handler
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {message && (
                <div className="bg-green-600/20 text-green-300 p-3 rounded-lg text-sm border border-green-500">
                    {message}
                </div>
            )}
            
            <p className="text-sm text-gray-400">
                Enter your registered email address below to receive a password reset link.
            </p>

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

            {/* Reset Button */}
            <div className="pt-4"> 
                <button 
                    type="submit" 
                    className="btn-primary-premium w-full text-lg"
                >
                    Send Reset Link
                </button>
            </div>

            {/* Back to Login Link */}
            <div className="text-center text-sm">
                <p className="text-gray-400">
                    <Link href="/login" className="font-medium text-primary-300 hover:text-primary-200 transition">
                        ← Back to Login
                    </Link>
                </p>
            </div>
        </form>
    );
}
