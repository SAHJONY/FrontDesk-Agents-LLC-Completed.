// hooks/useFeatureFlags.ts

export enum Features {
  AI_RECEPTIONIST = 'ai_receptionist',
  MULTI_LANGUAGE = 'multi_language',
  CALL_RECORDING = 'call_recording',
  CRM_INTEGRATION = 'crm_integration',
  ANALYTICS = 'analytics',
}

export function useFeatureFlags() {
  return {
    [Features.AI_RECEPTIONIST]: true,
    [Features.MULTI_LANGUAGE]: true,
    [Features.CALL_RECORDING]: true,
    [Features.CRM_INTEGRATION]: false,
    [Features.ANALYTICS]: false,
  }
}
