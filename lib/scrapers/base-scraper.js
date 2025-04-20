import puppeteer from 'puppeteer'

export default class BaseScraper {
  constructor(credentials = null) {
    this.credentials = credentials
    this.browser = null
    this.page = null
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    this.page = await this.browser.newPage()
    await this.page.setViewport({ width: 1280, height: 800 })
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
      this.page = null
    }
  }

  async login() {
    throw new Error('Login method must be implemented by subclass')
  }

  async search(params) {
    throw new Error('Search method must be implemented by subclass')
  }

  async isLoggedIn() {
    throw new Error('isLoggedIn method must be implemented by subclass')
  }

  async waitForNavigation() {
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' })
  }

  async waitForSelector(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout })
  }

  async typeIntoField(selector, text) {
    await this.page.type(selector, text)
  }

  async clickElement(selector) {
    await this.page.click(selector)
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  }
}
