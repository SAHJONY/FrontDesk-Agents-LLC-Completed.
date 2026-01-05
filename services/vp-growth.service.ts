// services/vp-growth.service.ts
import { blandAiService } from './blandAiService';
import { MarketingAutomation } from './marketingAutomation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const marketingAutomation = new MarketingAutomation();
export const vpGrowthAgent = {
  name: "Global Growth Orchestrator",
  
  async execute(target: { industry: string; locale: string; data: any }) {
    // 1. Contextual Intelligence: Load successful patterns for this industry
    const strategy = await this.getRLStrategy(target.industry, target.locale);

    // 2. Multimodal Action: Deploy the right product for the job
    if (strategy.primaryChannel === 'VOICE') {
      // blandAiService does not have initiateOutreach, using makeCall as a placeholder
      return await blandAiService.makeCall({ phoneNumber: target.data.phone, task: 'outreach' }); // Calls our Voice Agent
    } else {
      // marketingAutomation does not have sendSmartMessage, using startSequence as a placeholder
      return await marketingAutomation.startSequence(strategy.copyTemplate, target.data);
    }
  },

  async getRLStrategy(industry: string, locale: string) {
    // The "Brain": Queries Supabase for what is working WORLDWIDE right now
    const { data } = await supabase
      .from('global_intelligence')
      .select('optimal_policy')
      .eq('industry', industry)
      .eq('locale', locale)
      .single();
    
    return data?.optimal_policy || { primaryChannel: 'SMS', copyTemplate: 'DIRECT' };
  }
};
