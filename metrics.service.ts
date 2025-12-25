// services/automation.service.ts
import { createClient } from '@/lib/supabase'; // FIX 1: Import the creation function
import { metricsService } from './metrics.service';
import { telegramBot } from '@/lib/telegram';

export class AutomationService {
  /**
   * Orquestación de Reacción Automática
   */
  async monitorAndOptimize(businessId: string) {
    const metrics = await metricsService.getGlobalPerformanceReport();

    if (metrics.aiEfficiencyScore < 80) {
      await this.triggerQualityRecovery(businessId);
    }

    if (metrics.revenueGenerated > 0) {
      await telegramBot.sendMessage(`Reloj de Ingresos: El negocio ha generado $${metrics.revenueGenerated} hoy.`);
    }
  }

  /**
   * Recuperación de Calidad: Re-ajusta los bloques de conocimiento
   */
  private async triggerQualityRecovery(businessId: string) {
    const supabase = await createClient(); // FIX 2: Await the client
    
    console.warn(`Alerta de Calidad para ${businessId}. Re-optimizando agentes...`);
    
    await telegramBot.sendAlert(`🚨 ALERTA: La eficiencia de la IA en ${businessId} bajó al 80%. Iniciando re-ajuste.`);

    // Ejecuta el "Surgical Reactivation"
    await supabase.rpc('optimize_agent_knowledge', { target_id: businessId });
  }

  /**
   * El Botón de Pánico Global (Global Kill-Switch)
   */
  async triggerPanic(reason: string) {
    const supabase = await createClient(); // FIX 3: Await the client
    
    console.error(`PANIC TRIGGERED: ${reason}`);
    
    const { error } = await supabase
      .from('system_config')
      .update({ global_lock: true, lock_reason: reason })
      .eq('id', 'MASTER_CONFIG');

    if (!error) {
      await telegramBot.sendAlert(`💀 SISTEMA BLOQUEADO: ${reason}. Todos los servicios están en modo de solo lectura.`);
    }
  }
}

export const automationService = new AutomationService();
