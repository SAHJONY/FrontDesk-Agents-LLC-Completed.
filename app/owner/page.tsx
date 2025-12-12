// app/dashboard/owner/page.tsx
"use client";

import React, { useState } from 'react';
import { Cog6ToothIcon, CodeBracketSquareIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function OwnerCommandCenterPage() {
    const [apiKey, setApiKey] = useState('********************');
    const [webhookUrl, setWebhookUrl] = useState('https://api.frontdeskagents.com/aura/telephony-webhook'); 
    const [scriptId, setScriptId] = useState('AURA-SCRIPT-924A-V3'); 
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveConfiguration = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        console.log("Saving AURA™ Core API configuration...");
        // In a real application, this would securely call an internal API to update environment variables.
        setTimeout(() => {
            alert("AURA™ Core API Configuration Saved Successfully!");
            setIsSaving(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <Cog6ToothIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Owner Command Center
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Manage Global Configurations and API Integrations for the **AURA™ Core Telephony Engine**.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-premium border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3 flex items-center">
                        <ServerStackIcon className="h-6 w-6 text-primary-600 mr-2" />
                        AURA™ Core API Configuration
                    </h2>
                    
                    {/* Trigger a diagram to help visualize the internal data flow */}
                    

                    <form onSubmit={handleSaveConfiguration} className="space-y-6">
                        
                        {/* 1. API Key Management (Internal) */}
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                                AURA™ Core API Key (Internal/Private)
                            </label>
                            <input
                                type="text"
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                required
                                readOnly
                                className="input-premium bg-gray-100 italic cursor-not-allowed"
                            />
                            <p className="mt-2 text-xs text-red-500">
                                Warning: API key is masked and should be managed securely via environment variables.
                            </p>
                        </div>

                        {/* 2. Webhook URL (Data Flow) */}
                        <div>
                            <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">
                                Agent Event Webhook Endpoint
                            </label>
                            <input
                                type="url"
                                id="webhookUrl"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                required
                                className="input-premium"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                This is the endpoint where the AI Telephony Engine sends call transcripts and captured data back to the FrontDesk Agents platform.
                            </p>
                        </div>

                        {/* 3. Script/Model Selection */}
                        <div>
                            <label htmlFor="scriptId" className="block text-sm font-medium text-gray-700">
                                Active Conversational Script ID
                            </label>
                            <input
                                type="text"
                                id="scriptId"
                                value={scriptId}
                                onChange={(e) => setScriptId(e.target.value)}
                                required
                                className="input-premium"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                The unique ID of the proprietary script used by the AI agent for customer interactions.
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`btn-primary-premium w-full py-3 ${isSaving ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isSaving ? 'Saving...' : 'Save and Deploy AURA™ Core Config'}
                        </button>
                    </form>
                    
                    <div className="mt-8 pt-4 border-t border-gray-200">
                         <Link href="/dashboard/settings" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center">
                            <CodeBracketSquareIcon className="h-4 w-4 mr-1" />
                            Access Advanced Model Fine-Tuning Settings →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
