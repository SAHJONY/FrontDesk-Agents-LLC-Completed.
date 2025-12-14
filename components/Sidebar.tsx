'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  PhoneIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-white shadow-lg shadow-cyan-500/20'
          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <Icon
        className={`w-5 h-5 transition-all ${
          isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-400'
        }`}
      />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      )}
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'AI Automations', href: '/automations', icon: PhoneIcon },
    { name: 'Client Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Legal Center', href: '/legal/terms', icon: BookOpenIcon },
    { name: 'Support & Help', href: '/support', icon: QuestionMarkCircleIcon },
  ];

  const isActive = (path: string): boolean => {
    if (!pathname) return false;
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-72 bg-[#0a1929]/95 backdrop-blur-xl border-r border-white/10">
      <div className="flex flex-col h-full">
        {/* SARA Status Card */}
        <div className="p-6 border-b border-white/10">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">SARA AI</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Active</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-300">
              Contact: <span className="text-cyan-400 font-medium">+1 (216) 480-4413</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              href={item.href}
              icon={item.icon}
              label={item.name}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <UserCircleIcon className="w-5 h-5" />
            <span className="font-medium">My Profile</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
