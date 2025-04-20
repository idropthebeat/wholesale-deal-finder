export function calculateDealScore(deal) {
  // Example calculations; these should be adjusted to your actual logic:
  let financialScore = 0
  if (deal.askingPrice && deal.estimatedArv && deal.repairCost) {
    const totalInvestment = deal.askingPrice + deal.repairCost
    const potentialProfit = deal.estimatedArv - totalInvestment
    const roi = totalInvestment ? (potentialProfit / totalInvestment) * 100 : 0
    if (potentialProfit >= 100000) financialScore = 25
    else if (potentialProfit >= 75000) financialScore = 20
    else if (potentialProfit >= 50000) financialScore = 15
    else if (potentialProfit >= 25000) financialScore = 10
    else financialScore = Math.floor(potentialProfit / 2500)
  }
  // Dummy values for market, property, and risk scores:
  const marketScore = 80
  const propertyScore = 75
  const riskScore = 70
  const overall = Math.round(financialScore * 0.4 + marketScore * 0.3 + propertyScore * 0.15 + riskScore * 0.15)
  return {
    financial: financialScore,
    market: marketScore,
    property: propertyScore,
    risk: riskScore,
    overall
  }
}
