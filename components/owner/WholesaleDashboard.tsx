import { FinancialSummary } from './FinancialSummary';
import { AcquisitionTable } from './AcquisitionTable'; // Tu tabla de leads

export const WholesaleDashboard = () => {
  return (
    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-amber-500 mb-6">Wholesale Command Center</h2>
      
      {/* Tu nuevo resumen financiero en la cima */}
      <FinancialSummary />

      <div className="grid grid-cols-1 gap-6">
        <AcquisitionTable />
      </div>
    </div>
  );
};
