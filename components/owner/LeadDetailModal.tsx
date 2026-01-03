import { BuyerMatchCard } from './BuyerMatchCard';

// Inside your Lead Detail component:
export const LeadDetail = ({ lead }) => {
  return (
    <div className="p-6 bg-slate-900 text-white">
      <h2 className="text-2xl font-bold">{lead.address}</h2>
      <p>Estimated ARV: ${lead.arv}</p>
      
      {/* THE PLACEMENT */}
      <hr className="my-6 border-slate-700" />
      
      <section>
        <h3 className="text-lg font-semibold text-amber-500">Disposition Engine</h3>
        <p className="text-xs text-slate-400 mb-2">Find investors for this specific Buy Box:</p>
        
        {/* Call the component and pass the lead ID */}
        <BuyerMatchCard dealId={lead.id} />
      </section>
    </div>
  );
};
