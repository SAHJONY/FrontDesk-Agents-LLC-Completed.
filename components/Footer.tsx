// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    // Footer uses the primary dark color and cinematic look
    <footer className="bg-primary-900 text-white mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-300">FrontDesk Agents LLC</h3>
            <p className="text-sm text-gray-400">
              The future of enterprise customer service, powered by advanced AI.
            </p>
            <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          {/* Column 2: Product & Learn */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/product" className="text-gray-300 hover:text-white transition">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-300 hover:text-white transition">Pricing Tiers</Link></li>
              <li><Link href="/demo" className="text-gray-300 hover:text-white transition">Live Demo</Link></li>
              <li><Link href="/ai-agents" className="text-gray-300 hover:text-white transition">Agent Types</Link></li>
            </ul>
          </div>

          {/* Column 3: Company & Trust */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link href="/cases" className="text-gray-300 hover:text-white transition">Case Studies</Link></li>
              <li><Link href="/contact-sales" className="text-gray-300 hover:text-white transition">Contact</Link></li>
              <li><Link href="/support" className="text-gray-300 hover:text-white transition">Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Policy (CRITICAL FOR TRUST) */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/legal/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/legal/security" className="text-gray-300 hover:text-white transition">Security & Compliance</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
