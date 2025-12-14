// ./app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    // Uses the dark, high-contrast background similar to the images
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-8">
      
      <div className="text-center p-10 bg-gray-800 rounded-xl border border-blue-900/50 shadow-2xl">
        <h1 className="text-9xl font-extrabold text-blue-600">
          404
        </h1>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Connection Lost
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-md">
          The requested data route could not be found. The AI Agent seems to have lost track of that URL.
        </p>
        
        <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          
          {/* Primary Action Button */}
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Return to Dashboard
          </Link>

          {/* Secondary Action Link */}
          <Link 
            href="/support" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150"
          >
            Contact Support
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-500">
            FrontDesk Agents LLC - www.frontdeskagents.com
        </p>
      </div>
    </div>
  );
}
