// app/legal/privacy/page.tsx
import React from 'react';
import Image from 'next/image';

export default function LegalPrivacyPage() {
    return (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            
            {/* 🌟 1. Cinematic Header Banner */}
            <div className="relative mb-12 h-[200px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <Image
                    // NOTE: Reuse the professional legal/trust image for consistency. 
                    src="/images/legal-bg.jpg" 
                    alt="Professionals maintaining data security and trust"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    // Apply a dark overlay for dramatic effect and text contrast
                    className="brightness-[0.35] contrast-[1.1]" 
                />
                
                {/* Text Overlay for the Banner */}
                <div className="absolute inset-0 flex items-center justify-center z-10 p-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Privacy Policy
                    </h1>
                </div>
            </div>

            {/* 🌟 2. Document Content Container (Clean, readable white background) */}
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-premium">
                
                <p className="text-sm text-gray-500 mb-6 border-b pb-4">
                    Effective Date: December 12, 2025
                </p>

                {/* Section 1 */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    1. Information We Collect
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We collect information that identifies, relates to, describes, or is capable of being associated with you ("Personal Information"). This includes operational data necessary for our AI agents to provide the service, such as call recordings, user names, and email addresses.
                </p>

                {/* Section 2 */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">
                    2. How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We use the information we collect to operate, maintain, and provide all features of the Service. Specifically, call data is used to train and improve the performance of your assigned FrontDesk Agents and provide you with detailed analytics.
                </p>

                {/* Section 3 */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">
                    3. Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    We implement industry-standard security measures, including encryption and strict access controls, to protect your Personal Information from unauthorized access, disclosure, alteration, or destruction.
                </p>
                
                {/* Contact Section */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Questions Regarding This Policy
                    </h3>
                    <p className="text-gray-700">
                        If you have any questions or concerns about our Privacy Policy, please contact our Data Protection Officer at privacy@frontdeskagents.com.
                    </p>
                </div>

            </div>
        </div>
    );
}
