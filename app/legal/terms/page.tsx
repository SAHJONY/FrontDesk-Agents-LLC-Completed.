// ./app/legal/terms/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | FrontDesk Agents LLC',
  description: 'Operating terms and conditions for SARA AI and FrontDesk Agents LLC.',
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-400 font-medium">
            Last Updated: <time dateTime="2025-12-19">December 19, 2025</time>
          </p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">
          <p>
            Welcome to FrontDesk Agents LLC. By accessing or using SARA AI, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              1. Service Description
            </h2>
            <p>
              FrontDesk Agents LLC provides AI-driven telephony and automation services via the SARA AI platform. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              2. Acceptable Use
            </h2>
            <p>You agree not to use SARA AI for:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Engaging in illegal telemarketing or "robocalling" practices in violation of TCPA or local laws.</li>
              <li>Impersonating individuals without consent or engaging in fraudulent activities.</li>
              <li>Attempting to reverse-engineer the AI models or bypass service rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              3. Fees and Payment
            </h2>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable unless otherwise stated. Failure to maintain an active payment method may result in immediate suspension of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              4. AI Limitations and Liability
            </h2>
            <p>
              SARA AI is an automated system. While we strive for 99.9% accuracy, we do not guarantee that the AI will always provide correct information or handle every call perfectly. FrontDesk Agents LLC is not liable for business losses resulting from AI errors or service downtime.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
              5. Termination
            </h2>
            <p>
              Either party may terminate the agreement at any time. Upon termination, your right to use SARA AI will cease immediately. Data retention following termination is governed by our <Link href="/legal/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link>.
            </p>
          </section>
        </article>

        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            By using our services, you acknowledge that you have read and understood these terms.
          </p>
        </footer>
      </div>
    </main>
  );
}
