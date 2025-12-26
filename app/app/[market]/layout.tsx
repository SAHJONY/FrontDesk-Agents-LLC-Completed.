export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { market: string };
}) {
  const { market } = await params;

  // Logic: If market is 'ar' or 'uae' or 'sa', set direction to RTL
  const isRTL = ['ar', 'uae', 'sa', 'dubai'].includes(market.toLowerCase());
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <div dir={direction} className={isRTL ? 'font-arabic' : 'font-sans'}>
      {children}
    </div>
  );
}
