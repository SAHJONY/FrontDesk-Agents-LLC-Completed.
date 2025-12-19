// app/legal/_components/TableOfContents.tsx
// Minimal, production-safe Table of Contents component

import React from "react";

type TocItem = {
  id: string;
  label: string;
};

type TableOfContentsProps = {
  items?: TocItem[];
};

export default function TableOfContents({
  items = [],
}: TableOfContentsProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
