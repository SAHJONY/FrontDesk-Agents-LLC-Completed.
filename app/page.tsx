// app/page.tsx
import { redirect } from 'next/navigation';

// This page redirects the root path (/) to the English localized path (/en)
export default function RootPage() {
  redirect('/en');
}
