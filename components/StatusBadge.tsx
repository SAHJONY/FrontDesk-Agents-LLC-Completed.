import React from 'react';

type StatusType = 'active' | 'idle' | 'warning' | 'offline';

export const StatusBadge = ({ status }: { status: StatusType }) => {
  const styles = {
    active: 'bg-green-500/10 text-green-500 border-green-500/20',
    idle: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    offline: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${styles[status]} text-[10px] font-black uppercase tracking-tighter`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'active' ? 'bg-green-500' : 'bg-current'}`} />
      {status}
    </div>
  );
};
