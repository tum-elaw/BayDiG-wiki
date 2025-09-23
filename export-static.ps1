# Static Export Script for BayDiG Wiki
# This script exports the artikel content for hosting on GitHub Pages

Write-Host "BayDiG Wiki Static Export for GitHub Pages" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "Using Node.js version: $nodeVersion" -ForegroundColor Yellow
} catch {
    Write-Error "Node.js is not installed or not in PATH. Please install Node.js first."
    exit 1
}

# Check if we're in the correct directory
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Please run this script from the BayDiG-wiki root directory."
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install dependencies."
        exit 1
    }
}

# Run the static export script
Write-Host "Starting static export..." -ForegroundColor Yellow
node script/export-static-artikel.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nStatic export completed successfully!" -ForegroundColor Green
    Write-Host "The exported files are in the 'static-export' directory." -ForegroundColor Green
    Write-Host "`nTo deploy to GitHub Pages:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository or use an existing one" -ForegroundColor White
    Write-Host "2. Copy all files from 'static-export' to your repository" -ForegroundColor White
    Write-Host "3. Commit and push the files" -ForegroundColor White
    Write-Host "4. Enable GitHub Pages in repository settings (Settings > Pages)" -ForegroundColor White
    Write-Host "5. Select 'Deploy from a branch' and choose 'main' branch" -ForegroundColor White
} else {
    Write-Error "Static export failed. Check the error messages above."
    exit 1
}