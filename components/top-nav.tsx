I see the issue! The sed command I suggested was accidentally added to your top-nav.tsx file as text content, corrupting the file. You need to restore the original content of top-nav.tsx.

Steps to fix:

1. Remove the corrupted content from top-nav.tsx:

The file currently contains shell commands instead of React code. You need to restore it to proper TypeScript/React code.

2. Replace the content of components/top-nav.tsx with:

```typescript
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/setup', label: 'Setup' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b">
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
```

3. Also check if app/components/top-nav.tsx exists:

If you have two top-nav.tsx files (one in components/ and one in app/components/), you need to:

· Delete the corrupted one in components/
· Ensure the correct one in app/components/ has the proper import

4. Fix the import in both files:

Make sure both files have:

```typescript
import { LanguageSwitcher } from './LanguageSwitcher';
```

NOT:

```typescript
import LanguageSwitcher from './LanguageSwitcher';
```

5. Quick fix (if you have terminal access):

```bash
# Remove the corrupted file
rm components/top-nav.tsx

# Or if it's the correct location, replace with proper content
cat > components/top-nav.tsx << 'EOF'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/setup', label: 'Setup' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b">
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
EOF

# Also fix the app/components/top-nav.tsx if it exists
sed -i 's/import LanguageSwitcher from "\.\/LanguageSwitcher";/import { LanguageSwitcher } from "\.\/LanguageSwitcher";/' app/components/top-nav.tsx 2>/dev/null || true
```

After fixing the corrupted file, commit and push the changes. Your build should work then!
