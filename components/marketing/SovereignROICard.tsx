import { TrendingDown, ShieldCheck, DollarSign } from 'lucide-react';

export default function SovereignROICard({ roi, businessName }: { roi: any, businessName: string }) {
  const isRTL = roi.direction === 'rtl';

  return (
    <div className="titan-card p-10 border-red-500/20 bg-red-500/5 relative overflow-hidden" dir={roi.direction}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <TrendingDown className="w-32 h-32 text-red-500" />
      </div>

      <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-500 mb-6">
        {isRTL ? 'تقرير تسرب الإيرادات السنوي' : 'Annual Revenue Leakage Report'}
      </h3>
      
      <div className="space-y-2">
        <p className="text-5xl font-black italic tracking-tighter">
          {new Intl.NumberFormat(roi.language, { style: 'currency', currency: roi.currency }).format(roi.leakage)}
        </p>
        <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
          {isRTL ? `خسارة مقدرة لشركة ${businessName}` : `Estimated Loss for ${businessName}`}
        </p>
      </div>

      <div className="mt-12 p-6 bg-cyan-500 text-black rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase">Sovereign Recovery Potential</p>
          <p className="text-2xl font-black italic">
             +{new Intl.NumberFormat(roi.language, { style: 'currency', currency: roi.currency }).format(roi.recoveryPotential)}
          </p>
        </div>
        <ShieldCheck className="w-10 h-10 opacity-50" />
      </div>
    </div>
  );
}
