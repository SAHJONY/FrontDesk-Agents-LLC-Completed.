import { Globe, TrendingUp, Users, DollarSign } from 'lucide-react';

interface StatProps {
  label: string;
  value: string;
  subValue: string;
  icon: any;
  color: string;
}

const StatCard = ({ label, value, subValue, icon: Icon, color }: StatProps) => (
  <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
    </div>
    <p className="text-sm font-medium text-neutral-500">{label}</p>
    <h3 className="text-2xl font-bold text-neutral-900 mt-1">{value}</h3>
    <p className="text-xs text-neutral-400 mt-1">{subValue}</p>
  </div>
);

export default function GlobalRevenueStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Western Market (Tier 1)" 
        value="$42,800" 
        subValue="US, EU, CA, UK" 
        icon={DollarSign} 
        color="bg-blue-600"
      />
      <StatCard 
        label="Emerging Markets (Tier 2)" 
        value="$12,400" 
        subValue="TR, BR, MX, CO" 
        icon={TrendingUp} 
        color="bg-purple-600"
      />
      <StatCard 
        label="Growth Markets (Tier 3)" 
        value="$8,200" 
        subValue="VN, IN, PH, PK" 
        icon={Globe} 
        color="bg-emerald-600"
      />
      <StatCard 
        label="Active Global Agents" 
        value="1,240" 
        subValue="Operating in 52 languages" 
        icon={Users} 
        color="bg-neutral-900"
      />
    </div>
  );
}
