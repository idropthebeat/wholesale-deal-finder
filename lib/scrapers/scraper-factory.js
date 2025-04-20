import FacebookScraper from './facebook-scraper'
import RedditScraper from './reddit-scraper'
import KeygleeScraper from './keyglee-scraper'

export default class ScraperFactory {
  static createScraper(platform, credentials) {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return new FacebookScraper(credentials)
      case 'reddit':
        return new RedditScraper(credentials)
      case 'keyglee':
        return new KeygleeScraper(credentials)
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }
  }
}
