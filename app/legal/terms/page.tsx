// ./app/legal/terms/page.tsx

import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[var(--color-navy-dark)] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-extrabold mb-4 text-[var(--color-primary)]">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last Updated: December 14, 2025</p>

        <section className="space-y-6 text-gray-300">
          <p>
            Welcome to FrontDesk Agents LLC. By accessing or using our services, including SARA AI, the Command Center Dashboard, and related APIs, you agree to be bound by these Terms of Service ("Terms"). These Terms govern your access and use of all services provided by FrontDesk Agents LLC.
          </p>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">1. Use of SARA AI Agents</h2>
            <p>
              The SARA AI agents are provided for automated customer interaction, sales, and support functions as configured by the client via the Automations Workflow Creator. You are responsible for ensuring that the configuration and use of SARA AI comply with all applicable local, state, and federal laws, including, but not limited to, call recording and data privacy regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">2. Billing and Subscription</h2>
            <p>
              Services are billed on a monthly subscription basis as detailed on your billing page. Failure to pay subscription fees may result in the suspension or termination of your access to SARA AI agents and the Command Center Dashboard. All fees are non-refundable unless otherwise specified in your service level agreement (SLA).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">3. Intellectual Property</h2>
            <p>
              All content, technology, and proprietary systems, including the SARA AI core model and the Command Center UI, are the exclusive property of FrontDesk Agents LLC. The client retains ownership of all data provided to train the AI and all conversation logs generated through the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">4. Limitation of Liability</h2>
            <p>
              FrontDesk Agents LLC is not liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the services. The maximum liability shall not exceed the total fees paid by the client for the three months preceding the event giving rise to the claim.
            </p>
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-gray-500">
          By continuing to use our service, you acknowledge that you have read and agree to these terms.
        </p>
      </div>
    </div>
  );
}
