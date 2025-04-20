import BaseScraper from './base-scraper'

export default class RedditScraper extends BaseScraper {
  constructor(credentials) {
    super(credentials)
    this.baseUrl = 'https://www.reddit.com'
    this.loginUrl = 'https://www.reddit.com/login'
  }

  async login() {
    if (!this.credentials || !this.credentials.username || !this.credentials.password) {
      throw new Error('Reddit credentials are required')
    }
    await this.page.goto(this.loginUrl)
    await this.waitForSelector('input[name="username"]')
    await this.typeIntoField('input[name="username"]', this.credentials.username)
    await this.typeIntoField('input[name="password"]', this.credentials.password)
    await this.clickElement('button[type="submit"]')
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' })
    if (!await this.isLoggedIn()) {
      throw new Error('Reddit login failed')
    }
    return true
  }

  async isLoggedIn() {
    try {
      await this.page.waitForSelector('button[aria-label="Create Post"]', { timeout: 5000 })
      return true
    } catch (error) {
      return false
    }
  }

  async searchSubreddits() {
    return ['WholesaleRealestate', 'realestateinvesting', 'RealEstate', 'OffMarketDeals']
  }

  async searchSubredditForDeals(subreddit, params) {
    await this.page.goto(`${this.baseUrl}/r/${subreddit}/search/?q=${encodeURIComponent(params.location)}&restrict_sr=1&sort=new`)
    await this.waitForSelector('div[data-testid="post-container"]')
    for (let i = 0; i < 3; i++) {
      await this.scrollToBottom()
      await this.page.waitForTimeout(2000)
    }
    const posts = await this.page.$$eval('div[data-testid="post-container"]', elements => {
      return elements.map(el => {
        const titleElement = el.querySelector('h3')
        const title = titleElement ? titleElement.textContent : ''
        const contentElement = el.querySelector('div[data-click-id="text"] p')
        const content = contentElement ? contentElement.textContent : ''
        const linkElement = el.querySelector('a[data-click-id="body"]')
        const postUrl = linkElement ? linkElement.href : ''
        const dateElement = el.querySelector('span[data-testid="post_timestamp"]')
        const datePosted = dateElement ? dateElement.textContent : ''
        return { title, content, postUrl, datePosted }
      })
    })
    const dealPosts = posts.filter(post => {
      const titleLower = post.title.toLowerCase()
      const contentLower = post.content.toLowerCase()
      return (
        (titleLower.includes('property') || titleLower.includes('house') || titleLower.includes('home') ||
         contentLower.includes('property') || contentLower.includes('house') || contentLower.includes('home')) &&
        (titleLower.includes('sale') || titleLower.includes('selling') || titleLower.includes('deal') || titleLower.includes('wholesale') ||
         contentLower.includes('sale') || contentLower.includes('selling') || contentLower.includes('deal') || contentLower.includes('wholesale'))
      )
    })
    const deals = dealPosts.map(post => this.formatDeal(post, subreddit))
    return deals
  }

  formatDeal(rawDeal, subreddit) {
    const combinedText = `${rawDeal.title} ${rawDeal.content}`
    const addressMatch = combinedText.match(/\d+\s+[A-Za-z\s]+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Ln|Rd|Blvd|Dr|St)\.?/i)
    const address = addressMatch ? addressMatch[0] : 'Unknown Address'
    const cityStateMatch = combinedText.match(/([A-Za-z\s]+),\s*([A-Z]{2})/i)
    const city = cityStateMatch ? cityStateMatch[1].trim() : 'Unknown'
    const state = cityStateMatch ? cityStateMatch[2].trim() : 'Unknown'
    let askingPrice = 0
    if (combinedText.match(/\$\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i)) {
      const priceMatch = combinedText.match(/\d+/g)
      if (priceMatch) {
        askingPrice = parseInt(priceMatch.join(''))
      }
    }
    const estimatedArv = askingPrice * 1.4
    const repairCost = askingPrice * 0.15
    const potentialProfit = estimatedArv - askingPrice - repairCost
    return {
      id: `reddit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      address,
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
      source: `Reddit (r/${subreddit})`,
      sourceUrl: rawDeal.postUrl,
      description: `${rawDeal.title}\n\n${rawDeal.content}`,
      datePosted: rawDeal.datePosted
    }
  }

  async search(params) {
    try {
      const subreddits = await this.searchSubreddits()
      let allDeals = []
      for (const subreddit of subreddits) {
        const deals = await this.searchSubredditForDeals(subreddit, params)
        allDeals = [...allDeals, ...deals]
      }
      return allDeals
    } catch (error) {
      console.error('Error searching Reddit:', error)
      throw error
    }
  }
}
