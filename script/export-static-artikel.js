#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const createApp = require('../lib/app')
const port = '4001'
const host = `http://localhost:${port}`
const scrape = require('website-scraper')
const rimraf = require('rimraf').sync
const { loadPageMap } = require('../lib/page-data')

// Static export script for BayDiG Wiki - Artikel section for GitHub Pages
// This script exports only the artikel content with English language

const outputDirectory = path.join(__dirname, '../static-export')
const tempDirectory = path.join(__dirname, '../website-scraper-temp')

class RewriteAssetPathsPlugin {
  constructor (tempDirectory) {
    this.tempDirectory = tempDirectory
  }

  apply (registerAction) {    registerAction('onResourceSaved', async ({ resource }) => {
      // Show progress
      process.stdout.write('.')

      // Only operate on HTML and CSS files
      if (!resource.isHtml() && !resource.isCss()) return

      // Get the text contents of the resource
      const text = resource.getText()
      let newBody = ''

      if (resource.isHtml()) {
        // Rewrite asset paths to be relative for GitHub Pages
        newBody = text
          // Fix asset paths to be relative
          .replace(/(?<attribute>src|href)="(?:\.\.\/)*(?<basepath>dist|javascripts|stylesheets|assets\/fonts|assets\/images|node_modules)/g,
            (match, attribute, basepath) => {
              const replaced = basepath.startsWith('assets') ? basepath : `dist/${basepath}`
              return `${attribute}="./${replaced}`
            })
          // Fix internal links to artikel pages to be relative HTML files
          .replace(/href="\/artikel\//g, 'href="./artikel/')
          .replace(/href="\/en\/artikel\//g, 'href="./artikel/')
          // Convert .md links to .html
          .replace(/href="([^"]*?)\.md"/g, 'href="$1.html"')
          // Fix root links to be relative
          .replace(/href="\//g, 'href="./')
          // Remove language switcher and version switcher content
          .replace(/<details[^>]*class="[^"]*dropdown-withArrow[^"]*"[^>]*>[\s\S]*?<\/details>/g, '')
          // Remove search functionality
          .replace(/<div[^>]*class="[^"]*search[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
          // Remove Giscus comments
          .replace(/<div[^>]*class="[^"]*no-print[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
          // Simplify navigation for static export
          .replace(/\/en\//g, '/')
          // Ensure proper HTML structure
          .replace(/<html[^>]*>/g, '<html lang="en">')
      }

      if (resource.isCss()) {
        // Fix CSS asset references
        newBody = text.replace(
          /url\("(?:\.\.\/)*(?<basepath>assets\/fonts|assets\/images)/g,
          (match, basepath) => `url("./${basepath}`
        )
      }

      const filePath = path.join(this.tempDirectory, resource.getFilename())
      await fs.promises.writeFile(filePath, newBody, 'binary')
    })
  }
}

async function main () {
  console.log('Starting static export of BayDiG Wiki artikel pages for GitHub Pages...\n')

  // Set environment variables for English-only build
  process.env.NODE_ENV = 'production'
  process.env.ENABLED_LANGUAGES = 'en'
  console.log('Environment: NODE_ENV=production, ENABLED_LANGUAGES=en')

  // Build production assets
  console.log('Building production assets...')
  try {
    execSync('npm run build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        ENABLED_LANGUAGES: 'en'
      }
    })
  } catch (error) {
    console.error('Build failed:', error.message)
    process.exit(1)
  }
  console.log('Production assets built successfully.\n')

  // Get all artikel pages
  console.log('Loading page map and finding artikel pages...')
  const pageMap = await loadPageMap()
  
  // Find all artikel pages for English version
  const artikelPermalinks = Object.keys(pageMap)
    .filter(key => {
      // Only include artikel pages in English
      return key.includes('/artikel/') && key.startsWith('/en/')
    })

  console.log(`Found ${artikelPermalinks.length} artikel pages to export`)

  // URLs to scrape
  const urls = [
    `${host}/en/artikel`, // Main artikel index page
    ...artikelPermalinks.map(href => `${host}${href}`)
  ]

  console.log(`\nURLs to scrape:\n${urls.slice(0, 5).join('\n')}`)
  if (urls.length > 5) {
    console.log(`... and ${urls.length - 5} more`)
  }
  console.log('')

  // Clean up directories
  rimraf(tempDirectory)
  rimraf(outputDirectory)
  fs.mkdirSync(outputDirectory, { recursive: true })

  const scraperOptions = {
    urls,
    urlFilter: (url) => {
      // Only download from our local server
      return url.startsWith(`http://localhost:${port}/`)
    },
    directory: tempDirectory,
    filenameGenerator: 'bySiteStructure',
    requestConcurrency: 6,
    plugins: [new RewriteAssetPathsPlugin(tempDirectory)],
    httpResponseHandler: (response) => {
      // Log any 404s or errors
      if (response.statusCode >= 400) {
        console.log(`\nHTTP ${response.statusCode}: ${response.url}`)
      }
      return response.statusCode < 400
    }
  }
  console.log('Starting server and scraping...')
  const app = createApp()
  const server = app.listen(port, async () => {
    console.log(`Server started on ${host}`)
    
    try {
      // Defensive scraper import
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
      
      // Move scraped content to final location
      const scrapedPath = path.join(tempDirectory, `localhost_${port}`)
      if (fs.existsSync(scrapedPath)) {
        // Copy content to output directory
        fs.renameSync(scrapedPath, outputDirectory)
        console.log(`\n\nStatic export completed! Files saved to: ${path.relative(process.cwd(), outputDirectory)}`)
        
        // Create a simple index.html redirect for GitHub Pages
        const indexContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>BayDiG Wiki</title>
    <meta http-equiv="refresh" content="0; url=./en/artikel/">
    <link rel="canonical" href="./en/artikel/">
</head>
<body>
    <p>Redirecting to <a href="./en/artikel/">BayDiG Wiki Artikel</a>...</p>
</body>
</html>`
        fs.writeFileSync(path.join(outputDirectory, 'index.html'), indexContent)
        
        console.log('\nNext steps for GitHub Pages:')
        console.log('1. Copy the contents of static-export/ to your GitHub Pages repository')
        console.log('2. Commit and push to GitHub')
        console.log('3. Enable GitHub Pages in repository settings')
        console.log('\nNote: Dynamic features like search and comments have been removed for static hosting.')
        
      } else {
        console.error('Scraping failed: scraped content not found')
      }
    } catch (error) {
      console.error('Scraping error:', error)
    } finally {
      // Clean up
      rimraf(tempDirectory)
      server.close()
      process.exit(0)
    }
  })

  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error)
    process.exit(1)
  })
}

if (require.main === module) {
  main().catch(error => {
    console.error('Script error:', error)
    process.exit(1)
  })
}

module.exports = main
