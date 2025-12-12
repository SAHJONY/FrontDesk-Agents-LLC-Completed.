// app/contact-sales/page.tsx
// This is the Server Component that handles layout and static content (like the image).

import React from 'react';
import Image from 'next/image';
import ContactForm from '../../components/ContactForm'; // Assuming this is the correct path to your fixed Client Component

export default function ContactSalesPage() {
    return (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            
            {/* 🌟 1. Cinematic Header Banner */}
            <div className="relative mb-12 h-[250px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <Image
                    // NOTE: Place a professional image (e.g., collaboration-bg.jpg) 
                    // in your 'public' directory.
                    src="/images/collaboration-bg.jpg" 
                    alt="Strategic consultation meeting focused on a laptop"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    // Apply a dark overlay for dramatic effect and text contrast
                    className="brightness-[0.35] contrast-[1.1]" 
                />
                
                {/* Text Overlay for the Banner */}
                <div className="absolute inset-0 flex items-center justify-center z-10 p-4 text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                            Initiate a Strategic Consultation
                        </h1>
                        <p className="mt-3 text-xl text-primary-300 sm:mt-4">
                            Connect directly with our advisory team to discuss your enterprise needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* 🌟 2. Form Content Section */}
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-8 sm:p-10 rounded-xl shadow-premium border border-gray-100">
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Inquiry Form
                    </h2>

                    {/* The Interactive Client Component */}
                    <ContactForm /> 
                    
                </div>
            </div>
            
            {/* Optional: Add contact details below the form for completeness */}
            <div className="max-w-xl mx-auto mt-10 text-center text-gray-700">
                <p>
                    Prefer to call? Reach us directly at **+1 (216) 480-4413**.
                </p>
            </div>

        </div>
    );
}
