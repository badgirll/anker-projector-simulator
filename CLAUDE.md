# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web application for simulating Nebula projector screen sizes based on room dimensions (in tatami mats) and projection distance. Built with vanilla HTML, CSS, and JavaScript - no build tools or dependencies required. Interface is in Japanese.

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

**index.html** - Two-column layout structure
- Left column: Room size input (tatami), projection distance (meters), projector selection buttons, and results
- Right column: Visualization at top, product specifications table at bottom
- All text in Japanese

**app.js** - Application logic
- `projectorData` object: Database of Nebula projector models with discrete data points (screen size vs. distance)
- `interpolateScreenSize()`: Calculates screen size from distance using linear interpolation between data points
- `calculate()`: Main calculation function that converts diagonal inches to width/height in cm (16:9 aspect ratio)
- `displaySpecsTable()`: Renders product specifications table with all data points
- `drawVisualization()`: Renders top-down SVG view with room outline, screen, projector, and projection cone

**styles.css** - Two-column responsive layout
- Left and right column grid layout that collapses to single column on mobile
- Button-based projector selection (not cards)
- Specs table styling at bottom of right column
- Japanese text support

### Calculation Method

Unlike traditional throw ratio calculations, this app uses discrete data points provided by Nebula:
1. User enters projection distance in meters
2. App finds closest data points in the selected projector's specifications
3. Linear interpolation calculates the screen size for the exact distance
4. Screen dimensions calculated using 16:9 aspect ratio and diagonal size

For Nebula X1 (which has distance ranges), the app checks if the distance falls within any range.

## Adding/Modifying Projectors

Edit the `projectorData` object in `app.js`. Each projector requires:
- `name`: Display name (e.g., "Nebula Cosmos 4K SE")
- `dataPoints`: Array of objects with:
  - `screenSize`: Diagonal size in inches
  - `distance`: Projection distance in meters (for fixed-distance models)
  - OR `distanceMin`/`distanceMax`: Distance range in meters (for zoom models like X1)

Example for fixed-distance model:
```javascript
'model-id': {
    name: 'Nebula Model Name',
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
- Add or update data points for each model

**Adjust layout:**
- Two-column layout controlled by `.two-column-layout` in `styles.css`
- Visualization section is at the top of the right column
- Specs table section is at the bottom of the right column

**Change tatami room size options:**
- Edit the `<select id="room-size">` options in `index.html`

**Modify visualization:**
- Edit `drawVisualization()` function in `app.js`
- SVG elements include room outline, screen, projector, distance line, and projection cone

## Notes

- No external dependencies or API calls
- All data is client-side only (no backend)
- Calculations happen in real-time on input change
- Room size in tatami converts to approximate width for visualization
- All UI text is in Japanese
- Discrete data points with interpolation (not throw ratio formulas)
