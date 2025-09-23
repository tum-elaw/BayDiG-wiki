#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const http = require('http')

// Simple static export using direct HTTP requests instead of website-scraper
console.log('BayDiG Wiki Simple Static Export')
console.log('=================================')

async function main() {
  try {
    // Set environment variables
    process.env.NODE_ENV = 'production'
    process.env.ENABLED_LANGUAGES = 'en'
    console.log('Environment: NODE_ENV=production, ENABLED_LANGUAGES=en\n')

    // Build assets
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
      console.log('✓ Build completed')
    } catch (error) {
      console.error('Build failed, continuing anyway...')
    }

    // Import modules after setting environment
    const createApp = require('../lib/app')
    const rimraf = require('rimraf').sync

    const port = '4001'
    const host = `http://localhost:${port}`
    const outputDirectory = path.join(__dirname, '../static-export')

    console.log('✓ Modules loaded')

    // Discover artikel pages from filesystem
    console.log('\nDiscovering artikel pages...')
    const artikelUrls = []
    const contentDir = path.join(__dirname, '../content/artikel')
    
    // Add main pages
    const mainPages = [
      '/en/artikel',
      '/en/artikel/allgemeines', 
      '/en/artikel/digitalerechte',
      '/en/artikel/digitaleverwaltung'
    ]
    
    // Add individual articles
    const categories = ['allgemeines', 'digitalerechte', 'digitaleverwaltung']
    for (const category of categories) {
      const categoryPath = path.join(contentDir, category)
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath)
        for (const file of files) {
          if (file.endsWith('.md') && file !== 'index.md') {
            const articleName = file.replace('.md', '')
            artikelUrls.push(`/en/artikel/${category}/${articleName}`)
          }
        }
      }
    }

    const allUrls = [...mainPages, ...artikelUrls]
    console.log(`✓ Found ${allUrls.length} pages to export`)

    // Clean and create output directory
    rimraf(outputDirectory)
    fs.mkdirSync(outputDirectory, { recursive: true })

    // Start server
    console.log('\nStarting server...')
    const app = createApp()
    const server = app.listen(port, async () => {
      console.log(`✓ Server running on ${host}`)
      
      try {
        // Simple fetch function
        async function fetchPage(url) {
          return new Promise((resolve, reject) => {
            const fullUrl = `${host}${url}`
            console.log(`Fetching: ${url}`)
            
            http.get(fullUrl, (res) => {
              if (res.statusCode !== 200) {
                console.log(`⚠️  HTTP ${res.statusCode}: ${url}`)
                resolve(null)
                return
              }
              
              let data = ''
              res.on('data', chunk => data += chunk)
              res.on('end', () => {
                // Simple asset path fixing
                const fixedHtml = data
                  .replace(/src="\/dist\//g, 'src="./dist/')
                  .replace(/href="\/dist\//g, 'href="./dist/')
                  .replace(/src="\/assets\//g, 'src="./assets/')
                  .replace(/href="\/assets\//g, 'href="./assets/')
                  .replace(/src="\/stylesheets\//g, 'src="./stylesheets/')
                  .replace(/href="\/stylesheets\//g, 'href="./stylesheets/')
                  .replace(/href="\/artikel\//g, 'href="./artikel/')
                  .replace(/href="\/en\/artikel\//g, 'href="./artikel/')
                
                resolve({ url, html: fixedHtml })
              })
            }).on('error', reject)
          })
        }

        // Fetch all pages
        console.log('Fetching pages...')
        const results = []
        for (const url of allUrls) {
          const result = await fetchPage(url)
          if (result) {
            results.push(result)
            process.stdout.write('.')
          }
        }

        console.log(`\n✓ Fetched ${results.length} pages`)

        // Save pages
        console.log('Saving pages...')
        for (const { url, html } of results) {
          const filePath = url === '/en/artikel' 
            ? path.join(outputDirectory, 'en', 'artikel', 'index.html')
            : path.join(outputDirectory, url.substring(1) + '.html')
          
          const dir = path.dirname(filePath)
          fs.mkdirSync(dir, { recursive: true })
          fs.writeFileSync(filePath, html)
        }        // Copy static assets
        console.log('Copying static assets...')
        
        function copyDirRecursive(src, dest) {
          if (!fs.existsSync(src)) return
          
          fs.mkdirSync(dest, { recursive: true })
          const items = fs.readdirSync(src)
          
          for (const item of items) {
            const srcPath = path.join(src, item)
            const destPath = path.join(dest, item)
            
            if (fs.statSync(srcPath).isDirectory()) {
              copyDirRecursive(srcPath, destPath)
            } else {
              fs.copyFileSync(srcPath, destPath)
            }
          }
        }
        
        const assetDirs = ['dist', 'assets', 'stylesheets']
        for (const assetDir of assetDirs) {
          const srcDir = path.join(__dirname, '..', assetDir)
          const destDir = path.join(outputDirectory, assetDir)
          
          if (fs.existsSync(srcDir)) {
            console.log(`Copying ${assetDir}...`)
            copyDirRecursive(srcDir, destDir)
          }
        }

        // Create root index
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

        console.log('\n✅ Export completed successfully!')
        console.log(`📁 Files saved to: ${path.relative(process.cwd(), outputDirectory)}`)
        
        console.log('\n📋 Next steps for GitHub Pages:')
        console.log('1. Copy contents of static-export/ to your GitHub Pages repository')
        console.log('2. git add . && git commit -m "Add wiki export" && git push')
        console.log('3. Enable GitHub Pages in repository Settings > Pages')

      } catch (error) {
        console.error('❌ Export error:', error.message)
      } finally {
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
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = main
