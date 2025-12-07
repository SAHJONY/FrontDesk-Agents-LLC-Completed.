// components/top-nav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Bookings", href: "/bookings" },
    { name: "Guests", href: "/guests" },
    { name: "Rooms", href: "/rooms" },
    { name: "Staff", href: "/staff" },
    { name: "Reports", href: "/reports" },
  ];

  const MenuIcon = () => (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const SearchIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const BellIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo + botón menú móvil */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>

              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <div className="relative h-8 w-8">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-600">
                      <span className="text-lg font-bold text-white">F</span>
                    </div>
                  </div>
                  <span className="ml-3 hidden text-xl font-bold text-gray-900 sm:block">
                    FrontDesk<span className="text-blue-600">Agents</span>
                  </span>
                </Link>
              </div>

              {/* Navegación desktop */}
              <div className="hidden lg:ml-10 lg:block">
                <div className="flex space-x-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Lado derecho */}
            <div className="flex items-center space-x-4">
              {/* Search desktop */}
              <div className="relative hidden md:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon />
                </div>
                <input
                  type="search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>

              {/* Notificaciones */}
              <button className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100">
                <BellIcon />
                <span className="absolute right-1 top-1 block h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Menú usuario */}
              <div className="relative">
                <button className="flex items-center space-x-3 rounded-lg p-1 hover:bg-gray-100">
                  <div className="relative h-8 w-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 border-t border-gray-200 px-2 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    pathname === link.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Barra de búsqueda móvil */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search bookings, guests, rooms..."
          />
        </div>
      </div>
    </>
  );
};

export default TopNav;
