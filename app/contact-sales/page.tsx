// app/contact-sales/page.tsx
// This file is a Server Component and ONLY handles layout/structure.

import React from 'react';
import ContactForm from '../../components/ContactForm'; // Adjust path as needed

export default function ContactSalesPage() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-premium">
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Initiate a Strategic Inquiry
                </h1>
                <p className="text-gray-600 mb-8">
                    Connect with our strategic advisors to discuss enterprise solutions.
                </p>

                {/* 🌟 CRITICAL: Render the new Client Component here */}
                <ContactForm />
                
            </div>
        </div>
    );
}
