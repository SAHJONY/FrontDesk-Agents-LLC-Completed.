// components/Navbar.tsx (Styling Update)
import Link from 'next/link';

export const Navbar = () => {
  return (
    // Applied dark corporate colors for a premium, fixed header
    <header className="fixed top-0 left-0 w-full z-50 bg-primary-900 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand Name: White text for high contrast */}
          <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
            FrontDesk Agents
          </Link>

          {/* Navigation Links: Light gray for subtlety, white on hover */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/solutions" className="text-gray-300 hover:text-white font-medium transition duration-150">
              Solutions
            </Link>
            {/* ... other links (Pricing, About, etc.) ... */}
          </nav>
          
          {/* Mobile Menu Icon (White) */}
          <button className="md:hidden text-white">
            {/* Hamburger Icon Placeholder */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">...</svg>
          </button>
        </div>
      </div>
    </header>
  );
};
