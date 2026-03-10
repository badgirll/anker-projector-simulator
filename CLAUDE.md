# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A professional web application for simulating Anker Nebula projector screen sizes and projection distances. Features dual calculation modes (size-to-distance and distance-to-size), dual view visualization (top view and front view), and comprehensive model comparison tools. Built with vanilla HTML, CSS, and JavaScript - no build tools or dependencies required. Interface is in Japanese with custom Mont for Anker brand font.

## How to Run

Simply open `index.html` in any modern web browser. No server or build process needed.

For local development with live reload (optional):
```bash
# Using Python
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js (if available)
npx serve .
```

Then open http://localhost:8000 in your browser.

## Architecture

### Core Components

**index.html** - Two-mode interface with two-column layout
- Mode tabs: シミュレーション (single simulator) and モデル比較 (comparison tools)
- OGP meta tags for social media sharing (Facebook, Twitter, LINE)
  - og:image points to ogp.png (117KB)
  - Optimized preview for SNS sharing
- Left column: Calculation mode toggle (STEP 1), size/distance input with sliders (STEP 2/3), projector selection (STEP 2/3)
  - Desktop: Card-based projector selection with images
  - Mobile: Custom dropdown with product images and pricing
- Right column: View toggle (top view/front view), SVG visualization with "※概算値" captions, results display, purchase buttons (official + Amazon), product specs, room size guide
- Comparison mode: Size-distance table for all 7 projectors, side-by-side model comparison
- All text in Japanese

**app.js** - Application logic
- `projectorData` object: Database of 7 Nebula projector models with discrete data points, images, pricing, official/Amazon URLs, lumens, resolution, weight
- `interpolateScreenSize()`: Calculates screen size from distance using linear interpolation
- `interpolateDistance()`: Calculates distance from screen size using linear interpolation
- `calculate()`: Main calculation function supporting dual modes (size-to-distance and distance-to-size)
- `getProjectorRange()`: Calculates min/max size and distance for recommended ranges
- `renderProjectorCards()`: Generates projector selection cards with dynamic range display
- `drawTopView()`: Fixed-scale SVG top view with 65型TV as constant reference (150px), projection cone, distance visualization, and "※概算値" caption
- `drawFrontView()`: Front view showing screen size vs 2.4m wall height with door silhouette and "※概算値" caption
  - **CRITICAL Mobile Settings** (line ~1211): viewBoxWidth: 950, viewBoxStartX: -110, targetWallWidth: 93%
  - These values are the result of 6 iterations to prevent right-side clipping while maximizing display size
- `renderSizeDistanceTable()`: Generates 10-size × 7-projector comparison table with product images
- `renderModelComparison()`: Side-by-side comparison of two selected projectors
- Mobile optimizations: Font size multipliers (1.4x top view, 1.3x front view), viewBox adjustments

