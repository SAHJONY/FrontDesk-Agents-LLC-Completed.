'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/retention', label: 'Retention' },
  { href: '/setup', label: 'Setup' },
  { href: '/outbound', label: 'Outbound' },
  { href: '/industries', label: 'Industries' },
  { href: '/support', label: 'Support' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/solutions/law', label: 'Solutions • Law' },
  { href: '/legal', label: 'Legal' },
  { href: '/admin', label: 'Admin' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r border-border bg-card md:block">
      <div className="px-5 py-5">
        <div className="text-sm font-semibold tracking-wide">FrontDesk Agents</div>
        <div className="mt-1 text-xs text-muted-foreground">Command Center</div>
      </div>

      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    'block rounded-md px-3 py-2 text-sm transition',
                    active ? 'bg-muted font-medium' : 'hover:bg-muted/60',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
