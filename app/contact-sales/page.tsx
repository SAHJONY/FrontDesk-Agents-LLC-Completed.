// app/contact-sales/page.tsx
import Link from 'next/link';

export default function ContactSalesPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center py-20">
      <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Enterprise Inquiries
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your interest in our Enterprise solution. Please fill out the form below, and a dedicated sales manager will contact you within one business day.
        </p>

        {/* Placeholder for a future Contact Form */}
        <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-gray-700 font-semibold mb-4">
                [Form component will go here later]
            </p>
            <p className="text-sm text-gray-500">
                For now, please call us directly at: <strong className="text-green-600">(800) 555-1234</strong>
            </p>
        </div>

        <Link href="/pricing" className="mt-8 inline-block">
          <button className="px-6 py-3 text-base font-semibold rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition duration-300 shadow-md">
            Return to Pricing
          </button>
        </Link>
      </div>
    </main>
  );
}
