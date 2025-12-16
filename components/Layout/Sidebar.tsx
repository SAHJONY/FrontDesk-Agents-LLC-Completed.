// ./components/Layout/Sidebar.tsx

import Link from 'next/link';
import { 
    HomeIcon, 
    ChartBarIcon, 
    UserGroupIcon, 
    ShieldCheckIcon,
    ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Métricas', href: '/admin/metrics', icon: ChartBarIcon },
    { name: 'Usuarios', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Compliance', href: '/admin/compliance-center', icon: ShieldCheckIcon },
];

// Exportación con nombre
export function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-[#111827] text-white border-r border-gray-700 p-4 flex flex-col">
            <div className="text-2xl font-bold mb-8 text-cyan-400">
                FrontDesk Admin
            </div>
            <nav className="flex-grow space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.name} href={item.href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-150">
                            <Icon className="w-6 h-6" />
                            <span className="text-base">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="pt-4 border-t border-gray-700">
                <Link href="/logout" className="flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-gray-700 transition duration-150">
                    <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
                    <span className="text-base">Cerrar Sesión</span>
                </Link>
            </div>
        </aside>
    );
}
