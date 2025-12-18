import Link from 'next/link'
import { 
  LayoutDashboard, Users, CreditCard, ShieldCheck, 
  Settings, Activity, Search, Gauge, Box, Megaphone 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tenants', href: '/admin/tenants', icon: Users },
  { name: 'Agentic Orchestration', href: '/admin/agentic-orchestration', icon: Box },
  { name: 'Calibration Engine', href: '/admin/calibration-engine', icon: Gauge },
  { name: 'Compliance Center', href: '/admin/compliance-center', icon: ShieldCheck },
  { name: 'SLA & Cost Monitoring', href: '/admin/sla-cost-monitoring', icon: Activity },
  { name: 'Audit Logs', href: '/admin/audit', icon: Search },
  { name: 'Billing', href: '/admin/billing', icon: CreditCard },
  { name: 'Feature Management', href: '/admin/feature-management', icon: Settings },
  { name: 'Campaigns', href: '/api/sales/campaign', icon: Megaphone },
]

export default function AdminSidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-50">
      <div className="flex h-16 items-center px-6 border-b bg-white">
        <span className="text-lg font-bold text-slate-900">FrontDesk Agents LLC</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-white hover:text-blue-600 transition-colors"
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t bg-white">
        <Link href="/settings/profile" className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  )
}
