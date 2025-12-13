"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Iconos de menú

// New navigation links based on the review
const navLinks = [
  { name: 'Product & Features', href: '/product' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Case Studies', href: '/cases' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Sales', href: '/contact-sales' },
];

export default function Navbar() {
  // Estado para manejar el menú móvil (requiere "use client")
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Auth & Consultation CTA (Right Side - Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-300 hover:text-white text-sm font-medium transition duration-150"
            >
              Login
            </Link>
            <Link 
              href="/demo" 
              className="btn-primary-premium px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-md font-semibold"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button (Requiere onClick y estado) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (Hidden by default, shown when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Auth Links */}
            <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-t border-gray-700 mt-2 pt-2"
            >
                Login
            </Link>
            <Link
                href="/demo"
                onClick={() => setIsOpen(false)}
                className="w-full text-center mt-2 py-2 px-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 block"
            >
                Book Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
