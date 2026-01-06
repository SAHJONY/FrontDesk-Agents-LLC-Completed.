import Link from 'next/link';

export default function Sidebar({ isOwner }: { isOwner: boolean }) {
  return (
    <nav className="w-64 bg-gray-900 text-white h-screen p-4">
      <div className="text-xl font-bold mb-8">FrontDesk Agents</div>
      <div className="space-y-2">
        <Link href="/dashboard" className="block p-2 hover:bg-gray-800 rounded">Dashboard</Link>
        <Link href="/dashboard/agents" className="block p-2 hover:bg-gray-800 rounded">AI Agents</Link>
        {/* Owner Only Section */}
        {isOwner && (
          <div className="mt-8 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-2">OWNER ACCESS</p>
            <Link href="/admin/tenants" className="block p-2 hover:bg-blue-900 rounded">Global Tenants</Link>
            <Link href="/owner/onboarding" className="block p-2 hover:bg-blue-900 rounded">Platform Settings</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
