import { Metadata } from 'next';
import { Clock, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Coming Soon | FrontDesk Agents LLC',
  description: 'We are performing scheduled maintenance. We will be back shortly.',
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo or Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            FrontDesk Agents LLC
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
            <Clock className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            We'll Be Right Back!
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Our AI-powered front desk system is currently undergoing scheduled maintenance 
            to bring you even better service. We appreciate your patience.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Upgrading Infrastructure
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Need Immediate Assistance?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="mailto:support@frontdeskagents.com"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email Us</p>
                <p className="font-medium text-gray-900 dark:text-white">support@frontdeskagents.com</p>
              </div>
            </a>
            
            <a 
              href="tel:+1234567890"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Call Us</p>
                <p className="font-medium text-gray-900 dark:text-white">+1 (234) 567-890</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Expected return: Within the next few hours
        </p>
      </div>
    </div>
  );
}
