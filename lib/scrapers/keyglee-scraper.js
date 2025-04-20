import BaseScraper from './base-scraper'

export default class KeygleeScraper extends BaseScraper {
  constructor(credentials) {
    super(credentials)
    this.baseUrl = 'https://www.keyglee.com'
    this.loginUrl = 'https://www.keyglee.com/login'
  }

  async login() {
    if (!this.credentials || !this.credentials.username || !this.credentials.password) {
      throw new Error('Keyglee credentials are required')
    }
    await this.page.goto(this.loginUrl)
    await this.waitForSelector('input[name="email"]')
    await this.typeIntoField('input[name="email"]', this.credentials.username)
    await this.typeIntoField('input[name="password"]', this.credentials.password)
    await this.clickElement('button[type="submit"]')
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' })
    if (!await this.isLoggedIn()) {
      throw new Error('Keyglee login failed')
    }
    return true
  }

  async isLoggedIn() {
    try {
      await this.page.waitForSelector('a[href="/dashboard"]', { timeout: 5000 })
      return true
    } catch (error) {
      return false
    }
  }

  async search(params) {
    try {
      if (!await this.isLoggedIn()) {
        await this.login()
      }
      await this.page.goto(`${this.baseUrl}/deals`)
      await this.waitForSelector('.deal-card')
      const deals = await this.page.$$eval('.deal-card', elements => {
        return elements.map(el => {
          const addressElement = el.querySelector('.deal-address')
          const address = addressElement ? addressElement.textContent.trim() : 'Unknown Address'
          const cityStateElement = el.querySelector('.deal-location')
          const cityState = cityStateElement ? cityStateElement.textContent.trim() : ''
          const priceElement = el.querySelector('.deal-price')
          const price = priceElement ? priceElement.textContent.trim() : 'Unknown Price'
          const detailsElement = el.querySelector('.deal-details')
          const details = detailsElement ? detailsElement.textContent.trim() : ''
          const linkElement = el.querySelector('a.deal-link')
          const detailUrl = linkElement ? linkElement.href : ''
          return { address, cityState, price, details, detailUrl }
        })
      })
      const formattedDeals = deals.map(deal => this.formatDeal(deal))
      const filteredDeals = this.filterDeals(formattedDeals, params)
      return filteredDeals
    } catch (error) {
      console.error('Error searching Keyglee:', error)
      throw error
    }
  }

  formatDeal(rawDeal) {
    const cityStateParts = rawDeal.cityState.split(',')
    const city = cityStateParts.length > 0 ? cityStateParts[0].trim() : 'Unknown'
    const state = cityStateParts.length > 1 ? cityStateParts[1].trim() : 'Unknown'
    let askingPrice = 0
    if (rawDeal.price !== 'Unknown Price') {
      const priceMatch = rawDeal.price.match(/\d+/g)
      if (priceMatch) {
        askingPrice = parseInt(priceMatch.join(''))
      }
    }
    const bedsBathsMatch = rawDeal.details.match(/(\d+)\s*bed\s*\/\s*(\d+)\s*bath/i)
    const beds = bedsBathsMatch ? parseInt(bedsBathsMatch[1]) : 0
    const baths = bedsBathsMatch ? parseInt(bedsBathsMatch[2]) : 0
    const sqftMatch = rawDeal.details.match(/(\d+)\s*sq\s*ft/i)
    const sqft = sqftMatch ? parseInt(sqftMatch[1]) : 0
    const estimatedArv = askingPrice * 1.4
    const repairCost = askingPrice * 0.15
    const potentialProfit = estimatedArv - askingPrice - repairCost
    return {
      id: `keyglee-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      address: rawDeal.address,
      city,
      state,
      zipCode: 'Unknown',
      propertyType: 'Single Family',
      beds,
      baths,
      sqft,
      yearBuilt: 0,
      askingPrice,
      estimatedArv,
      repairCost,
      potentialProfit,
      source: 'Keyglee',
      sourceUrl: rawDeal.detailUrl,
      description: `${rawDeal.address}, ${rawDeal.cityState}\n${rawDeal.details}`,
      datePosted: new Date().toISOString()
    }
  }

  filterDeals(deals, params) {
    return deals.filter(deal => {
      if (params.location && !deal.city.toLowerCase().includes(params.location.toLowerCase()) && !deal.state.toLowerCase().includes(params.location.toLowerCase())) {
        return false
      }
      if (params.minPrice && deal.askingPrice < parseInt(params.minPrice)) {
        return false
      }
      if (params.maxPrice && deal.askingPrice > parseInt(params.maxPrice)) {
        return false
      }
      if (params.minBeds && deal.beds < parseInt(params.minBeds)) {
        return false
      }
      if (params.minBaths && deal.baths < parseInt(params.minBaths)) {
        return false
      }
      if (params.minSqFt && deal.sqft < parseInt(params.minSqFt)) {
        return false
      }
      if (params.maxSqFt && deal.sqft > parseInt(params.maxSqFt)) {
        return false
      }
      return true
    })
  }
}
