// ./lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina condicionalmente clases de Tailwind CSS y las fusiona de forma inteligente.
 * Requerido por componentes como Card y Separator.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
