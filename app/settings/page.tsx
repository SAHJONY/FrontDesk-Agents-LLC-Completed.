// ./app/settings/page.tsx

'use client';

import { Cog6ToothIcon, UserCircleIcon, KeyIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Link from 'next/link'; // <-- CORRECTED: Added Link import

export default function SettingsPage() {
    const [apiKey, setApiKey] = useState('********************gH7k');

    const generateNewKey = () => {
        // Mock key generation logic
        setApiKey(`********************${Math.random().toString(36).substring(2, 6)}`);
        alert("New API key generated. Please update all integrations immediately.");
    };

    return (
        <main className="p-6 md:p-10 max-w-4xl mx-auto bg-gray-50 min-h-screen">
            
            <div className="border-b-2 pb-4 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                    <Cog6ToothIcon className="w-8 h-8 mr-3 text-indigo-600" />
                    Client Account Settings
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Manage profile details, security credentials, and API integration keys.
                </p>
            </div>

            <div className="space-y-10">
                
                {/* 1. Profile and General */}
                <section className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                        <UserCircleIcon className="w-6 h-6 mr-2 text-gray-600" /> General Profile
                    </h2>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Company Name</span>
                            <input type="text" defaultValue="Enterprise POV Client" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Primary Contact Email</span>
                            <input type="email" defaultValue="executive@clientpov.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"/>
                        </label>
                        <button className="mt-3 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
                            Save Profile Changes
                        </button>
                    </div>
                </section>
                
                {/* 2. API Key Management */}
                <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                        <KeyIcon className="w-6 h-6 mr-2 text-blue-600" /> API & Integration Keys
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Use this key for connecting to your CRM (HubSpot/Salesforce) and other core systems. Treat this key as a password.
                    </p>
                    <div className="flex space-x-3 items-center">
                        <input 
                            type="text" 
                            readOnly 
                            value={apiKey} 
                            className="flex-grow rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100 text-sm font-mono"
                        />
                        <button onClick={generateNewKey} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700">
                            Regenerate Key
                        </button>
                    </div>
                </section>

                {/* 3. Security */}
                <section className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                        <LockClosedIcon className="w-6 h-6 mr-2 text-gray-600" /> Security
                    </h2>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                        Change Password
                    </button>
                    <div className="mt-4 flex items-center">
                        <input type="checkbox" id="mfa" defaultChecked={true} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                        <label htmlFor="mfa" className="ml-2 text-gray-700">Enable Multi-Factor Authentication (MFA)</label>
                    </div>
                </section>

                {/* Billing Link */}
                <div className="text-center pt-4 border-t">
                    <Link href="/settings/billing" className="text-lg font-medium text-indigo-600 hover:text-indigo-800">
                        Go to Billing & Subscription Management →
                    </Link>
                </div>
            </div>
        </main>
    );
}
