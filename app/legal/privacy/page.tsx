// ./app/legal/privacy/page.tsx

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-navy-dark)] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-extrabold mb-4 text-[var(--color-primary)]">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Effective Date: December 14, 2025</p>

        <section className="space-y-6 text-gray-300">
          <p>
            FrontDesk Agents LLC ("we," "us," or "our") is committed to protecting the privacy of our clients and the data collected through the SARA AI services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
          </p>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>**Client Account Data:** Name, email address, payment information, and billing details.</li>
                <li>**Automation Data:** Configuration settings, business logic, and knowledge base documents uploaded by the client.</li>
                <li>**Call Log Data:** Transcripts, recordings, duration, and disposition of calls handled by SARA AI (owned by the client, stored by us).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">2. How We Use Information</h2>
            <p>
              We use the collected information primarily to provide, maintain, and improve the SARA AI service, process transactions, manage client subscriptions, and analyze service usage to enhance our AI models and operational efficiency. We do not sell Call Log Data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">3. Data Security</h2>
            <p>
              We implement industry-standard security measures, including encryption and access controls, to protect your data from unauthorized access, alteration, disclosure, or destruction. Call Log Data is stored in secure, geographically isolated environments.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white">4. Data Ownership and Retention</h2>
            <p>
              The client maintains full ownership of all Call Log Data and Automation Data. We retain this data for the duration of the client's active subscription and for a limited period thereafter, as required by law or necessary for backup purposes. Clients can request data deletion upon account termination.
            </p>
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-gray-500">
          If you have questions regarding this Privacy Policy, please contact our support team.
        </p>
      </div>
    </div>
  );
}
