import ScraperFactory from './scrapers/scraper-factory'
import { calculateDealScore } from './scoring'

export default class DataAggregator {
  constructor(userIntegrations) {
    this.userIntegrations = userIntegrations
    this.scrapers = {}
    // Initialize scrapers for connected platforms
    Object.entries(userIntegrations).forEach(([platform, integration]) => {
      if (integration.connected) {
        this.scrapers[platform] = ScraperFactory.createScraper(platform, integration)
      }
    })
  }

  async initialize() {
    for (const platform in this.scrapers) {
      await this.scrapers[platform].initialize()
    }
  }

  async close() {
    for (const platform in this.scrapers) {
      await this.scrapers[platform].close()
    }
  }

  async searchAllPlatforms(params) {
    try {
      await this.initialize()
      const searchPromises = Object.entries(this.scrapers).map(async ([platform, scraper]) => {
        try {
          const deals = await scraper.search(params)
          return deals
        } catch (error) {
          console.error(`Error searching ${platform}:`, error)
          return []
        }
      })
      const results = await Promise.all(searchPromises)
      let allDeals = results.flat()
      // Calculate deal scores using the scoring algorithm
      allDeals = allDeals.map(deal => {
        const scores = calculateDealScore(deal)
        return {
          ...deal,
          scores: {
            financial: scores.financial,
            market: scores.market,
            property: scores.property,
            risk: scores.risk,
          },
          dealScore: scores.overall
        }
      })
      // Sort deals by score descending
      allDeals.sort((a, b) => b.dealScore - a.dealScore)
      return allDeals
    } catch (error) {
      console.error('Error in data aggregation:', error)
      throw error
    } finally {
      await this.close()
    }
  }
}
