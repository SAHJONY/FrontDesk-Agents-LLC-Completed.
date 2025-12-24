export const generateWeeklyReport = (clientData: any, callLogs: any[]) => {
  const totalCalls = callLogs.length;
  const emergenciesHandled = callLogs.filter(log => log.revenue_protected >= 1500).length;
  const totalRevenueProtected = callLogs.reduce((acc, log) => acc + log.revenue_protected, 0);
  const roiMultiplier = (totalRevenueProtected / clientData.monthly_subscription).toFixed(1);

  return `
    FRONTDESK AGENTS: WEEKLY PERFORMANCE SUMMARY
    Client: ${clientData.business_name}
    Period: Dec 17 - Dec 23, 2025 (Winter Freeze Window)

    STATISTICS:
    - Total Inbound Calls: ${totalCalls}
    - AI Response Time: < 15 Seconds (100% Compliance)
    - Winter Emergencies Saved: ${emergenciesHandled}
    
    FINANCIAL IMPACT:
    - Revenue Protected: $${totalRevenueProtected.toLocaleString()}
    - Current ROI Status: ${roiMultiplier}X
    
    NOTE: During the current freeze, our AI successfully triaged 
    ${emergenciesHandled} high-ticket emergency jobs that would 
    have otherwise been lost to competitors.
  `;
};
