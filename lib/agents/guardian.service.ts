export const guardianAgent = {
  /**
   * Scans incoming payloads for security threats
   */
  async scanThreat(data: any): Promise<{ safe: boolean; threatLevel: string }> {
    console.log(`[GUARDIAN] Neural Security Scan Initiated...`);
    
    const payload = JSON.stringify(data).toLowerCase();
    const threats = ['<script>', 'drop table', 'select *', '--', 'javascript:'];
    
    const isMalicious = threats.some(t => payload.includes(t));

    return {
      safe: !isMalicious,
      threatLevel: isMalicious ? 'CRITICAL' : 'ZERO'
    };
  }
};
