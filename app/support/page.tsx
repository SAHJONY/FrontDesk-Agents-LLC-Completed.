// ./app/support/page.tsx

import { ChatBubbleLeftRightIcon, BookOpenIcon, PhoneArrowUpRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto bg-white min-h-screen">
      
      <div className="border-b-2 pb-4 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <InformationCircleIcon className="w-8 h-8 mr-3 text-indigo-600" />
          Enterprise Support Center
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Get immediate assistance, find documentation, or connect with our dedicated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact/Chat Support */}
        <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <ChatBubbleLeftRightIcon className="w-10 h-10 text-indigo-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Live Agent Support</h2>
          <p className="mt-2 text-gray-600">
            For critical issues, start a chat or request a callback with your dedicated account manager.
          </p>
          <button className="mt-4 w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
            Start Live Chat
          </button>
        </div>

        {/* Documentation/FAQ */}
        <Link href="/docs" className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow block">
          <BookOpenIcon className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Documentation & FAQs</h2>
          <p className="mt-2 text-gray-600">
            Access technical API guides, setup tutorials, and frequently asked questions for all AI Agents.
          </p>
          <span className="mt-4 text-sm font-medium text-blue-600 block">
            View Knowledge Base →
          </span>
        </Link>
        
        {/* Phone Contact */}
        <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <PhoneArrowUpRightIcon className="w-10 h-10 text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Direct Contact</h2>
          <p className="mt-2 text-gray-600">
            Call our support line for immediate assistance with system outages or configuration help.
          </p>
          <p className="mt-4 text-lg font-bold text-green-700">
            +1 (216) 480-4413
          </p>
        </div>

      </div>

      {/* System Status Banner */}
      <div className="mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-md">
        <div className="flex items-center">
          <InformationCircleIcon className="w-5 h-5 mr-3 flex-shrink-0" />
          <p className="text-sm font-medium">
            System Status: All services operational. <a href="/status" className="underline hover:text-yellow-900">View Status Page</a>
          </p>
        </div>
      </div>
    </main>
  );
}
