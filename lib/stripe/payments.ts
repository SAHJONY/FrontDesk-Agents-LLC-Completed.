export const plans = [
  {
    name: 'Starter',
    priceId: 'price_XXXX1', // Reemplaza con tu ID de Stripe
    price: 149,
    features: ['SARA Inbound 24/7', '200 Minutos Incluidos', 'Dashboard Básico']
  },
  {
    name: 'Growth',
    priceId: 'price_XXXX2', 
    price: 399,
    features: ['SARA + ALEX Agents', '1,000 Minutos Incluidos', 'Campañas Outbound']
  }
];

export async function createCheckoutSession(priceId: string, customerEmail: string) {
  const response = await fetch('/api/stripe/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId, email: customerEmail }),
  });
  const session = await response.json();
  window.location.href = session.url; // Redirige a Stripe
}
