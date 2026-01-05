# Integration Steps (Copy/Paste)

## 1) Import styles
Add this to your `app/globals.css`:

```css
@import "@/styles/frontdesk-nav.css";
```

If your setup does not allow CSS imports inside CSS, instead copy the contents of:
- `styles/frontdesk-nav.css`
into your global stylesheet.

## 2) Add the nav to your layout
Example for App Router:

```tsx
// app/layout.tsx OR app/(marketing)/layout.tsx
import TopNav from "@/components/TopNav";
import "./globals.css";

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

## 3) Ensure auth routes exist
The nav expects:
- `/signup`
- `/login`