# BayDiG Wiki Static Export

This document explains how to create a static export of the BayDiG Wiki that can be hosted on GitHub Pages.

## Overview

The static export process creates a standalone HTML version of the wiki that includes:

- All artikel pages in English
- Static assets (CSS, JavaScript, images)
- Simplified navigation suitable for static hosting
- No dynamic features (search, comments, etc.)

## Prerequisites

- Node.js (version 16.13.1 or later)
- All npm dependencies installed (`npm install`)

## Running the Export

### Option 1: PowerShell Script (Windows)

```powershell
.\export-static.ps1
```

### Option 2: Direct Node.js Script

```bash
node script/export-static-artikel.js
```

## Output

The export creates a `static-export` directory containing:

```
static-export/
├── index.html                 # Redirect to artikel section
├── en/
│   └── artikel/
│       ├── index.html         # Main artikel index
│       ├── allgemeines/
│       │   ├── index.html
│       │   ├── beitrag1.html
│       │   ├── beitrag2.html
│       │   └── ...
│       ├── digitalerechte/
│       │   ├── index.html
│       │   ├── beitrag3.html
│       │   └── ...
│       └── digitaleverwaltung/
│           ├── index.html
│           ├── beitrag10.html
│           └── ...
├── dist/                      # Compiled assets
├── assets/                    # Images and fonts
└── stylesheets/              # CSS files
```

## Deploying to GitHub Pages

### Step 1: Create GitHub Repository

1. Create a new GitHub repository or use an existing one
2. Clone the repository locally

### Step 2: Copy Static Files

Copy all contents from the `static-export` directory to your GitHub Pages repository:

```bash
cp -r static-export/* /path/to/your/github-pages-repo/
```

### Step 3: Commit and Push

```bash
cd /path/to/your/github-pages-repo
git add .
git commit -m "Add BayDiG Wiki static export"
git push origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Choose the `main` branch and `/root` folder
5. Click "Save"

Your wiki will be available at: `https://username.github.io/repository-name`

## What's Changed for Static Hosting

The following modifications are made during export to ensure compatibility with static hosting:

### Removed Features
- Search functionality
- Comment system (Giscus)
- Language switcher
- Version switcher
- Dynamic content loading

### Modified Features
- All links converted to relative paths
- Asset references updated for static serving
- Navigation simplified
- Root redirect added for easy access

### Preserved Features
- All artikel content and formatting
- Article navigation
- Styling and layout
- Images and assets
- Table of contents

## Limitations

1. **No Search**: The exported site doesn't include search functionality
2. **No Comments**: Interactive features like Giscus comments are disabled
3. **Static Content**: Content must be re-exported when articles are updated
4. **Single Language**: Only English content is exported

## Customization

To modify the export process:

1. Edit `script/export-static-artikel.js` to change:
   - Which pages to include
   - Asset path rewriting logic
   - Output structure

2. Modify the `RewriteAssetPathsPlugin` class to customize:
   - Link rewriting rules
   - Asset handling
   - Content modifications

## Troubleshooting

### Common Issues

**Build Errors**: Ensure all dependencies are installed and Node.js version is correct
```bash
npm install
node --version  # Should be 16.13.1 or later
```

**Missing Pages**: Check that the artikel pages exist and have proper frontmatter

**Asset Issues**: Verify that the build process completed successfully and all assets are in the correct directories

**GitHub Pages Not Loading**: 
- Check GitHub Pages settings
- Ensure `index.html` exists in the root
- Verify repository is public (for free GitHub accounts)

### Getting Help

If you encounter issues:

1. Check the console output for error messages
2. Verify the article structure matches the expected format
3. Ensure all required npm packages are installed
4. Check GitHub Pages deployment status in repository settings

## Development

To modify or extend the export functionality:

1. The main export logic is in `script/export-static-artikel.js`
2. Asset rewriting is handled by the `RewriteAssetPathsPlugin` class
3. Page discovery uses the existing `loadPageMap` function from the main application
4. The export leverages the same rendering pipeline as the live site