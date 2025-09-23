#!/usr/bin/env node

// Simple test script to verify basic functionality
console.log('Testing basic module imports...')

try {
  const fs = require('fs')
  const path = require('path')
  console.log('✓ Node.js built-in modules loaded')
  
  const createApp = require('../lib/app')
  console.log('✓ createApp imported')
  
  const { loadPageMap } = require('../lib/page-data')
  console.log('✓ loadPageMap imported')
  
  const scrape = require('website-scraper')
  console.log('✓ website-scraper imported')
  
  console.log('\nAll imports successful! The export script should work.')
  console.log('You can now run: node script/export-static-artikel.js')
  
} catch (error) {
  console.error('Import error:', error.message)
  console.error('Stack:', error.stack)
}
