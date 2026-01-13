# FrontDesk Agents — Customer UX Pack (Drop-in)

This pack improves:
- Customer navigation (top nav with mobile hamburger + dropdown)
- Language choice (EN/ES toggle using a cookie)
- Auth entry points (consistent CTA buttons for Sign up / Login)

## What this pack DOES (and does not) do
✅ Adds *new* files only (safe to upload).  
✅ Works with Next.js App Router and any existing layout.  
✅ No new dependencies required.  

❌ Does not automatically modify your existing files (layout/middleware).
You’ll integrate by importing the components where you want them.

## Quick install (3 minutes)
1) Copy folders into your repo root:
   - `components/`
   - `lib/i18n/`
   - `styles/`
   - `docs/`

2) Add the nav to your main marketing layout (example):
```tsx
// app/layout.tsx  OR  app/(marketing)/layout.tsx
import TopNav from "@/components/TopNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
```

3) Import the CSS (details in docs/INTEGRATION_STEPS.md)