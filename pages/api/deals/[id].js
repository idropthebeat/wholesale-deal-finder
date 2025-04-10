// Mock data (same as in search.js)
const mockDeals = [
  {
    id: 'om-1',
    address: '123 Main St',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    propertyType: 'Single Family',
    beds: 3,
    baths: 2,
    sqft: 1800,
    yearBuilt: 1995,
    askingPrice: 180000,
    estimatedArv: 280000,
    repairCost: 30000,
    potentialProfit: 70000,
    source: 'OfferMarket',
    sourceUrl: 'https://www.offermarket.us/property/123-main-st',
    description: 'This property needs moderate repairs including new flooring, paint, and kitchen updates. Good rental area with strong appreciation potential.',
    roi: 33.3,
    arvRatio: 1.56,
    ruleAnalysis: 16000,
    marketStrength: 'Strong Market',
    populationGrowth: 'High',
    jobGrowth: 'Strong',
    priceTrends: 'Appreciating',
    propertyTypeRating: 'Preferred',
    bedBathRating: 'Good',
    sqftRating: 'Average',
    ageRating: 'Average',
    ageRisk: 'Moderate',
    repairRisk: 'Moderate',
    marketVolatility: 'Low',
    regulatoryRisk: 'Low',
    recommendation: 'EXCELLENT DEAL - This property shows strong investment potential with solid returns.',
    scores: {
      financial: 88,
      market: 85,
      property: 80,
      risk: 82
    },
    dealScore: 85
  },
  {
    id: 'om-2',
    address: '456 Oak Ave',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    propertyType: 'Single Family',
    beds: 4,
    baths: 3,
    sqft: 2200,
    yearBuilt: 2000,
    askingPrice: 220000,
    estimatedArv: 350000,
    repairCost: 40000,
    potentialProfit: 90000,
    source: 'OfferMarket',
    sourceUrl: 'https://www.offermarket.us/property/456-oak-ave',
    description: 'Spacious family home in desirable neighborhood. Needs new roof, HVAC updates, and interior renovations. Great flip opportunity.',
    roi: 34.6,
    arvRatio: 1.59,
    ruleAnalysis: 5000,
    marketStrength: 'Strong Market',
    populationGrowth: 'High',
    jobGrowth: 'Strong',
    priceTrends: 'Appreciating',
    propertyTypeRating: 'Preferred',
    bedBathRating: 'Excellent',
    sqftRating: 'Good',
    ageRating: 'Good',
    ageRisk: 'Low',
    repairRisk: 'Moderate',
    marketVolatility: 'Low',
    regulatoryRisk: 'Low',
    recommendation: 'EXCELLENT DEAL - This property offers excellent profit potential in a strong market.',
    scores: {
      financial: 86,
      market: 85,
      property: 85,
      risk: 78
    },
    dealScore: 82
  },
  {
    id: 'wh-1',
    address: '789 Pine Ln',
    city: 'Austin',
    state: 'TX',
    zipCode: '78745',
    propertyType: 'Single Family',
    beds: 3,
    baths: 2.5,
    sqft: 1950,
    yearBuilt: 2005,
    askingPrice: 210000,
    estimatedArv: 320000,
    repairCost: 25000,
    potentialProfit: 85000,
    source: 'Wholster',
    sourceUrl: 'https://wholster.app/property/789-pine-ln',
    description: 'Well-maintained property with minor cosmetic issues. Great location near schools and shopping. Perfect for a quick flip.',
    roi: 36.2,
    arvRatio: 1.52,
    ruleAnalysis: 9000,
    marketStrength: 'Strong Market',
    populationGrowth: 'High',
    jobGrowth: 'Strong',
    priceTrends: 'Appreciating',
    propertyTypeRating: 'Preferred',
    bedBathRating: 'Good',
    sqftRating: 'Good',
    ageRating: 'Good',
    ageRisk: 'Low',
    repairRisk: 'Low',
    marketVolatility: 'Low',
    regulatoryRisk: 'Low',
    recommendation: 'GOOD DEAL - This property offers solid returns with minimal risk.',
    scores: {
      financial: 84,
      market: 85,
      property: 82,
      risk: 88
    },
    dealScore: 78
  },
  {
    id: 'wh-2',
    address: '101 Desert Rd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78748',
    propertyType: 'Single Family',
    beds: 4,
    baths: 3,
    sqft: 2400,
    yearBuilt: 2010,
    askingPrice: 290000,
    estimatedArv: 420000,
    repairCost: 35000,
    potentialProfit: 95000,
    source: 'Wholster',
    sourceUrl: 'https://wholster.app/property/101-desert-rd',
    description: 'Newer home in growing subdivision. Needs flooring, paint, and kitchen updates. Strong rental market with good appreciation.',
    roi: 29.2,
    arvRatio: 1.45,
    ruleAnalysis: -11000,
    marketStrength: 'Strong Market',
    populationGrowth: 'High',
    jobGrowth: 'Strong',
    priceTrends: 'Appreciating',
    propertyTypeRating: 'Preferred',
    bedBathRating: 'Excellent',
    sqftRating: 'Excellent',
    ageRating: 'Excellent',
    ageRisk: 'Very Low',
    repairRisk: 'Moderate',
    marketVolatility: 'Low',
    regulatoryRisk: 'Low',
    recommendation: 'GOOD DEAL - This property offers good potential returns but is priced slightly above ideal acquisition targets.',
    scores: {
      financial: 76,
      market: 85,
      property: 90,
      risk: 85
    },
    dealScore: 75
  }
]

export default function handler(req, res)  {
  const { id } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const deal = mockDeals.find(deal => deal.id === id)
    
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' })
    }
    
    return res.status(200).json({ deal })
  } catch (error) {
    console.error('Error fetching deal:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
