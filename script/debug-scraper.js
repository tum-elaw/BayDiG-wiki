#!/usr/bin/env node

// Quick test for website-scraper functionality
console.log('Testing website-scraper module structure...\n')

try {
  const websiteScraper = require('website-scraper')
  
  console.log('Module type:', typeof websiteScraper)
  console.log('Is function:', typeof websiteScraper === 'function')
  
  if (typeof websiteScraper === 'object') {
    console.log('Object keys:', Object.keys(websiteScraper))
    console.log('Has scrape method:', typeof websiteScraper.scrape === 'function')
    console.log('Has default:', typeof websiteScraper.default === 'function')
  }
  
  // Test with simple configuration
  console.log('\nTesting basic scraping functionality...')
  
  let scraperFunction
  if (typeof websiteScraper === 'function') {
    scraperFunction = websiteScraper
  } else if (websiteScraper && typeof websiteScraper.scrape === 'function') {
    scraperFunction = websiteScraper.scrape
  } else if (websiteScraper && typeof websiteScraper.default === 'function') {
    scraperFunction = websiteScraper.default
  } else {
    throw new Error('No scraping function found')
  }
  
  console.log('✓ Found scraping function:', typeof scraperFunction)
  console.log('✓ Ready to proceed with export')
  
} catch (error) {
  console.error('❌ Error:', error.message)
  console.error('❌ Stack:', error.stack)
}
