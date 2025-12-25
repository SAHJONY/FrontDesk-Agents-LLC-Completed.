export interface TaxResult {
  taxName: string;
  rate: number;
  amount: number;
  total: number;
}

export const taxEngine = {
  // Global Tax Table (2025 Standardized Rates)
  rules: {
    GB: { name: 'VAT', rate: 0.20 },
    DE: { name: 'VAT', rate: 0.19 },
    FR: { name: 'VAT', rate: 0.20 },
    AU: { name: 'GST', rate: 0.10 },
    IN: { name: 'GST', rate: 0.18 },
    US: { name: 'Sales Tax', rate: 0.0825 }, // Average (can be refined by Zip)
    AE: { name: 'VAT', rate: 0.05 },
  },

  calculate(subtotal: number, countryCode: string): TaxResult {
    const rule = this.rules[countryCode as keyof typeof this.rules] || { name: 'Tax', rate: 0 };
    const taxAmount = subtotal * rule.rate;
    
    return {
      taxName: rule.name,
      rate: rule.rate,
      amount: taxAmount,
      total: subtotal + taxAmount
    };
  }
};
