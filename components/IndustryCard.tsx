export const IndustryCard = ({ title, icon: Icon }: any) => (
  <div className="titan-card hover:border-brand-cyan transition-all cursor-pointer group">
    <Icon className="text-brand-slate group-hover:text-brand-cyan mb-4" />
    <h3 className="text-white font-bold">{title}</h3>
    <p className="text-slate-500 text-xs mt-2">Customized AI training for {title.toLowerCase()} nodes.</p>
  </div>
);
