#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Simple static export for BayDiG Wiki
console.log('BayDiG Wiki Static Export')
console.log('=========================')

async function main() {
  try {
    // Set environment variables for English-only processing
    process.env.NODE_ENV = 'production'
    process.env.ENABLED_LANGUAGES = 'en'
    console.log('Environment: NODE_ENV=production, ENABLED_LANGUAGES=en\n')

    // Import required modules
    console.log('Loading required modules...')
    const createApp = require('../lib/app')
    const scrape = require('website-scraper')
    const rimraf = require('rimraf').sync
    const { loadPageMap } = require('../lib/page-data')

    const port = '4001'
    const host = `http://localhost:${port}`
    const outputDirectory = path.join(__dirname, '../static-export')
    const tempDirectory = path.join(__dirname, '../website-scraper-temp')

    console.log('✓ Modules loaded successfully')

    // Build production assets
    console.log('\nBuilding production assets...')
    try {
      execSync('npm run build', { 
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_ENV: 'production',
          ENABLED_LANGUAGES: 'en'
        }
      })
      console.log('✓ Build completed')
    } catch (error) {
      console.error('Build failed:', error.message)
      return false
    }

    // Get artikel pages
    console.log('\nDiscovering artikel pages...')
    const pageMap = await loadPageMap()
    const artikelPages = Object.keys(pageMap).filter(key => 
      key.includes('/artikel/') && key.startsWith('/en/')
    )
    
    console.log(`✓ Found ${artikelPages.length} artikel pages`)

    // Prepare URLs
    const urls = [
      `${host}/en/artikel`,
      ...artikelPages.map(href => `${host}${href}`)
    ]

    console.log(`\nPreparing to scrape ${urls.length} URLs...`)

    // Clean directories
    rimraf(tempDirectory)
    rimraf(outputDirectory)
    fs.mkdirSync(outputDirectory, { recursive: true })

    // Simple asset rewriter
    class SimpleAssetRewriter {
      apply(registerAction) {
        registerAction('onResourceSaved', async ({ resource }) => {
          process.stdout.write('.')
          
          if (!resource.isHtml()) return

          const text = resource.getText()
          const newText = text
            // Fix asset paths
            .replace(/src="\/dist\//g, 'src="./dist/')
            .replace(/href="\/dist\//g, 'href="./dist/')
            .replace(/src="\/assets\//g, 'src="./assets/')
            .replace(/href="\/assets\//g, 'href="./assets/')
            // Fix internal links
            .replace(/href="\/artikel\//g, 'href="./artikel/')
            .replace(/href="\/en\/artikel\//g, 'href="./artikel/')

          const filePath = path.join(tempDirectory, resource.getFilename())
          await fs.promises.writeFile(filePath, newText, 'binary')
        })
      }
    }

    // Scraper options
    const scraperOptions = {
      urls,
      urlFilter: (url) => url.startsWith(`http://localhost:${port}/`),
      directory: tempDirectory,
      filenameGenerator: 'bySiteStructure',
      requestConcurrency: 6,
      plugins: [new SimpleAssetRewriter()]
    }    // Start server and scrape
    console.log('\nStarting server...')
    const app = createApp()
    const server = app.listen(port, async () => {
      console.log(`✓ Server running on ${host}`)
      console.log('Starting scraping process...')
      
      try {
        // Defensive scraper function detection
        let scraperFunction = scrape
        if (typeof scrape !== 'function') {
          if (scrape && typeof scrape.scrape === 'function') {
            scraperFunction = scrape.scrape
          } else if (scrape && typeof scrape.default === 'function') {
            scraperFunction = scrape.default
          } else {
            throw new Error('Could not find scraping function in website-scraper module')
          }
        }

        await scraperFunction(scraperOptions)
        
        // Move files
        const scrapedPath = path.join(tempDirectory, `localhost_${port}`)
        if (fs.existsSync(scrapedPath)) {
          fs.renameSync(scrapedPath, outputDirectory)
          
          // Create index redirect
          const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>BayDiG Wiki</title>
    <meta http-equiv="refresh" content="0; url=./en/artikel/">
    <link rel="canonical" href="./en/artikel/">
</head>
<body>
    <h1>BayDiG Wiki</h1>
    <p>Redirecting to <a href="./en/artikel/">BayDiG Wiki Artikel</a>...</p>
</body>
</html>`
          fs.writeFileSync(path.join(outputDirectory, 'index.html'), indexContent)
          
          console.log('\n\n✓ Export completed successfully!')
          console.log(`Files saved to: ${path.relative(process.cwd(), outputDirectory)}`)
          
          console.log('\nNext steps:')
          console.log('1. Copy contents of static-export/ to your GitHub Pages repository')
          console.log('2. Commit and push to GitHub')
          console.log('3. Enable GitHub Pages in repository settings')
          
        } else {
          console.error('✗ Scraping failed: no content found')
        }
      } catch (error) {
        console.error('✗ Scraping error:', error.message)
      } finally {
        rimraf(tempDirectory)
        server.close()
        process.exit(0)
      }
    })

    server.on('error', (error) => {
      console.error('✗ Server error:', error.message)
      process.exit(1)
    })

  } catch (error) {
    console.error('✗ Script error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = main
