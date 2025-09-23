@echo off
echo BayDiG Wiki Static Export for GitHub Pages
echo =========================================

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo Using Node.js version:
node --version

REM Check if we're in the correct directory
if not exist package.json (
    echo Error: package.json not found. Please run this script from the BayDiG-wiki root directory.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Error: Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo.
echo Starting static export...
echo.

REM Run the export script
node script\export-static-artikel.js

if errorlevel 1 (
    echo.
    echo Error: Static export failed. Check the error messages above.
    pause
    exit /b 1
) else (
    echo.
    echo Static export completed successfully!
    echo The exported files are in the 'static-export' directory.
    echo.
    echo To deploy to GitHub Pages:
    echo 1. Create a new repository or use an existing one
    echo 2. Copy all files from 'static-export' to your repository
    echo 3. Commit and push the files
    echo 4. Enable GitHub Pages in repository settings (Settings ^> Pages)
    echo 5. Select 'Deploy from a branch' and choose 'main' branch
    echo.
    pause
)
