import BaseScraper from './base-scraper'

export default class FacebookScraper extends BaseScraper {
  constructor(credentials) {
    super(credentials)
    this.baseUrl = 'https://www.facebook.com'
    this.loginUrl = 'https://www.facebook.com/login'
  }

  async login() {
    if (!this.credentials || !this.credentials.username || !this.credentials.password) {
      throw new Error('Facebook credentials are required')
    }
    await this.page.goto(this.loginUrl)
    // Accept cookies if dialog appears
    try {
      const cookieButton = await this.page.$('button[data-testid="cookie-policy-dialog-accept-button"]')
      if (cookieButton) {
        await cookieButton.click()
        await this.page.waitForTimeout(1000)
      }
    } catch (error) {
      console.log('No cookie dialog found')
    }
    await this.typeIntoField('#email', this.credentials.username)
    await this.typeIntoField('#pass', this.credentials.password)
    await this.clickElement('button[name="login"]')
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' })
    if (!await this.isLoggedIn()) {
      throw new Error('Facebook login failed')
    }
    return true
  }

  async isLoggedIn() {
    try {
      await this.page.waitForSelector('div[aria-label="Your profile"]', { timeout: 5000 })
      return true
    } catch (error) {
      return false
    }
  }

  async searchGroups(keywords) {
    // For demonstration, returning a static list of groups.
    return [
      { id: '123456789', name: 'Wholesale Real Estate Deals' },
      { id: '987654321', name: 'Off Market Properties' },
      { id: '456789123', name: 'Real Estate Investors Network' }
    ]
  }

  async searchGroupForDeals(groupId, params) {
    await this.page.goto(`${this.baseUrl}/groups/${groupId}`)
    await this.waitForSelector('div[role="feed"]')
    for (let i = 0; i < 5; i++) {
      await this.scrollToBottom()
      await this.page.waitForTimeout(2000)
    }
    const posts = await this.page.$$eval('div[role="article"]', elements => {
      return elements.map(el => {
        const textContent = el.textContent || ''
        const addressMatch = textContent.match(/\d+\s+[A-Za-z\s]+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Ln|Rd|Blvd|Dr|St)\.?/i)
        const address = addressMatch ? addressMatch[0] : 'Unknown Address'
        const priceMatch = textContent.match(/\$\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)
        const price = priceMatch ? priceMatch[0] : 'Unknown Price'
        const linkElement = el.querySelector('a[href*="/groups/"][href*="/posts/"]')
        const postUrl = linkElement ? linkElement.href : ''
        return {
          content: textContent.substring(0, 500) + '...',
          address,
          price,
          postUrl,
          date: new Date().toISOString()
        }
      })
    })
    const dealPosts = posts.filter(post => {
      const content = post.content.toLowerCase()
      return (
        (content.includes('property') || content.includes('house') || content.includes('home')) &&
        (content.includes('sale') || content.includes('selling') || content.includes('deal') || content.includes('wholesale'))
      )
    })
    const deals = dealPosts.map(post => this.formatDeal(post))
    return deals
  }

  formatDeal(rawDeal) {
    const addressParts = rawDeal.address.split(',')
    const city = addressParts.length > 1 ? addressParts[1].trim() : 'Unknown'
    const state = addressParts.length > 2 ? addressParts[2].trim() : 'Unknown'
    let askingPrice = 0
    if (rawDeal.price !== 'Unknown Price') {
      const priceMatch = rawDeal.price.match(/\d+/g)
      if (priceMatch) {
        askingPrice = parseInt(priceMatch.join(''))
      }
    }
    const estimatedArv = askingPrice * 1.4
    const repairCost = askingPrice * 0.15
    const potentialProfit = estimatedArv - askingPrice - repairCost
    return {
      id: `fb-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      address: rawDeal.address,
      city,
      state,
      zipCode: 'Unknown',
      propertyType: 'Unknown',
      beds: 0,
      baths: 0,
      sqft: 0,
      yearBuilt: 0,
      askingPrice,
      estimatedArv,
      repairCost,
      potentialProfit,
      source: 'Facebook',
      sourceUrl: rawDeal.postUrl,
      description: rawDeal.content,
      datePosted: rawDeal.date
    }
  }

  async search(params) {
    try {
      if (!await this.isLoggedIn()) {
        await this.login()
      }
      const groups = await this.searchGroups(params.location)
      let allDeals = []
      for (const group of groups) {
        const deals = await this.searchGroupForDeals(group.id, params)
        allDeals = [...allDeals, ...deals]
      }
      return allDeals
    } catch (error) {
      console.error('Error searching Facebook:', error)
      throw error
    }
  }
}
