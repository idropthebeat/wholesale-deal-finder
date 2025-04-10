/**
 * Calculate deal score based on various factors
 * 
 * @param {Object} deal - Property deal object
 * @returns {Object} - Scores and overall deal score
 */
export function calculateDealScore(deal) {
  // Calculate financial score (40% of total)
  const financialScore = calculateFinancialScore(deal)
  
  // Calculate market score (30% of total)
  const marketScore = calculateMarketScore(deal)
  
  // Calculate property score (15% of total)
  const propertyScore = calculatePropertyScore(deal)
  
  // Calculate risk score (15% of total)
  const riskScore = calculateRiskScore(deal)
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (financialScore * 0.4) +
    (marketScore * 0.3) +
    (propertyScore * 0.15) +
    (riskScore * 0.15)
  )
  
  return {
    financial: financialScore,
    market: marketScore,
    property: propertyScore,
    risk: riskScore,
    overall: overallScore
  }
}

/**
 * Calculate financial score based on profit, ROI, ARV ratio, and 70% rule
 * 
 * @param {Object} deal - Property deal object
 * @returns {number} - Financial score (0-100)
 */
function calculateFinancialScore(deal) {
  const {
    askingPrice,
    estimatedArv,
    repairCost,
    potentialProfit
  } = deal
  
  // Calculate ROI
  const totalInvestment = askingPrice + repairCost
  const roi = (potentialProfit / totalInvestment) * 100
  
  // Calculate ARV to purchase price ratio
  const arvRatio = estimatedArv / askingPrice
  
  // Calculate 70% rule analysis
  // 70% rule: Maximum purchase price = (ARV * 0.7) - repair costs
  const maxAllowableOffer = (estimatedArv * 0.7) - repairCost
  const ruleAnalysis = maxAllowableOffer - askingPrice
  
  // Score components
  let profitScore = 0
  let roiScore = 0
  let arvRatioScore = 0
  let ruleScore = 0
  
  // Profit score (0-25 points)
  if (potentialProfit >= 100000) profitScore = 25
  else if (potentialProfit >= 75000) profitScore = 20
  else if (potentialProfit >= 50000) profitScore = 15
  else if (potentialProfit >= 25000) profitScore = 10
  else profitScore = Math.max(0, Math.floor(potentialProfit / 2500))
  
  // ROI score (0-25 points)
  if (roi >= 40) roiScore = 25
  else if (roi >= 30) roiScore = 20
  else if (roi >= 20) roiScore = 15
  else if (roi >= 10) roiScore = 10
  else roiScore = Math.max(0, Math.floor(roi))
  
  // ARV ratio score (0-25 points)
  if (arvRatio >= 1.8) arvRatioScore = 25
  else if (arvRatio >= 1.6) arvRatioScore = 20
  else if (arvRatio >= 1.4) arvRatioScore = 15
  else if (arvRatio >= 1.2) arvRatioScore = 10
  else arvRatioScore = Math.max(0, Math.floor((arvRatio - 1) * 50))
  
  // 70% rule score (0-25 points)
  if (ruleAnalysis >= 20000) ruleScore = 25
  else if (ruleAnalysis >= 10000) ruleScore = 20
  else if (ruleAnalysis >= 0) ruleScore = 15
  else if (ruleAnalysis >= -10000) ruleScore = 10
  else if (ruleAnalysis >= -20000) ruleScore = 5
  else ruleScore = 0
  
  // Total financial score
  return profitScore + roiScore + arvRatioScore + ruleScore
}

/**
 * Calculate market score based on location quality and market conditions
 * 
 * @param {Object} deal - Property deal object
 * @returns {number} - Market score (0-100)
 */
