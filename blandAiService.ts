// services/blandAiService.ts
import { db } from '@/lib/db';

interface IntegrationControl {
  provider: string;
  daily_limit: number;
  enabled: boolean;
}

export async function checkBlandAiUsage(): Promise<boolean> {
  try {
    const integration = await db.integrations_control.findUnique({
      where: { provider: 'bland_ai' }
    });

    if (!integration || !integration.enabled) {
      return false;
    }

    // Get daily usage from consumption tracking
    // If consumption service doesn't exist, we'll implement a simple check
    let usageToday = 0;
    
    // Check if consumption service exists
    if ('consumption' in db && db.consumption && typeof db.consumption.getDailyUsage === 'function') {
      usageToday = await db.consumption.getDailyUsage(integration.provider);
    } else {
      // Fallback: Query consumption table directly if it exists
      // This is a safe fallback that won't break if the table doesn't exist
      try {
        if ('consumption' in db) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const consumption = await (db as any).consumption?.findMany({
            where: {
              provider: integration.provider,
              created_at: {
                gte: today
              }
            }
          });
          
          usageToday = consumption?.length || 0;
        }
      } catch (error) {
        console.warn('Consumption tracking not available, allowing request:', error);
        // If we can't check usage, allow the request
        return true;
      }
    }

    if (usageToday >= integration.daily_limit) {
      throw new Error(
        `Daily limit of ${integration.daily_limit} calls reached for Bland AI`
      );
    }

    return true;
  } catch (error) {
    console.error('Error checking Bland AI usage:', error);
    throw error;
  }
}

export async function trackBlandAiUsage(): Promise<void> {
  try {
    // Track usage if consumption service exists
    if ('consumption' in db && db.consumption && typeof db.consumption.create === 'function') {
      await db.consumption.create({
        provider: 'bland_ai',
        timestamp: new Date()
      });
    } else if ('consumption' in db) {
      // Fallback: Create consumption record directly
      try {
        await (db as any).consumption?.create({
          data: {
            provider: 'bland_ai',
            created_at: new Date()
          }
        });
      } catch (error) {
        console.warn('Unable to track consumption:', error);
        // Non-critical error, don't throw
      }
    }
  } catch (error) {
    console.error('Error tracking Bland AI usage:', error);
    // Non-critical error, don't throw
  }
}

export async function makeBlandAiCall(payload: any): Promise<any> {
  await checkBlandAiUsage();
  
  const BLAND_AI_API_KEY = process.env.BLAND_AI_API_KEY;
  
  if (!BLAND_AI_API_KEY) {
    throw new Error('Bland AI API key not configured');
  }

  try {
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BLAND_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Bland AI API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    
    // Track successful usage
    await trackBlandAiUsage();
    
    return data;
  } catch (error) {
    console.error('Bland AI call failed:', error);
    throw error;
  }
}
