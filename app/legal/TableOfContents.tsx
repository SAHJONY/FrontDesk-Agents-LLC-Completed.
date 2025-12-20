'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
}

export default function TableOfContents({ items = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all headings
    const headings = document.querySelectorAll('h2[id], h3[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) {
    // Auto-generate from DOM if no items provided
    useEffect(() => {
      const headings = Array.from(
        document.querySelectorAll('h2[id], h3[id]')
      ).map((heading) => ({
        id: heading.id,
        title: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3,
      }));
      
      if (headings.length > 0 && items.length === 0) {
        // This would need to be handled by parent component in real implementation
      }
    }, []);
  }

  return (
    <nav className="sticky top-24 space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`group flex items-start gap-2 text-sm w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                activeId === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              } ${item.level === 3 ? 'pl-6' : ''}`}
            >
              <ChevronRight
                className={`w-4 h-4 mt-0.5 transition-transform ${
                  activeId === item.id ? 'rotate-90' : ''
                }`}
              />
              <span className="flex-1">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
