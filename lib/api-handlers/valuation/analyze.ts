import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { verifyOwner } from '@/lib/auth-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Identity Check: Restricted to frontdeskllc@outlook.com
    const { tenant_id } = verifyOwner(req.headers.authorization);

    const { leadId, marketValue, squareFootage, conditionGrade } = req.body;

    // 2. Sovereign Wholesale Formula (MAO - Maximum Allowable Offer)
    // Formula: (ARV * 0.70) - Repairs - Assignment Fee
    const arv = marketValue; 
    const repairEstimate = squareFootage * (conditionGrade === 'poor' ? 45 : 20);
    const targetAssignmentFee = arv * 0.10; // Aiming for 10% spread
    
    const mao = (arv * 0.70) - repairEstimate - targetAssignmentFee;

    // 3. Update Deal Memory with Valuation
    const { data, error } = await supabase
      .from('leads')
      .update({
        arv: arv,
        repair_estimate: repairEstimate,
        mao: mao,
        assignment_potential: targetAssignmentFee,
        valuation_status: 'COMPLETED',
        last_analyzed: new Date().toISOString()
      })
      .eq('id', leadId)
      .eq('tenant_id', tenant_id)
      .select();

    if (error) throw error;

    return res.status(200).json({
      message: "Valuation Complete",
      dealAnalysis: {
        arv,
        mao,
        potentialProfit: targetAssignmentFee
      }
    });

  } catch (error: any) {
    console.error('[Valuation Error]:', error.message);
    return res.status(500).json({ error: 'Analysis engine failed' });
  }
}
