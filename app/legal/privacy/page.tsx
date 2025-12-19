// ./app/legal/privacy/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | FrontDesk Agents LLC',
  description: 'Learn how FrontDesk Agents LLC and SARA AI protect your data and privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-navy-dark)] text-white selection:bg-[var(--color-primary)] selection:text-navy-dark">
      <div className="max-w-4xl mx-auto px-6 py-16 md:px-12 md:py-24">
        
        <Link 
          href="/" 
          className="text-sm text-[var(--color-primary)] hover:underline mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--color-primary)] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-400 font-medium">
            Effective Date: <time dateTime="2025-12-14">December 14, 2025</time>
          </p>
        </header>

        <article className="prose prose-invert prose-primary max-w-none space-y-8 text-gray-300 leading-relaxed">
          <p>
            FrontDesk Agents LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of our clients and the data collected through the SARA AI services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-white">Client Account Data:</strong> Name, email address, payment information, and billing details.
              </li>
              <li>
                <strong className="text-white">Automation Data:</strong> Configuration settings, business logic, and knowledge base documents uploaded by the client.
              </li>
              <li>
                <strong className="text-white">Call Log Data:</strong> Transcripts, recordings, duration, and disposition of calls handled by SARA AI (owned by the client, stored by us).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              2. How We Use Information
            </h2>
            <p>
              We use the collected information primarily to provide, maintain, and improve the SARA AI service, process transactions, manage client subscriptions, and analyze service usage to enhance our AI models and operational efficiency. 
              <span className="block mt-2 font-semibold text-[var(--color-primary)]">
                We do not sell Call Log Data to third parties.
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures, including encryption and access controls, to protect your data from unauthorized access, alteration, disclosure, or destruction. Call Log Data is stored in secure, geographically isolated environments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              4. Data Ownership and Retention
            </h2>
            <p>
              The client maintains full ownership of all Call Log Data and Automation Data. We retain this data for the duration of the client&apos;s active subscription and for a limited period thereafter, as required by law or necessary for backup purposes. Clients can request data deletion upon account termination.
            </p>
          </section>
        </article>

        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            If you have questions regarding this Privacy Policy, please contact our 
            <Link href="/support" className="text-[var(--color-primary)] hover:underline ml-1">
              support team
            </Link>.
          </p>
        </footer>
      </div>
    </main>
  );
}
