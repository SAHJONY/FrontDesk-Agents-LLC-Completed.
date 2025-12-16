// config/secrets.ts

/**
 * Carga una variable de entorno de forma segura.
 * En un entorno de producción, esto debería integrarse
 * con un Secrets Vault (HashiCorp Vault, AWS Secrets Manager, etc.)
 * para mayor seguridad, pero aquí usamos process.env para simplificar.
 */
export function loadSecret(key: string): string {
  const secret = process.env[key];

  if (!secret) {
    // Es CRÍTICO que la aplicación falle si una clave necesaria no existe.
    throw new Error(`CRITICAL: Secret '${key}' not found in environment.`);
  }

  return secret;
}

// Para uso futuro, podrías tener:
// export function loadAllSecretsForProvider(provider: string): Record<string, string> { ... }
