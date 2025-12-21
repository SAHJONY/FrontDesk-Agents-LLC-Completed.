// services/automation.service.ts
import { supabase } from '@/lib/supabase';
import { metricsService } from './metrics.service';
import { telegramBot } from '@/lib/telegram';

export class AutomationService {
  /**
   * Orquestación de Reacción Automática:
   * Si la eficiencia cae, el sistema toma medidas correctivas.
   */
  async monitorAndOptimize(businessId: string) {
    const metrics = await metricsService.getGlobalPerformanceReport(); //

    // 1. Umbral de Alerta: Si la eficiencia de la IA cae bajo el 80%
    if (metrics.aiEfficiencyScore < 80) {
      await this.triggerQualityRecovery(businessId);
    }

    // 2. Notificación de Ingresos: Reporte de rendimiento al CEO
    if (metrics.revenueGenerated > 0) {
      await telegramBot.sendMessage(`Reloj de Ingresos: El negocio ha generado $${metrics.revenueGenerated} hoy.`);
    }
  }

  /**
   * Recuperación de Calidad: Re-ajusta los bloques de conocimiento
   */
  private async triggerQualityRecovery(businessId: string) {
    console.warn(`Alerta de Calidad para ${businessId}. Re-optimizando agentes...`);
    
    // Notifica al CEO vía Telegram
    await telegramBot.sendAlert(`🚨 ALERTA: La eficiencia de la IA en ${businessId} bajó al 80%. Iniciando re-ajuste.`);

    // Ejecuta el "Surgical Reactivation" de servicios críticos
    await supabase.rpc('optimize_agent_knowledge', { target_id: businessId });
  }

  /**
   * El Botón de Pánico Global (Global Kill-Switch)
   */
  async triggerPanic(reason: string) {
    console.error(`PANIC TRIGGERED: ${reason}`);
    
    // Bloqueo total de las rutas de API de los 15 servicios
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
