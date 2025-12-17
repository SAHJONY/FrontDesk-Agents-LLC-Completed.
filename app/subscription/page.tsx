// 1. Define la estructura de un Plan
interface PlanData {
  name: string;
  price: number;
  promoPrice?: number;
  features: string[];
  description?: string;
}

// 2. Define las Props del componente PlanCard
interface PlanCardProps {
  plan: PlanData;
  onSelect: (planName: string) => void;
  currentPlanName: string;
  isPromoActive: boolean;
  priceMultiplier?: number;
}

// 3. Aplica los tipos al componente
const PlanCard = ({ 
  plan, 
  onSelect, 
  currentPlanName, 
  isPromoActive, 
  priceMultiplier = 1 
}: PlanCardProps) => {
    const isCurrent = plan.name === currentPlanName;
    // ... resto de tu lógica actual
