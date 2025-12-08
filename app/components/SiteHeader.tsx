// app/components/SiteHeader.tsx
"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              FrontDesk<span className="text-blue-600">Agents</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/bookings" className="text-gray-700 hover:text-blue-600 font-medium">
              Bookings
            </Link>
            <Link href="/guests" className="text-gray-700 hover:text-blue-600 font-medium">
              Guests
            </Link>
            <Link href="/rooms" className="text-gray-700 hover:text-blue-600 font-medium">
              Rooms
            </Link>
            <Link href="/staff" className="text-gray-700 hover:text-blue-600 font-medium">
              Staff
            </Link>
          </nav>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </header>
  );
}
