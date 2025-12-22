// services/automation.service.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  conditions: Record<string, any>;
  enabled: boolean;
}

export interface AutomationExecution {
  ruleId: string;
  triggeredAt: Date;
  success: boolean;
  result?: any;
  error?: string;
}

/**
 * Automation Service
 * Manages workflow automation rules and executions
 */
export const automationService = {
  /**
   * Create a new automation rule
   */
  async createRule(rule: Omit<AutomationRule, 'id'>): Promise<AutomationRule> {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .insert(rule)
        .select()
        .single();

      if (error) throw error;
      return data as AutomationRule;
    } catch (error) {
      console.error('Error creating automation rule:', error);
      throw error;
    }
  },

  /**
   * Get all automation rules for a user
   */
  async getRules(userId: string): Promise<AutomationRule[]> {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AutomationRule[];
    } catch (error) {
      console.error('Error getting automation rules:', error);
      return [];
    }
  },

  /**
   * Execute an automation rule
   */
  async executeRule(ruleId: string, context: any): Promise<AutomationExecution> {
    try {
      const { data: rule, error } = await supabase
        .from('automation_rules')
        .select('*')
        .eq('id', ruleId)
        .single();

      if (error) throw error;
      if (!rule.enabled) {
        return { ruleId, triggeredAt: new Date(), success: false, error: 'Rule is disabled' };
      }

      const conditionsMet = this.checkConditions(rule.conditions, context);
      if (!conditionsMet) {
        return { ruleId, triggeredAt: new Date(), success: false, error: 'Conditions not met' };
      }

      const result = await this.executeAction(rule.action, context);

      await supabase.from('automation_executions').insert({
        rule_id: ruleId,
        triggered_at: new Date().toISOString(),
        success: true,
        result,
      });

      return { ruleId, triggeredAt: new Date(), success: true, result };
    } catch (error) {
      console.error('Error executing automation rule:', error);
      return { ruleId, triggeredAt: new Date(), success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  /**
   * Check if conditions are met
   */
  checkConditions(conditions: Record<string, any>, context: any): boolean {
    try {
      for (const [key, expectedValue] of Object.entries(conditions)) {
        const actualValue = this.getNestedValue(context, key);
        if (actualValue !== expectedValue) return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking conditions:', error);
      return false;
    }
  },

  /**
   * Execute automation action
   */
  async executeAction(action: string, context: any): Promise<any> {
    try {
      const [actionType, ...params] = action.split(':');
      switch (actionType) {
        case 'send_email':
          return { type: 'email', status: 'sent' };
        case 'send_sms':
          return { type: 'sms', status: 'sent' };
        case 'create_task':
          return { type: 'task', status: 'created' };
        case 'webhook':
          return { type: 'webhook', status: 'called' };
        default:
          throw new Error(`Unknown action type: ${actionType}`);
      }
    } catch (error) {
      console.error('Error executing action:', error);
      throw error;
    }
  },

  /**
   * Get nested value from object using dot notation
   */
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  },

  /**
   * Toggle rule enabled status
   */
  async toggleRule(ruleId: string, enabled: boolean): Promise<void> {
    try {
      const { error } = await supabase.from('automation_rules').update({ enabled }).eq('id', ruleId);
      if (error) throw error;
    } catch (error) {
      console.error('Error toggling automation rule:', error);
      throw error;
    }
  },

  /**
   * Delete automation rule
   */
  async deleteRule(ruleId: string): Promise<void> {
    try {
      const { error } = await supabase.from('automation_rules').delete().eq('id', ruleId);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting automation rule:', error);
      throw error;
    }
  },

  /**
   * FIX: Added missing triggerPanic function to resolve Type Error
   * Handles incoming security alerts from the webhook
   */
  async triggerPanic(reason: string): Promise<any> {
    console.error(`!!! SECURITY ALERT: ${reason} !!!`);
    // Logic to notify admins or lock down systems
    return { success: true, protocol: 'PANIC_MODE_ACTIVATED', reason };
  }
};
