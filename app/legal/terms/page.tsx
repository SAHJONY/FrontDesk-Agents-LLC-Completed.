// app/legal/terms/page.tsx
import React from 'react';
import Image from 'next/image';

export default function LegalTermsPage() {
    return (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            
            {/* 🌟 1. Cinematic Header Banner */}
            <div className="relative mb-12 h-[200px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <Image
                    // NOTE: Place a professional legal/trust image (e.g., legal-bg.jpg) 
                    // in your 'public' directory.
                    src="/images/legal-bg.jpg" 
                    alt="Professionals in a formal setting discussing legal documents"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    // Apply a dark overlay for dramatic effect and text contrast
                    className="brightness-[0.35] contrast-[1.1]" 
                />
                
                {/* Text Overlay for the Banner */}
                <div className="absolute inset-0 flex items-center justify-center z-10 p-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Terms of Service
                    </h1>
                </div>
            </div>

            {/* 🌟 2. Document Content Container (Clean, readable white background) */}
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-premium">
                
                <p className="text-sm text-gray-500 mb-6 border-b pb-4">
                    Last Updated: December 12, 2025
                </p>

                {/* Section 1 */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    By accessing and using the FrontDesk Agents LLC platform ("Service"), you agree to be bound by these Terms of Service ("Terms") and all applicable laws and regulations. If you disagree with any part of the terms, then you do not have permission to access the Service.
                </p>

                {/* Section 2 */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">
                    2. Use License
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials (information or software) on FrontDesk Agents LLC's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>

                {/* Section 3 */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">
                    3. Termination
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                
                {/* Contact Section */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Contact Us
                    </h3>
                    <p className="text-gray-700">
                        If you have any questions about these Terms, please contact us at legal@frontdeskagents.com.
                    </p>
                </div>

            </div>
        </div>
    );
}
