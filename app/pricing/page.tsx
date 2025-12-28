import PricingCard from '@/components/PricingCard';

const plans = [
  { id: 'basic', name: 'Basic', price: 199, minutes: 500, features: ['24/7 Voice Reception', 'Basic Scheduling'] },
  { id: 'pro', name: 'Professional', price: 399, minutes: 1500, features: ['Multi-language Support', 'CRM Sync'] },
  { id: 'growth', name: 'Growth', price: 799, minutes: 4000, features: ['Dialect Adaptation', 'Autonomous Tools'] },
  { id: 'elite', name: 'Elite', price: 1499, minutes: 10000, features: ['RL-Learning Engine', 'Unlimited Fleet'] },
];

export default function PricingPage() {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
