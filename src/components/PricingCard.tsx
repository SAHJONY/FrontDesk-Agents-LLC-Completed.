// src/components/PricingCard.tsx (or wherever it is defined)

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  minutes: number;
  features: string[];
}

// Update the props interface
interface PricingCardProps {
  plan: PricingPlan;
  // region?: string; // Keep this optional if you still use it for something else
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="p-6 border rounded-3xl shadow-lg bg-white flex flex-col h-full">
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="text-4xl font-bold my-4">${plan.price}</p>
      <p className="text-slate-500 mb-6">{plan.minutes.toLocaleString()} AI Minutes</p>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {/* Render features here */}
      </ul>
      
      <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">
        Select {plan.name}
      </button>
    </div>
  );
}