function calculateMarketScore(deal) {
  const { city, state } = deal
  
  // Define hot markets based on research
  const hotMarkets = {
    'TX': ['Austin', 'Dallas', 'Houston', 'San Antonio'],
    'FL': ['Tampa', 'Orlando', 'Jacksonville', 'Miami'],
    'AZ': ['Phoenix', 'Tucson', 'Scottsdale'],
    'GA': ['Atlanta', 'Savannah'],
    'NC': ['Charlotte', 'Raleigh'],
    'TN': ['Nashville', 'Memphis'],
    'CO': ['Denver', 'Colorado Springs']
  }
  
  // Check if location is in a hot market
  const isHotState = hotMarkets[state] !== undefined
  const isHotCity = isHotState && hotMarkets[state].includes(city)
  
  // Base score for hot markets
  let marketScore = 0
  if (isHotCity) marketScore = 85
  else if (isHotState) marketScore = 75
  else marketScore = 65
  
  return marketScore
}

/**
 * Calculate property score based on property characteristics
 * 
 * @param {Object} deal - Property deal object
 * @returns {number} - Property score (0-100)
 */
function calculatePropertyScore(deal) {
  const {
    propertyType,
    beds,
    baths,
    sqft,
    yearBuilt
  } = deal
  
  // Score components
  let typeScore = 0
  let bedBathScore = 0
  let sizeScore = 0
  let ageScore = 0
  
  // Property type score (0-25 points)
  if (propertyType === 'Single Family') typeScore = 25
  else if (propertyType === 'Multi-Family') typeScore = 22
  else if (propertyType === 'Townhouse') typeScore = 20
  else if (propertyType === 'Condo') typeScore = 18
  else typeScore = 15
  
  // Bed/bath score (0-25 points)
  const bedBathTotal = beds + baths
  if (bedBathTotal >= 7) bedBathScore = 25
  else if (bedBathTotal >= 6) bedBathScore = 22
  else if (bedBathTotal >= 5) bedBathScore = 20
  else if (bedBathTotal >= 4) bedBathScore = 18
  else bedBathScore = 15
  
  // Size score (0-25 points)
  if (sqft >= 2500) sizeScore = 25
  else if (sqft >= 2000) sizeScore = 22
  else if (sqft >= 1500) sizeScore = 20
  else if (sqft >= 1000) sizeScore = 18
  else sizeScore = 15
  
  // Age score (0-25 points)
  const age = new Date().getFullYear() - yearBuilt
  if (age <= 5) ageScore = 25
  else if (age <= 10) ageScore = 22
  else if (age <= 20) ageScore = 20
  else if (age <= 30) ageScore = 18
  else if (age <= 40) ageScore = 15
  else ageScore = 10
  
  // Total property score
  return typeScore + bedBathScore + sizeScore + ageScore
}

/**
 * Calculate risk score based on various risk factors
 * 
 * @param {Object} deal - Property deal object
 * @returns {number} - Risk score (0-100)
 */
function calculateRiskScore(deal) {
  const {
    yearBuilt,
    askingPrice,
    repairCost
  } = deal
  
  // Score components
  let ageRiskScore = 0
  let repairRiskScore = 0
  let marketRiskScore = 0
  let regulatoryRiskScore = 0
  
  // Age risk score (0-25 points)
  const age = new Date().getFullYear() - yearBuilt
  if (age <= 5) ageRiskScore = 25
  else if (age <= 10) ageRiskScore = 22
  else if (age <= 20) ageRiskScore = 20
  else if (age <= 30) ageRiskScore = 18
  else if (age <= 40) ageRiskScore = 15
  else ageRiskScore = 10
  
  // Repair cost risk score (0-25 points)
  const repairRatio = repairCost / askingPrice
  if (repairRatio <= 0.1) repairRiskScore = 25
  else if (repairRatio <= 0.15) repairRiskScore = 22
  else if (repairRatio <= 0.2) repairRiskScore = 20
  else if (repairRatio <= 0.25) repairRiskScore = 18
  else if (repairRatio <= 0.3) repairRiskScore = 15
  else repairRiskScore = 10
  
  // Market risk score (0-25 points)
  // Assuming low market risk for now
  marketRiskScore = 20
  
  // Regulatory risk score (0-25 points)
  // Assuming low regulatory risk for now
  regulatoryRiskScore = 20
  
  // Total risk score
  return ageRiskScore + repairRiskScore + marketRiskScore + regulatoryRiskScore
}
