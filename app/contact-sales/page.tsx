// app/contact-sales/page.tsx

import React from 'react';

// Define the component function and use the mandatory 'export default'
export default function ContactSalesPage() {

    // Placeholder function for form submission logic
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted");
        // Add your actual form submission/API logic here
    };

    return (
        // 1. Corporate Layout Structure (for consistent spacing)
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-premium">
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Initiate a Strategic Inquiry
                </h1>
                <p className="text-gray-600 mb-8">
                    Connect with our strategic advisors to discuss enterprise solutions.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Input Field: Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            id="fullName"
                            type="text" 
                            placeholder="Full Name" 
                            // 🌟 Apply the new premium input style
                            className="input-premium" 
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
                            // 🌟 Apply the new premium input style
                            className="input-premium" 
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
                            // 🌟 Apply the new premium input style
                            className="input-premium" 
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
                            // 🌟 Apply the new premium input style
                            className="input-premium" 
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4"> 
                        <button 
                            type="submit" 
                            // 🌟 Apply the new primary button style
                            className="btn-primary-premium w-full"
                        >
                            Submit Inquiry
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
