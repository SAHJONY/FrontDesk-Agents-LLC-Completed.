import { verifyJWT } from '@/lib/auth/jwt-verify';
import { LEGAL_WORKFORCE_CONFIG } from '@/lib/agents/legal-workforce-prompt';

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const decoded = verifyJWT(token);

  // Elite Tier Gatekeeping [cite: 2025-12-28]
  if (decoded.tier !== 'elite') {
    return res.status(403).json({ error: 'ELITE_TIER_REQUIRED_FOR_LEGAL_AGENTIC_WORKFORCE' });
  }

  const { case_files, jurisdiction, strategy } = req.body;

  // Execute Agentic Workforce Pipeline
  // Step 1: Element Mapping -> Step 2: Authority Control -> Step 3: Integrity Pass
  const analysis = await executeAgenticLegalChain(case_files, jurisdiction, LEGAL_WORKFORCE_CONFIG);

  return res.status(200).json({
    status: "SUCCESS",
    accuracy_score: analysis.score,
    merits_summary: analysis.merits,
    citations: analysis.verified_citations,
    next_retrieval_tasks: analysis.retrieval_plan
  });
}
