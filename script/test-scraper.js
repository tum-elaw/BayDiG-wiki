#!/usr/bin/env node

// Test website-scraper import and usage
console.log('Testing website-scraper module...')

try {
  const scrape = require('website-scraper')
  console.log('✓ website-scraper imported successfully')
  console.log('Type:', typeof scrape)
  console.log('Keys:', Object.keys(scrape))
  
  // Check if it's a function or object with methods
  if (typeof scrape === 'function') {
    console.log('✓ scrape is a function')
  } else if (scrape && typeof scrape.scrape === 'function') {
    console.log('✓ scrape.scrape is a function')
  } else if (scrape && typeof scrape.default === 'function') {
    console.log('✓ scrape.default is a function')
  } else {
    console.log('❌ Could not find scraping function')
    console.log('scrape object:', scrape)
  }
  
} catch (error) {
  console.error('❌ Import error:', error.message)
}
