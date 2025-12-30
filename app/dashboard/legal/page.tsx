import { LegalComplianceBadge } from '@/components/legal/LegalComplianceBadge';

// Inside your Header section:
<div>
  <div className="flex items-center gap-4 mb-2">
     <Gavel className="text-blue-500 w-6 h-6" />
     <LegalComplianceBadge /> {/* Place it here */}
  </div>
  <h1 className="text-4xl font-black tracking-tighter uppercase italic">Legal Risk Audit</h1>
</div>
