export function formatCurrency(priceCents) {
  priceCents = (priceCents / 100).toFixed(2);
  return priceCents
}