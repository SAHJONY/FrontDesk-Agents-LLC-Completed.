// components/Navbar.tsx
import Link from 'next/link';

// New navigation links based on the review
const navLinks = [
  { name: 'Product & Features', href: '/product' },       // New Product Page (Priority 2)
  { name: 'Pricing', href: '/pricing' },
  { name: 'Case Studies', href: '/cases' },               // New Case Studies Page (Priority 1)
  { name: 'About Us', href: '/about' },                   // New About Us Page (Priority 2)
  { name: 'Contact Sales', href: '/contact-sales' },
];

export default function Navbar() {
  return (
    // Fixed Navbar structure with dark aesthetic and z-index for visibility
    <nav className="fixed top-0 left-0 w-full bg-primary-900/95 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Home Link */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white tracking-wider">
              FrontDesk Agents<span className="text-primary-300">.</span>
            </Link>
          </div>

          {/* Primary Navigation Links (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:bg-primary-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth & Consultation CTA (Right Side) */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition duration-150 hidden sm:block">
              Login
            </Link>
            <Link href="/demo" className="btn-primary-premium px-4 py-2 text-sm">
              Book Consultation
            </Link>
          </div>

        </div>
      </div>
      {/* Note: Mobile menu toggle/implementation omitted for brevity, but required for production UX */}
    </nav>
  );
}
