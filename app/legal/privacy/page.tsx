// ./app/legal/privacy/page.tsx

import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto">
      
      {/* Header matching professional theme */}
      <div className="border-b-2 pb-4 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <ShieldCheckIcon className="w-8 h-8 mr-3 text-indigo-600" />
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">Last Updated: December 13, 2025</p>
      </div>

      <div className="flex space-x-6 mb-8 text-indigo-600 font-semibold">
        <a href="/legal/terms" className="hover:text-indigo-800 pb-1">Terms of Service</a>
        <a href="/legal/privacy" className="hover:text-indigo-800 border-b-2 border-indigo-600 pb-1">Privacy Policy</a>
        <a href="/legal/compliance" className="hover:text-indigo-800 pb-1">Compliance & Audit</a>
      </div>

      <section className="space-y-6 text-gray-700">
        
        <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
        <p>
          We collect information that identifies, relates to, describes, or is capable of being associated with you ("Personal Data").
        </p>
        
        <h3 className="text-xl font-semibold text-gray-900">1.1. Account and Usage Data</h3>
        <p className="text-sm">
          This includes names, email addresses, billing information, and usage metrics related to the AI automation platform (e.g., number of calls handled, conversion rates, and API usage).
        </p>
        
        <h3 className="text-xl font-semibold text-gray-900">1.2. Call Data (Client Data)</h3>
        <p className="text-sm">
          All call transcripts, recordings, and metadata processed by our AI Agents are considered Client Data. This data is handled strictly according to the client's configuration and the executed Master Service Agreement (MSA) and is used solely to improve the client's specific AI models.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
        <p>
          We use the collected data to provide, maintain, and improve our Service, to process billing and payments, and to ensure security and compliance. We do not sell Client Data or Personal Data.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">3. Data Security and Storage</h2>
        <p>
          We implement enterprise-grade security measures, including encryption and strict access controls, to protect your Personal Data and Client Data against unauthorized access. Data is stored in secure, certified data centers.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">4. Contacting Us</h2>
        <p>
          If you have questions regarding this Privacy Policy or your data rights, please contact us:
        </p>
        <p className="font-medium">
          FrontDesk Agents LLC <br />
          Email: <a href="mailto:privacy@frontdeskagents.com" className="text-indigo-600 hover:underline">privacy@frontdeskagents.com</a> <br />
          Phone: +1 (216) 480-4413
        </p>
      </section>
      
      {/* Footer Link */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            ← Return to Dashboard
        </a>
      </div>
    </main>
  );
}
