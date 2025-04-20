import { getSession } from 'next-auth/react'
import DataAggregator from '../../../lib/data-aggregator'

export default async function handler(req, res) {
  const session = await getSession({ req })

  // If you are not enforcing auth for search,
  // you can skip the session check:
  // if (!session) return res.status(401).json({ message: 'Unauthorized' })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const searchParams = req.body
    // Get user integrations from your database;
    // For demonstration, we use static mock integrations:
    const userIntegrations = {
      facebook: { connected: false, username: '', password: '' },
      keyglee: { connected: false, username: '', password: '' },
      offermarket: { connected: false, username: '', password: '' },
      wholster: { connected: false, username: '', password: '' },
      propstream: { connected: false, apiKey: '' },
      reddit: { connected: false, username: '', password: '' },
      dealmachine: { connected: false, apiKey: '' },
      biggerpockets: { connected: false, username: '', password: '' },
      dealsauce: { connected: false, username: '', password: '' }
    }
    // Determine if any platforms are connected
    const connectedPlatforms = Object.values(userIntegrations).filter(i => i.connected)
    if (connectedPlatforms.length === 0) {
      // Return mock deals if no integrations
      const mockDeals = getMockDeals(searchParams)
      return res.status(200).json({ deals: mockDeals })
    }
    const aggregator = new DataAggregator(userIntegrations)
    const deals = await aggregator.searchAllPlatforms(searchParams)
    return res.status(200).json({ deals })
  } catch (error) {
    console.error('Search error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to generate mock deals (fallback)
function getMockDeals(params) {
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
      description: 'This property needs moderate repairs including new flooring, paint, and kitchen updates.',
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
    }
    // Add additional mock deals here if desired
  ]

  let filteredDeals = [...mockDeals]
  if (params.location) {
    const locationLower = params.location.toLowerCase()
    filteredDeals = filteredDeals.filter(deal =>
      deal.city.toLowerCase().includes(locationLower) ||
      deal.state.toLowerCase().includes(locationLower) ||
      deal.zipCode.includes(params.location)
    )
  }
  if (params.propertyType) {
    filteredDeals = filteredDeals.filter(deal => deal.propertyType === params.propertyType)
  }
  if (params.minBeds) {
    filteredDeals = filteredDeals.filter(deal => deal.beds >= parseInt(params.minBeds))
  }
  if (params.minBaths) {
    filteredDeals = filteredDeals.filter(deal => deal.baths >= parseInt(params.minBaths))
  }
  if (params.minPrice) {
    filteredDeals = filteredDeals.filter(deal => deal.askingPrice >= parseInt(params.minPrice))
  }
  if (params.maxPrice) {
    filteredDeals = filteredDeals.filter(deal => deal.askingPrice <= parseInt(params.maxPrice))
  }
  if (params.minSqFt) {
    filteredDeals = filteredDeals.filter(deal => deal.sqft >= parseInt(params.minSqFt))
  }
  if (params.maxSqFt) {
    filteredDeals = filteredDeals.filter(deal => deal.sqft <= parseInt(params.maxSqFt))
  }
  if (params.yearBuilt) {
    filteredDeals = filteredDeals.filter(deal => deal.yearBuilt >= parseInt(params.yearBuilt))
  }
  return filteredDeals
}
