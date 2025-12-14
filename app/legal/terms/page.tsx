// ./app/legal/terms/page.tsx

import { ScaleIcon } from '@heroicons/react/24/outline';

export default function TermsOfServicePage() {
  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto">
      
      {/* Header matching image theme */}
      <div className="border-b-2 pb-4 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <ScaleIcon className="w-8 h-8 mr-3 text-indigo-600" />
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-500">Last Updated: December 13, 2025</p>
      </div>

      <div className="flex space-x-6 mb-8 text-indigo-600 font-semibold">
        <a href="/legal/terms" className="hover:text-indigo-800 border-b-2 border-indigo-600 pb-1">Terms of Service</a>
        <a href="/legal/privacy" className="hover:text-indigo-800 pb-1">Privacy Policy</a>
        <a href="/legal/compliance" className="hover:text-indigo-800 pb-1">Compliance & Audit</a>
      </div>

      <section className="space-y-6 text-gray-700">
        
        <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by FrontDesk Agents LLC ("FrontDesk Agents," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">2. Service Description: AI Automation</h2>
        <p>
          FrontDesk Agents provides intelligent automation services, including but not limited to 24/7 AI Receptionist, Automatic Scheduling, and Lead Scoring. The Service is designed to augment human operations and is not intended to replace regulatory compliance duties.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-900">2.1. Compliance and Liability</h3>
        <p className="text-sm">
          While we provide audit logs and compliance features, the Client is solely responsible for ensuring the Service's usage meets all industry-specific regulations (e.g., HIPAA for Healthcare, TCPA for Outbound Calls, etc.).
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900">3. Enterprise POV and Billing</h2>
        <p>
          The 30-day Enterprise Proof-of-Value (POV) is subject to a tightly scoped agreement defining fixed KPIs. Conversion to an annual contract is mandatory upon successful completion or expiration of the POV unless mutually agreed upon. Billing is handled as per the executed Master Service Agreement (MSA).
        </p>

        <h2 className="text-2xl font-bold text-gray-900">4. Contact Information</h2>
        <p>
          For any questions about these Terms, please contact us at:
        </p>
        <p className="font-medium">
          FrontDesk Agents LLC <br />
          Email: <a href="mailto:support@frontdeskagents.com" className="text-indigo-600 hover:underline">support@frontdeskagents.com</a> <br />
          Phone: +1 (216) 480-4413
        </p>
      </section>
      
      {/* Footer Link */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            ← Back to Home
        </a>
      </div>
    </main>
  );
}
