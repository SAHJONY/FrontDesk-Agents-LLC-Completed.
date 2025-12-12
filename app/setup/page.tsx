// app/setup/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// NOTE: For a real setup process, each step would likely be a separate, interactive 
// Client Component, but here we focus on the visual wrapper.

// Define the steps to show on the page
const setupSteps = [
    { id: 1, title: "Gather Information", description: "Collect necessary business details and API keys.", link: "#step-info" },
    { id: 2, title: "Configure Settings", description: "Define scripting logic, call routing, and time zones.", link: "#step-config" },
    { id: 3, title: "Add Users", description: "Invite team members and assign appropriate permissions.", link: "#step-users" },
    { id: 4, title: "Launch System", description: "Activate your AI agents and start taking calls.", link: "#step-launch" },
];

export default function SetupPage() {
    return (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            
            {/* 🌟 1. Cinematic Header Banner */}
            <div className="relative mb-12 h-[350px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <Image
                    // NOTE: Place the professional setup image (e.g., setup-bg.jpg) 
                    // in your 'public' directory.
                    src="/images/setup-bg.jpg" 
                    alt="Professionals reviewing holographic setup instructions"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    // Apply a dark overlay for contrast against the text
                    className="brightness-[0.3] contrast-[1.1]" 
                />
                
                {/* Text Overlay for the Banner */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl">
                        System Setup
                    </h1>
                    <p className="mt-3 text-xl text-primary-300 sm:mt-4 max-w-2xl">
                        Follow these steps to seamlessly integrate FrontDesk Agents into your enterprise workflow.
                    </p>
                </div>
            </div>

            {/* 🌟 2. Setup Steps Content Section */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Your Deployment Plan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {setupSteps.map((step) => (
                        // Card with premium styling
                        <div key={step.id} className="bg-white p-6 rounded-xl shadow-premium hover:shadow-2xl transition duration-300 border-l-4 border-primary-600">
                            <span className="text-sm font-semibold text-primary-600">STEP {step.id}</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                            
                            <Link href={step.link} className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-800 font-medium transition duration-150">
                                Start Step →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Final CTA/Next Action */}
                <div className="mt-12 text-center">
                    <Link href="/dashboard" className="btn-primary-premium text-lg px-8 py-3">
                        Go to Dashboard After Setup
                    </Link>
                </div>
            </div>
        </div>
    );
}
