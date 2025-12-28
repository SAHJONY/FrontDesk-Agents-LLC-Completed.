// File: services/plans.ts

export enum Plans {
  BASIC = 'BASIC',           // $199 - 500 Mins
  PROFESSIONAL = 'PROFESSIONAL', // $399 - 1,000 Mins
  GROWTH = 'GROWTH',         // $799 - 2,500 Mins
  ELITE = 'ELITE'            // $1,499 - 5,000 Mins
}

export const PLAN_DETAILS = {
  [Plans.BASIC]: {
    price: 199,
    minutes: 500,
    target: "Solopreneurs",
  },
  [Plans.PROFESSIONAL]: {
    price: 399,
    minutes: 1000,
    target: "Service Businesses",
  },
  [Plans.GROWTH]: {
    price: 799,
    minutes: 2500,
    target: "Scaling Agencies",
  },
  [Plans.ELITE]: {
    price: 1499,
    minutes: 5000,
    target: "Enterprises",
  }
};
