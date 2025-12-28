import PricingCard from '../components/PricingCard'; // Using relative path for build stability

const plans = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 199, 
    minutes: 500, 
    features: ['24/7 Voice Reception', 'Sovereign Knowledge Vault (5 docs)', 'Basic Scheduling'] 
  },
  { 
    id: 'pro', 
    name: 'Professional', 
    price: 399, 
    minutes: 1500, 
    features: ['Multi-language Support (3)', 'Agentic Email Drafting', 'CRM Integration'] 
  },
  { 
    id: 'growth', 
    name: 'Growth', 
    price: 799, 
    minutes: 4000, 
    features: ['Dialect Adaptation', 'Autonomous Tool Use', 'Global Market Expansion'] 
  },
  { 
    id: 'elite', 
    name: 'Elite', 
    price: 1499, 
    minutes: 10000, 
    features: ['Self-Learning RL Engine', 'Agentic Orchestration', 'Financial Hub Ready'] 
  },
];

export default function PricingPage() {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Deploy Your Sovereign Workforce
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          Fixed-tier pricing for global agentic intelligence.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
