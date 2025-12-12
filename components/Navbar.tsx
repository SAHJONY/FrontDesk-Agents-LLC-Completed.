// components/Navbar.tsx

"use client"; // Essential if your Navbar has any interaction (like a mobile menu)

import Link from 'next/link';
// Adjust your imports as necessary (e.g., for icons)

export const Navbar = () => {
    return (
        // 🌟 CRITICAL: Fixed dark header with high z-index
        <header className="fixed top-0 left-0 w-full z-50 bg-primary-900 shadow-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                
                    {/* Logo/Brand Name: White text for high contrast */}
                    <Link href="/" className="text-xl font-extrabold text-white tracking-tight hover:text-primary-300 transition-colors">
                        FrontDesk Agents
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/solutions" className="text-gray-300 hover:text-white font-medium transition duration-150">Solutions</Link>
                        <Link href="/pricing" className="text-gray-300 hover:text-white font-medium transition duration-150">Pricing</Link>
                        <Link href="/dashboard" className="text-gray-300 hover:text-white font-medium transition duration-150">Dashboard</Link>
                        {/* Final CTA Button - uses primary button styling with white border/text for the dark background */}
                        <Link href="/login" className="btn-secondary-premium px-4 py-1.5 text-sm bg-transparent border-white text-white hover:bg-white/10">
                            Login
                        </Link>
                    </nav>
                    
                    {/* Mobile Menu Icon (White) */}
                    <button className="md:hidden text-white">
                        {/* Actual Hamburger Icon code would go here */}
                    </button>
                </div>
            </div>
        </header>
    );
};
