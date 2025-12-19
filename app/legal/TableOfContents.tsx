// ./app/legal/_components/TableOfContents.tsx

'use client';

import React from 'react';

interface Setting {
  id: string;
  title: string;
}

export function TableOfContents({ items }: { items: Setting[] }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="hidden lg:block fixed left-[max(2rem,calc(50%-45rem))] top-48 w-64">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
        On this page
      </p>
      <ul className="space-y-3 border-l border-gray-800 pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors text-left"
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
