#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// BayDiG Wiki Static Export - Robust Version
console.log('BayDiG Wiki Static Export (Robust Version)')
console.log('===========================================')

async function main() {
  try {
    // Set environment variables early
    process.env.NODE_ENV = 'production'
    process.env.ENABLED_LANGUAGES = 'en'
    console.log('Environment: NODE_ENV=production, ENABLED_LANGUAGES=en\n')

    // Build webpack assets first (separate from Next.js build)
    console.log('Building webpack assets...')
    try {
      execSync('npm run webpack-build', { 
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_ENV: 'production',
          ENABLED_LANGUAGES: 'en'
        }
      })
      console.log('✓ Webpack build completed')
    } catch (error) {
      console.error('Webpack build failed:', error.message)
      console.log('Continuing with Next.js build...')
    }

    // Build Next.js
    console.log('\nBuilding Next.js application...')
    try {
      execSync('npx next build', { 
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_ENV: 'production',
          ENABLED_LANGUAGES: 'en'
        }
      })
      console.log('✓ Next.js build completed')
    } catch (error) {
      console.error('Next.js build failed:', error.message)
      console.log('Trying alternative build approach...')
      
      // Try with limited scope
      try {
        execSync('npx next build --experimental-build-mode=compile', { 
          stdio: 'inherit',
          env: {
            ...process.env,
            NODE_ENV: 'production',
            ENABLED_LANGUAGES: 'en'
          }
        })
      } catch (altError) {
        console.log('Alternative build also failed, proceeding with existing assets...')
      }
    }

    // Import modules after setting environment
    console.log('\nLoading application modules...')
    const createApp = require('../lib/app')
    const scrape = require('website-scraper')
    const rimraf = require('rimraf').sync

    const port = '4001'
    const host = `http://localhost:${port}`
    const outputDirectory = path.join(__dirname, '../static-export')
    const tempDirectory = path.join(__dirname, '../website-scraper-temp')

    console.log('✓ Modules loaded successfully')

    // Start with a simple URL list (avoiding pageMap issues)
    console.log('\nPreparing artikel URLs...')
    const baseUrls = [
      `${host}/en/artikel`,
      `${host}/en/artikel/allgemeines`,
      `${host}/en/artikel/digitalerechte`,
      `${host}/en/artikel/digitaleverwaltung`
    ]

    // Add individual article URLs based on filesystem
    const artikelUrls = []
    const contentDir = path.join(__dirname, '../content/artikel')
    
    try {
      const categories = ['allgemeines', 'digitalerechte', 'digitaleverwaltung']
      for (const category of categories) {
        const categoryPath = path.join(contentDir, category)
        if (fs.existsSync(categoryPath)) {
          const files = fs.readdirSync(categoryPath)
          for (const file of files) {
            if (file.endsWith('.md') && file !== 'index.md') {
              const articleName = file.replace('.md', '')
              artikelUrls.push(`${host}/en/artikel/${category}/${articleName}`)
            }
          }
        }
      }
      console.log(`✓ Found ${artikelUrls.length} artikel pages`)
    } catch (error) {
      console.log('Warning: Could not scan artikel files, using basic URLs only')
    }

    const allUrls = [...baseUrls, ...artikelUrls]
    console.log(`Total URLs to scrape: ${allUrls.length}`)

    // Clean directories
    rimraf(tempDirectory)
    rimraf(outputDirectory)
    fs.mkdirSync(outputDirectory, { recursive: true })

    // Simple asset rewriter
    class AssetRewriter {
      apply(registerAction) {
        registerAction('onResourceSaved', async ({ resource }) => {
          process.stdout.write('.')
          
          if (!resource.isHtml()) return

          const text = resource.getText()
          const newText = text
            // Fix asset paths to be relative
            .replace(/src="\/dist\//g, 'src="./dist/')
            .replace(/href="\/dist\//g, 'href="./dist/')
            .replace(/src="\/assets\//g, 'src="./assets/')
            .replace(/href="\/assets\//g, 'href="./assets/')
            .replace(/src="\/stylesheets\//g, 'src="./stylesheets/')
            .replace(/href="\/stylesheets\//g, 'href="./stylesheets/')
            // Fix internal artikel links
            .replace(/href="\/artikel\//g, 'href="./artikel/')
            .replace(/href="\/en\/artikel\//g, 'href="./artikel/')
            // Remove dynamic elements
            .replace(/<div[^>]*class="[^"]*search[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
            .replace(/<details[^>]*dropdown-withArrow[\s\S]*?<\/details>/g, '')

          const filePath = path.join(tempDirectory, resource.getFilename())
          await fs.promises.writeFile(filePath, newText, 'binary')
        })
      }
    }

    // Scraper configuration
    const scraperOptions = {
      urls: allUrls,
      urlFilter: (url) => url.startsWith(`http://localhost:${port}/`),
      directory: tempDirectory,
      filenameGenerator: 'bySiteStructure',
      requestConcurrency: 4,
      plugins: [new AssetRewriter()],
      httpResponseHandler: (response) => {
        if (response.statusCode >= 400) {
          console.log(`\nHTTP ${response.statusCode}: ${response.url}`)
        }
        return response.statusCode < 400
      }
    }    // Start server and scrape
    console.log('\nStarting development server...')
    const app = createApp()
    const server = app.listen(port, async () => {
      console.log(`✓ Server running on ${host}`)
      console.log('Beginning scraping process...')
      
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
        
        // Move scraped content
        const scrapedPath = path.join(tempDirectory, `localhost_${port}`)
        if (fs.existsSync(scrapedPath)) {
          fs.renameSync(scrapedPath, outputDirectory)
          
          // Create root index.html
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
    <p>Redirecting to <a href="./en/artikel/">Artikel section</a>...</p>
</body>
</html>`
          fs.writeFileSync(path.join(outputDirectory, 'index.html'), indexContent)
          
          console.log('\n\n✅ Export completed successfully!')
          console.log(`📁 Files saved to: ${path.relative(process.cwd(), outputDirectory)}`)
          
          console.log('\n📋 Next steps for GitHub Pages:')
          console.log('1. Copy contents of static-export/ to your GitHub Pages repository')
          console.log('2. git add . && git commit -m "Add wiki export" && git push')
          console.log('3. Enable GitHub Pages in repository Settings > Pages')
          console.log('4. Select "Deploy from a branch" and choose "main"')
          
        } else {
          console.error('❌ Export failed: No content was scraped')
        }
      } catch (error) {
        console.error('❌ Scraping error:', error.message)
      } finally {
        rimraf(tempDirectory)
        server.close()
        process.exit(0)
      }
    })

    server.on('error', (error) => {
      console.error('❌ Server error:', error.message)
      process.exit(1)
    })

  } catch (error) {
    console.error('❌ Script error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = main
