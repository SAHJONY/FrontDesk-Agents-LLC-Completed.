// services/blandAiService.ts
// PRODUCCIÓN — SIN SDK FANTASMA — CONTROL CEO TOTAL

import { db, IntegrationControl } from '../db/client'
import { loadSecret } from '../config/secrets'

const BLAND_API_BASE = 'https://api.bland.ai/v1'

async function checkDailyLimit(integration: IntegrationControl): Promise<void> {
  if (integration.daily_limit <= 0) {
    throw new Error(
      `Integration ${integration.provider} blocked: daily_limit=${integration.daily_limit}`
    )
  }

  const usageToday = await db.consumption.getDailyUsage(integration.provider)

  if (usageToday >= integration.daily_limit) {
    throw new Error(
      `402 Payment Required: Daily limit reached (${usageToday}/${integration.daily_limit})`
    )
  }
}

async function getIntegration(provider: string): Promise<IntegrationControl> {
  if (process.env.GLOBAL_KILL_SWITCH === 'OFF') {
    throw new Error('GLOBAL KILL SWITCH ACTIVE — All external calls halted')
  }

  const integration = await db.integrations_control.findUnique({
    where: { provider },
  })

  if (!integration) {
    throw new Error(`Integration config missing for provider: ${provider}`)
  }

  if (!integration.active) {
    throw new Error('Integration disabled by CEO')
  }

  return integration
}

function resolveBlandConfig(integration: IntegrationControl) {
  if (!integration.metadata) {
    throw new Error('Bland.ai metadata missing')
  }

  if (integration.mode === 'live') {
    return {
      apiKey: loadSecret('BLAND_AI_LIVE_KEY'),
      agentId: integration.metadata.liveAgentId,
    }
  }

  return {
    apiKey: loadSecret('BLAND_AI_SANDBOX_KEY'),
    agentId: integration.metadata.sandboxAgentId,
  }
}

export async function makeCall(to: string, units_to_use = 1) {
  const integration = await getIntegration('bland_ai')
  await checkDailyLimit(integration)

  const { apiKey, agentId } = resolveBlandConfig(integration)

  if (!apiKey || !agentId) {
    throw new Error('Bland.ai API key or agent ID missing')
  }

  const response = await fetch(`${BLAND_API_BASE}/call`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, agent_id: agentId }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Bland.ai API error: ${response.status} — ${errorText}`)
  }

  const result = await response.json()

  await db.consumption.logUsage('bland_ai', units_to_use)

  return {
    success: true,
    mode: integration.mode,
    result,
  }
}
