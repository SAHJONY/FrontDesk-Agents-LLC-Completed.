// app/settings/subscription/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    CreditCardIcon, 
    RocketLaunchIcon, 
    ArrowPathIcon,
    ShieldCheckIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

// Mock Subscription Data
const currentPlan = {
    name: 'Enterprise Elite',
    price: '$4,999',
    features: ['Unlimited AI Agents', 'Priority Support', 'Custom Model Tuning', 'Dedicated Telephony Trunk'],
    billingCycle: 'Monthly',
    nextBillingDate: 'January 12, 2026',
};

const upgradePlan = {
    name: 'Titanium Pro',
    price: '$7,999',
    description: 'Includes multi-regional deployment and dedicated compliance auditing.',
};

export default function SubscriptionManagementPage() {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdatePayment = () => {
        setIsUpdating(true);
        console.log("Initiating secure payment method update via Stripe portal...");
        
        setTimeout(() => {
            alert("Redirecting to secure portal for Payment Method Update. (Simulation Complete)");
            setIsUpdating(false);
        }, 1500);
    };

    const handleUpgrade = () => {
        if (window.confirm(`Are you sure you want to upgrade to the ${upgradePlan.name} plan for ${upgradePlan.price}/month?`)) {
            setIsUpdating(true);
            console.log("Processing plan upgrade...");
            setTimeout(() => {
                alert(`Upgrade to ${upgradePlan.name} successful! Changes effective immediately.`);
                window.location.reload(); 
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <RocketLaunchIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Subscription & Billing Management
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Manage your **AURA™ Core** service plan and payment details securely.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 space-y-10">
                    
                    {/* Current Plan Overview */}
                    <div className="border-b pb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentPlan.name} Plan</h2>
                        <div className="flex items-end justify-between">
                            <p className="text-5xl font-extrabold text-primary-600">{currentPlan.price}</p>
                            <p className="text-lg font-medium text-gray-600">/{currentPlan.billingCycle}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Next Billing Date: **{currentPlan.nextBillingDate}**</p>
                    </div>

                    {/* Features and Details */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-600" />
                                Plan Inclusions
                            </h3>
                            <ul className="space-y-2 text-gray-600">
                                {currentPlan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Payment Method */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                <CreditCardIcon className="h-5 w-5 mr-2 text-purple-600" />
                                Payment Method
                            </h3>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                                <p className="text-sm font-medium text-gray-900">Visa ending in **** 4242</p>
                                <p className="text-xs text-gray-600">Expires 08/2028</p>
                            </div>
                            <button
                                onClick={handleUpdatePayment}
                                disabled={isUpdating}
                                className={`btn-secondary-premium mt-4 w-full py-2 ${isUpdating ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                <ArrowPathIcon className="h-5 w-5 inline-block mr-2" />
                                Update Payment Method
                            </button>
                        </div>
                    </div>

                    {/* Upgrade Section */}
                    <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Upgrade Available</h3>
                        <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xl font-bold text-blue-800">{upgradePlan.name} - {upgradePlan.price}/mo</p>
                                <p className="text-sm text-blue-700 mt-1">{upgradePlan.description}</p>
                            </div>
                            <button
                                onClick={handleUpgrade}
                                disabled={isUpdating}
                                className={`btn-primary-premium bg-blue-600 hover:bg-blue-700 py-3 ml-4 ${isUpdating ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/dashboard/operational-overview" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        ← Return to Operational Command Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
