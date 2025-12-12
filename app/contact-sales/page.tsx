// app/contact-sales/page.tsx
"use client"; // Assuming this page will use form handling or client-side interactions

import React, { useState } from 'react';
import Link from 'next/link';
// FIX APPLIED HERE: Changed MailOpenIcon to EnvelopeOpenIcon
import { PhoneIcon, EnvelopeOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// Data for Contact Options
const contactOptions = [
    { title: "Book Sales Consultation", description: "Start here for pricing, ROI analysis, and a personalized demo.", icon: PhoneIcon, intent: "Sales" },
    { title: "Partnerships & Media", description: "Inquiries regarding integrations, channel partnerships, or press.", icon: UserGroupIcon, intent: "Partnership" },
    // Usage updated: The component reference uses the new name
    { title: "Technical Support", description: "Existing clients: submit a ticket or view our documentation.", icon: EnvelopeOpenIcon, intent: "Support" },
];

export default function ContactSalesPage() {
    const [selectedIntent, setSelectedIntent] = useState('Sales'); // Default to high-priority Sales
    
    // Placeholder for form submission logic
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Submitting form for intent: ${selectedIntent}`);
        // In a real application, this would post to a CRM/Lead Gen service
        alert(`Thank you! Your request for ${selectedIntent} has been submitted.`);
    };

    return (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                        Connect with Our Team
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Select your purpose below to ensure you reach the right expert quickly.
                    </p>
                </div>

                {/* 1. Intent Selector Grid (Crucial for CRO) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {contactOptions.map((option) => (
                        <div
                            key={option.intent}
                            className={`card-premium p-6 cursor-pointer border-2 transition duration-200 ${
                                selectedIntent === option.intent
                                    ? 'border-primary-600 shadow-xl bg-primary-50'
                                    : 'border-gray-200 hover:border-primary-300 bg-white'
                            }`}
                            onClick={() => setSelectedIntent(option.intent)}
                        >
                            {/* The component reference uses the icon property from the contactOptions array, which is now EnvelopeOpenIcon for Support. */}
                            <option.icon className="h-8 w-8 text-primary-600 mb-3" /> 
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                            <p className="text-gray-600 text-sm">{option.description}</p>
                        </div>
                    ))}
                </div>

                {/* 2. Dynamic Contact Form based on Intent */}
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-premium border border-gray-100">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        {selectedIntent === 'Sales' ? "Schedule Your Strategic Consultation" : 
                         selectedIntent === 'Partnership' ? "Partnership Inquiry Form" : 
                         "Support Request"}
                    </h2>
                    
                    {selectedIntent === 'Support' ? (
                        // Support Quick Link
                        <div className="p-4 bg-red-50 border-red-200 border rounded-lg">
                            <p className="text-lg font-medium text-red-800">For immediate support:</p>
                            <p className="text-gray-700 mt-2">
                                Please visit our dedicated <Link href="/support" className="text-red-600 hover:text-red-800 font-semibold">Support Portal</Link> or call our dedicated support line.
                            </p>
                        </div>
                    ) : (
                        // Sales/Partnership Form
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="fullName" required className="input-premium" />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                                    <input type="text" id="company" required className="input-premium" />
                                </div>

                                <div>
                                    <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700">Work Email</label>
                                    <input type="email" id="workEmail" required className="input-premium" />
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Direct)</label>
                                    <input type="tel" id="phone" required className="input-premium" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    How can we help you? (Describe your needs)
                                </label>
                                <textarea id="message" rows={4} required className="input-premium"></textarea>
                            </div>

                            <button type="submit" className="btn-primary-premium w-full py-3">
                                Submit Request
                            </button>
                            
                            <p className="text-xs text-gray-500 text-center pt-2">
                                We respect your privacy. By submitting, you agree to our <Link href="/legal/privacy" className="text-primary-600 hover:text-primary-800">Privacy Policy</Link>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
