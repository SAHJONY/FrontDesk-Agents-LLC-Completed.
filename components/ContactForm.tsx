// components/ContactForm.tsx
"use client"; // CRITICAL: This line makes it a Client Component

import React, { useState } from 'react';

export default function ContactForm() {
    // We can now use state and define interactive functions here
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Add your actual API submission logic here
    };
    
    // Add a simple change handler to use with the inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Field: Full Name */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                    id="fullName"
                    type="text" 
                    placeholder="Full Name" 
                    className="input-premium" // Uses the premium class
                    onChange={handleChange}
                    value={formData.fullName}
                    required
                />
            </div>

            {/* Input Field: Work Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input 
                    id="email"
                    type="email" 
                    placeholder="Work Email" 
                    className="input-premium" 
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
            </div>

            {/* Input Field: Company */}
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input 
                    id="company"
                    type="text" 
                    placeholder="Company Name" 
                    className="input-premium" 
                    onChange={handleChange}
                    value={formData.company}
                    required
                />
            </div>

            {/* Input Field: Message/Inquiry */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                    id="message"
                    placeholder="Your Inquiry Details" 
                    rows={4}
                    className="input-premium" 
                    onChange={handleChange}
                    value={formData.message}
                    required
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4"> 
                <button 
                    type="submit" 
                    className="btn-primary-premium w-full"
                >
                    Submit Inquiry
                </button>
            </div>

        </form>
    );
}
