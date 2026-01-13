/**
 * Form Validation Utilities
 * Reusable validation functions for form fields
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

/**
 * Validate a single field against its rules
 */
export function validateField(value: string, rules: ValidationRule[]): string {
  for (const rule of rules) {
    if (rule.required && !value.trim()) {
      return rule.message;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    if (rule.custom && !rule.custom(value)) {
      return rule.message;
    }
  }

  return '';
}

/**
 * Validate all fields in a form
 */
export function validateForm(
  data: Record<string, string>,
  rules: ValidationRules
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(fieldName => {
    const value = data[fieldName] || '';
    const fieldRules = rules[fieldName];
    const error = validateField(value, fieldRules);

    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
}

/**
 * Common validation patterns
 */
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-()]+$/,
  url: /^https?:\/\/.+/,
  subdomain: /^[a-z0-9-]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  lettersOnly: /^[a-zA-Z\s]+$/,
};

/**
 * Common validation rules
 */
export const commonRules = {
  email: [
    { required: true, message: 'Email is required' },
    { pattern: patterns.email, message: 'Please enter a valid email address' },
  ],
  phone: [
    { required: true, message: 'Phone number is required' },
    { pattern: patterns.phone, message: 'Please enter a valid phone number' },
    { minLength: 10, message: 'Phone number must be at least 10 digits' },
  ],
  name: [
    { required: true, message: 'Name is required' },
    { minLength: 2, message: 'Name must be at least 2 characters' },
    { pattern: patterns.lettersOnly, message: 'Name can only contain letters' },
  ],
  password: [
    { required: true, message: 'Password is required' },
    { minLength: 8, message: 'Password must be at least 8 characters' },
  ],
  subdomain: [
    { required: true, message: 'Subdomain is required' },
    { pattern: patterns.subdomain, message: 'Subdomain can only contain lowercase letters, numbers, and hyphens' },
    { minLength: 3, message: 'Subdomain must be at least 3 characters' },
  ],
};

/**
 * Format phone number for display
 */
export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else {
    return `+${cleaned.slice(0, cleaned.length - 10)} (${cleaned.slice(-10, -7)}) ${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`;
  }
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(value: string): string {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
