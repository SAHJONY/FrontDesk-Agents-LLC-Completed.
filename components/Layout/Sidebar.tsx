export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-6">
      <nav className="space-y-4">
        <a href="/admin" className="block">Dashboard</a>
        <a href="/admin/compliance-center" className="block">Compliance Center</a>
      </nav>
    </aside>
  );
}