**styles.css** - Two-column responsive layout with Nebula branding
- Custom font integration: 5 weights of Mont for Anker (@font-face declarations)
- Left and right column grid layout that collapses to single column on mobile (<480px)
- Card-based projector selection on desktop, custom dropdown styling on mobile
- Mode tabs and view toggle button styling
- Purchase buttons: Nebula blue (#17BBEF) for official, Amazon orange (#FF9900)
- Size-distance comparison table with product image headers
- STEP badges for user guidance
- Japanese text support with Noto Sans JP fallback

### Calculation Method

Unlike traditional throw ratio calculations, this app uses discrete data points provided by Nebula with dual calculation modes:

**Mode 1: Size-to-Distance (default)**
1. User selects desired screen size in inches
2. App finds closest data points in the selected projector's specifications
3. Linear interpolation calculates the required projection distance
4. Screen dimensions calculated using 16:9 aspect ratio

**Mode 2: Distance-to-Size**
1. User enters available projection distance in meters
2. App finds closest data points in the selected projector's specifications
3. Linear interpolation calculates the achievable screen size
4. Screen dimensions calculated using 16:9 aspect ratio

For Nebula X1 (which has distance ranges with distanceMin/distanceMax), the app checks if values fall within any range.

**Fixed-Scale Visualization**: Top view uses 65型TV (143cm width) as a constant 150px reference, allowing projection screen and distance to scale relatively for accurate size comparison.

## Adding/Modifying Projectors

Edit the `projectorData` object in `app.js`. Each projector requires:
- `name`: Display name (e.g., "Nebula Cosmos 4K SE")
- `image`: Product image URL
- `price`: Pricing in yen (e.g., "¥199,900")
- `url`: Official Anker Japan product page URL
- `amazonUrl`: Amazon Japan product page URL with affiliate tracking
- `lumens`: Brightness in ANSI lumens (number, no spaces before "ANSIルーメン" in display)
- `resolution`: Display resolution (e.g., "4K", "フルHD", "HD")
- `weight`: Product weight (e.g., "約3kg")
- `type`: Projector type (e.g., "ホーム型", "ポータブル型")
- `dataPoints`: Array of objects with:
  - `screenSize`: Diagonal size in inches
  - `distance`: Projection distance in meters (for fixed-distance models)
  - OR `distanceMin`/`distanceMax`: Distance range in meters (for zoom models like X1)

Example for fixed-distance model:
```javascript
'model-id': {
    name: 'Nebula Model Name',
    image: 'https://www.ankerjapan.com/cdn/shop/files/product.jpg',
    price: '¥99,900',
    url: 'https://www.ankerjapan.com/products/xxx',
    amazonUrl: 'https://www.amazon.co.jp/dp/XXXXX?tag=aoositmdtlpg-22',
    lumens: 2000,
    resolution: '4K',
    weight: '約3kg',
    type: 'ホーム型',
    dataPoints: [
        { screenSize: 60, distance: 1.6 },
        { screenSize: 100, distance: 2.7 }
    ]
}
```

Example for zoom model:
```javascript
'model-id': {
    name: 'Nebula Model Name',
    image: 'https://www.ankerjapan.com/cdn/shop/files/product.jpg',
    price: '¥449,900',
    url: 'https://www.ankerjapan.com/products/xxx',
    amazonUrl: 'https://www.amazon.co.jp/dp/XXXXX?tag=aoositmdtlpg-22',
    lumens: 3500,
    resolution: '4K',
    weight: '約5kg',
    type: 'ホーム型',
    dataPoints: [
        { screenSize: 100, distanceMin: 2.0, distanceMax: 3.3 },
        { screenSize: 150, distanceMin: 3.0, distanceMax: 5.0 }
    ]
}
```

## Code Style Conventions

- Use vanilla JavaScript (ES6+) features
- Prefer template literals for HTML generation
- Use CSS custom properties (variables) for theming
- Keep functions focused and single-purpose
- Add comments for complex calculations

## Common Tasks

**Update projector specifications:**
- Modify the `projectorData` object in `app.js`
- Add or update data points, pricing, URLs, specs for each model

**Adjust layout:**
- Two-column layout controlled by `.two-column-layout` in `styles.css`
- Mobile breakpoint at 480px collapses to single column
- Visualization section with view toggle at top of right column
- Results, purchase buttons, specs, and room guide sections below

**Modify calculation modes:**
- Calculation mode toggle in left column switches between size-to-distance and distance-to-size
- Update `calculate()` function in `app.js` to adjust calculation logic

**Modify visualizations:**
- Edit `drawTopView()` function for top-down view (fixed-scale with 65型TV reference)
- Edit `drawFrontView()` function for front view (wall height comparison)
- Both functions support mobile font scaling and viewBox adjustments
- View toggle buttons in `index.html` switch between views

**Update comparison features:**
- Edit `renderSizeDistanceTable()` for the 10-size × 7-projector comparison table
- Edit `renderModelComparison()` for side-by-side 2-model comparison
- Table screen sizes array: `[35, 40, 60, 80, 100, 120, 150, 180, 200, 300]`

**Update OGP (social media preview):**
- Replace ogp.png in project root with new image (recommended size: 1200×630px)
- Update meta tags in index.html if needed (lines 8-25)
- Test with Facebook Share Debugger: https://developers.facebook.com/tools/debug/
- Test with Twitter Card Validator: https://cards-dev.twitter.com/validator

**Configure Vercel Analytics:**
- NEVER add `analytics` property to vercel.json (causes schema error)
- Enable through Vercel dashboard: Project → Analytics → Enable Analytics
- Speed Insights available in Pro plan

## Notes

- No external dependencies or API calls (except Google Fonts for Noto Sans JP)
- All data is client-side only (no backend)
- Calculations happen in real-time on input change
- All UI text is in Japanese
- Discrete data points with interpolation (not throw ratio formulas)
- Custom Mont for Anker font loaded from local `/fonts/` directory
- Fixed-scale visualization ensures consistent size perception across different inputs
- Mobile optimizations: larger fonts (1.3-1.4x), adjusted viewBox, custom dropdown
  - Front view mobile settings (CRITICAL): viewBoxWidth 950px, viewBoxStartX -110px, targetWallWidth 93%
  - DO NOT modify these values without careful testing - they prevent right-side clipping
- Error handling: Clear messages for out-of-range sizes/distances
- Purchase buttons link to both official Anker site and Amazon with tracking (affiliate tag: aoositmdtlpg-22)
- Brightness advice: Detailed recommendations based on lumens (3500, 1800, 650, 380, 300, 200, 150) - full text list in DESIGN.md
- Room size calculations: Based on projection distance × 1.2 for depth, assuming square rooms
- 7 projector models supported: Nebula X1, Cosmos 4K SE, Soundcore Nebula P1, Capsule 3 Laser, Capsule 3, Soundcore Nebula P1i, Capsule Air
- OGP (Open Graph Protocol) configured for social media sharing with custom ogp.png image
- "※概算値" notation displayed in visualization captions (NOT in view toggle buttons)
- Vercel Analytics: Must be enabled via dashboard (vercel.json causes schema validation error)
- See DESIGN.md for comprehensive technical specifications (842 lines)
