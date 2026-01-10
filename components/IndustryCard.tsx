import Link from 'next/link';

export const IndustryCard = ({ title, icon: Icon, href }: any) => {
  const CardContent = (
    <div className="titan-card hover:border-brand-cyan transition-all cursor-pointer group h-full">
      <Icon className="text-brand-slate group-hover:text-brand-cyan mb-4" />
      <h3 className="text-white font-bold">{title}</h3>
      <p className="text-slate-500 text-xs mt-2">Customized AI training for {title.toLowerCase()} nodes.</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};
