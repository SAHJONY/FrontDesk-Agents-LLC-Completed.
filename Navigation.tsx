import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          FrontDesk Agents
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Demo</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
