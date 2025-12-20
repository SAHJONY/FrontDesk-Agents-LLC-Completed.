export default function PricingCard({ region }: { region: string }) {
  const isGrowthMarket = region === 'GROWTH';
  const price = isGrowthMarket ? "$499" : "$1,499";

  return (
    <div className="p-8 rounded-3xl border border-blue-500 bg-blue-50/50">
      <h3 className="text-2xl font-bold">Enterprise AI Plan</h3>
      <p className="text-4xl font-black my-4">{price}<span className="text-sm font-normal">/mo</span></p>
      
      {isGrowthMarket && (
        <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mb-4 inline-block">
          Special Regional Pricing Applied
        </div>
      )}
      
      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
        Get Started
      </button>
    </div>
  );
}
