// ============================================
// Nebula Projector Simulator - Enhanced Version
// ============================================

// Projector Data with URLs
const projectorData = {
    'capsule-air': {
        name: 'Nebula Capsule Air',
        image: 'https://www.ankerjapan.com/cdn/shop/files/D4112-WHITE.jpg?v=1764600547',
        price: '¥49,990',
        url: 'https://www.ankerjapan.com/products/d4112',
        lumens: 150,
        resolution: 'HD',
        weight: '約650g',
        battery: '約2.0時間',
        type: 'モバイル型',
        dataPoints: [
            { screenSize: 10, distance: 0.27 },
            { screenSize: 35, distance: 0.93 },
            { screenSize: 55, distance: 1.46 },
            { screenSize: 100, distance: 2.66 }
        ]
    },
    'capsule-3': {
        name: 'Nebula Capsule 3',
        image: 'https://www.ankerjapan.com/cdn/shop/files/d2425main2.jpg?v=1741684499',
        price: '¥69,990',
        url: 'https://www.ankerjapan.com/products/d2425',
        lumens: 200,
        resolution: 'フルHD',
        weight: '約850g',
        battery: '約2.5時間',
        type: 'モバイル型',
        dataPoints: [
            { screenSize: 60, distance: 1.6 },
            { screenSize: 80, distance: 2.13 },
            { screenSize: 100, distance: 2.66 },
            { screenSize: 120, distance: 3.18 }
        ]
    },
    'capsule-3-laser': {
        name: 'Nebula Capsule 3 Laser',
        image: 'https://www.ankerjapan.com/cdn/shop/files/D2426-BLACK.jpg?v=1764460798',
        price: '¥119,900',
        url: 'https://www.ankerjapan.com/products/d2426',
        lumens: 300,
        resolution: 'フルHD',
        weight: '約950g',
        battery: '約2.5時間',
        type: 'モバイル型',
        dataPoints: [
            { screenSize: 60, distance: 1.6 },
            { screenSize: 80, distance: 2.13 },
            { screenSize: 100, distance: 2.66 },
            { screenSize: 120, distance: 3.18 }
        ]
    },
    'nebula-p1i': {
        name: 'Soundcore Nebula P1i',
        image: 'https://www.ankerjapan.com/cdn/shop/files/D2200511.png?v=1770949949',
        price: '¥49,990',
        url: 'https://www.ankerjapan.com/products/d2200',
        lumens: 380,
        resolution: 'フルHD',
        weight: '約2.3kg',
        type: 'ホーム型',
        dataPoints: [
            { screenSize: 40, distance: 1.11 },
            { screenSize: 60, distance: 1.66 },
            { screenSize: 80, distance: 2.21 },
            { screenSize: 100, distance: 2.77 },
            { screenSize: 120, distance: 3.32 },
            { screenSize: 150, distance: 4.15 }
        ]
    },
    'cosmos-4k-se': {
        name: 'Nebula Cosmos 4K SE',
        image: 'https://www.ankerjapan.com/cdn/shop/files/D2342001.jpg?v=1751506553',
        price: '¥199,900',
        url: 'https://www.ankerjapan.com/products/d2342',
        lumens: 1800,
        resolution: '4K',
        weight: '約4.5kg',
        type: 'ホーム型',
        dataPoints: [
            { screenSize: 60, distance: 1.6 },
            { screenSize: 100, distance: 2.7 },
            { screenSize: 120, distance: 3.2 },
            { screenSize: 150, distance: 4.0 },
            { screenSize: 180, distance: 4.8 },
            { screenSize: 200, distance: 5.3 }
        ]
    },
    'nebula-p1': {
        name: 'Soundcore Nebula P1',
        image: 'https://www.ankerjapan.com/cdn/shop/files/B121AN11.png?v=1770100089',
        price: '¥149,900',
        url: 'https://www.ankerjapan.com/products/d2431',
        lumens: 650,
        resolution: 'フルHD',
        weight: '約2.8kg',
        type: 'ホームシアター型',
        dataPoints: [
            { screenSize: 60, distance: 1.59 },
            { screenSize: 80, distance: 2.13 },
            { screenSize: 100, distance: 2.66 },
            { screenSize: 120, distance: 3.19 },
            { screenSize: 150, distance: 4.0 },
            { screenSize: 180, distance: 4.8 }
        ]
    },
    'x1': {
        name: 'Nebula X1',
        image: 'https://www.ankerjapan.com/cdn/shop/files/D23515F1.png?v=1764601262&width=400',
        price: '¥449,900',
        url: 'https://www.ankerjapan.com/products/n2351',
        lumens: 3500,
        resolution: '4K',
        weight: '約6.2kg',
        type: 'ホームシアター型',
        dataPoints: [
            { screenSize: 80, distanceMin: 1.6, distanceMax: 2.6 },
            { screenSize: 100, distanceMin: 2.0, distanceMax: 3.3 },
            { screenSize: 120, distanceMin: 2.4, distanceMax: 4.0 },
            { screenSize: 150, distanceMin: 3.0, distanceMax: 5.0 },
            { screenSize: 200, distanceMin: 4.0, distanceMax: 6.6 },
            { screenSize: 300, distanceMin: 6.0, distanceMax: 10.0 }
        ]
    }
};

// State
let state = {
    mode: 'single', // 'single' or 'compare'
    calcMode: 'size-to-distance', // 'distance-to-size' or 'size-to-distance'
    selectedProjectorId: null,
    throwDistance: 2.7,
    desiredSize: 100,
    compareModel1: null,
    compareModel2: null,
    viewMode: 'top' // 'top' or 'front'
};

// ============================================
// Initialization
// ============================================
function init() {
    renderProjectorCards();
    setupEventListeners();
    setupCustomSelectMobile();
    populateCompareSelects();
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.addEventListener('click', () => switchMode(tab.dataset.mode));
    });

    // Calculation mode toggle
    document.querySelectorAll('input[name="calc-mode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.calcMode = e.target.value;
            toggleCalcMode();
            calculate();
        });
    });


    // Distance input and slider (distance-to-size mode)
    const distanceInput = document.getElementById('throw-distance');
    const distanceSlider = document.getElementById('distance-slider');

    distanceInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value) || 0;
        state.throwDistance = value;
        distanceSlider.value = value;
        updateSliderBackground(distanceSlider);
        calculate();
    });

    distanceSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        state.throwDistance = value;
        distanceInput.value = value;
        updateSliderBackground(distanceSlider);
        calculate();
    });

    // Size input and slider (size-to-distance mode)
    const sizeInput = document.getElementById('desired-size');
    const sizeSlider = document.getElementById('size-slider');

    sizeInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value) || 0;
        state.desiredSize = value;
        sizeSlider.value = value;
        updateSliderBackground(sizeSlider);
        calculate();
    });

    sizeSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        state.desiredSize = value;
        sizeInput.value = value;
        updateSliderBackground(sizeSlider);
        calculate();
    });

    // Projector selection (desktop cards - using event delegation)
    document.getElementById('projector-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.projector-card');
        if (card) {
            document.querySelectorAll('.projector-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedProjectorId = card.dataset.id;
            displaySpecsTable();
            calculate();

            // Sync mobile custom select
            const projector = projectorData[card.dataset.id];
            const triggerImage = document.getElementById('custom-select-image');
            const trigger = document.querySelector('.custom-select-trigger');
            if (trigger && projector) {
                const range = getProjectorRange(projector);
                const rangeText = state.calcMode === 'size-to-distance'
                    ? `推奨サイズ：${range.minSize}~${range.maxSize}インチ`
                    : `推奨距離：${range.minDistance.toFixed(2)}~${range.maxDistance.toFixed(2)}m`;

                triggerImage.src = projector.image;
                triggerImage.alt = projector.name;
                triggerImage.style.display = 'block';
                trigger.querySelector('.custom-select-name').textContent = projector.name;
                trigger.querySelector('.custom-select-price').textContent = projector.price;
                trigger.querySelector('.custom-select-range').textContent = rangeText;

                // Update selected state in options
                document.querySelectorAll('.custom-select-option').forEach(opt => {
                    opt.classList.toggle('selected', opt.dataset.id === card.dataset.id);
                });
            }
        }
    });

    // Compare mode
    document.getElementById('compare-model-1').addEventListener('change', (e) => {
        state.compareModel1 = e.target.value || null;
        calculateCompare();
    });

    document.getElementById('compare-model-2').addEventListener('change', (e) => {
        state.compareModel2 = e.target.value || null;
        calculateCompare();
    });

    // Initial slider backgrounds
    updateSliderBackground(distanceSlider);
    updateSliderBackground(sizeSlider);

    // View mode toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.viewMode = btn.dataset.view;
            calculate(); // Redraw visualization
        });
    });

    // Add tooltips to sliders
    addSliderTooltips(distanceSlider);
    addSliderTooltips(sizeSlider);
}

// ============================================
// Mode Switching
// ============================================
function switchMode(mode) {
    state.mode = mode;

    // Update tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    // Update content
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.toggle('active', content.id === `${mode}-mode`);
    });
}

function toggleCalcMode() {
    const distanceContainer = document.getElementById('distance-input-container');
    const sizeContainer = document.getElementById('size-input-container');

    if (state.calcMode === 'distance-to-size') {
        distanceContainer.style.display = 'block';
        sizeContainer.style.display = 'none';
    } else {
        distanceContainer.style.display = 'none';
        sizeContainer.style.display = 'block';
    }

    // Re-render projector cards to update range text
    renderProjectorCards();

    // Update mobile trigger if a projector is selected
    if (state.selectedProjectorId) {
        const projector = projectorData[state.selectedProjectorId];
        const trigger = document.querySelector('.custom-select-trigger');
        const triggerRange = trigger?.querySelector('.custom-select-range');

        if (triggerRange && projector) {
            const range = getProjectorRange(projector);
            const rangeText = state.calcMode === 'size-to-distance'
                ? `推奨サイズ：${range.minSize}~${range.maxSize}インチ`
                : `推奨距離：${range.minDistance.toFixed(2)}~${range.maxDistance.toFixed(2)}m`;
            triggerRange.textContent = rangeText;
        }
    }
}

// ============================================
// Slider Background Update
// ============================================
function updateSliderBackground(slider) {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percentage = ((value - min) / (max - min)) * 100;

    slider.style.background = `linear-gradient(to right, var(--nebula-primary) 0%, var(--nebula-primary) ${percentage}%, var(--border-light) ${percentage}%, var(--border-light) 100%)`;
}

// ============================================
// Add Slider Tooltips
// ============================================
function addSliderTooltips(slider) {
    const tooltip = document.createElement('div');
    tooltip.className = 'slider-tooltip';
    slider.parentElement.appendChild(tooltip);

    const updateTooltip = (e) => {
        const rect = slider.getBoundingClientRect();
        const value = slider.value;
        const min = slider.min;
        const max = slider.max;
        const percentage = ((value - min) / (max - min)) * 100;

        tooltip.textContent = slider.id.includes('distance') ? `${value}m` : `${value}"`;
        tooltip.style.left = `${percentage}%`;
        tooltip.classList.add('visible');
    };

    slider.addEventListener('input', updateTooltip);
    slider.addEventListener('mousedown', updateTooltip);
    slider.addEventListener('mouseup', () => {
        setTimeout(() => tooltip.classList.remove('visible'), 1000);
    });
}

// ============================================
// Get Projector Range
// ============================================
function getProjectorRange(projector) {
    const dataPoints = projector.dataPoints;
    const minSize = Math.min(...dataPoints.map(dp => dp.screenSize));
    const maxSize = Math.max(...dataPoints.map(dp => dp.screenSize));

    // Calculate distances for min and max sizes
    const minSizePoint = dataPoints.find(dp => dp.screenSize === minSize);
    const maxSizePoint = dataPoints.find(dp => dp.screenSize === maxSize);

    const minDistance = minSizePoint.distance || minSizePoint.distanceMin;
    const maxDistance = maxSizePoint.distance || maxSizePoint.distanceMax;

    return { minSize, maxSize, minDistance, maxDistance };
}

// ============================================
// Render Projector Cards
// ============================================
function renderProjectorCards() {
    const grid = document.getElementById('projector-grid');
    grid.innerHTML = Object.entries(projectorData).map(([id, projector]) => {
        const range = getProjectorRange(projector);
        const rangeText = state.calcMode === 'size-to-distance'
            ? `推奨サイズ：${range.minSize}~${range.maxSize}インチ`
            : `推奨距離：${range.minDistance.toFixed(2)}~${range.maxDistance.toFixed(2)}m`;

        return `
            <div class="projector-card" data-id="${id}">
                <img src="${projector.image}" alt="${projector.name}" class="projector-thumb">
                <div class="projector-info">
                    <div class="projector-name">${projector.name}</div>
                    <div class="projector-price">${projector.price}</div>
                    <div class="projector-range">${rangeText}</div>
                </div>
            </div>
        `;
    }).join('');

    // Populate custom mobile dropdown with images
    const customSelectOptions = document.getElementById('custom-select-options');
    const optionsHTML = Object.entries(projectorData).map(([id, projector]) => {
        const range = getProjectorRange(projector);
        const rangeText = state.calcMode === 'size-to-distance'
            ? `推奨サイズ：${range.minSize}~${range.maxSize}インチ`
            : `推奨距離：${range.minDistance.toFixed(2)}~${range.maxDistance.toFixed(2)}m`;

        return `
            <div class="custom-select-option" data-id="${id}">
                <img src="${projector.image}" alt="${projector.name}">
                <div class="custom-select-info">
                    <div class="custom-select-name">${projector.name}</div>
                    <div class="custom-select-price">${projector.price}</div>
                    <div class="custom-select-range">${rangeText}</div>
                </div>
            </div>
        `;
    }).join('');
    customSelectOptions.innerHTML = optionsHTML;
}

// ============================================
// Setup Custom Select Mobile
// ============================================
function setupCustomSelectMobile() {
    const trigger = document.querySelector('.custom-select-trigger');
    const optionsContainer = document.getElementById('custom-select-options');
    const triggerImage = document.getElementById('custom-select-image');
    const triggerName = trigger.querySelector('.custom-select-name');
    const triggerPrice = trigger.querySelector('.custom-select-price');
    const triggerRange = trigger.querySelector('.custom-select-range');

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        trigger.classList.toggle('active');
        optionsContainer.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-mobile')) {
            trigger.classList.remove('active');
            optionsContainer.classList.remove('show');
        }
    });

    // Handle option selection with event delegation
    optionsContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing when clicking inside dropdown

        const option = e.target.closest('.custom-select-option');
        if (!option) return;

        const selectedId = option.dataset.id;
        const projector = projectorData[selectedId];
        const range = getProjectorRange(projector);
        const rangeText = state.calcMode === 'size-to-distance'
            ? `推奨サイズ：${range.minSize}~${range.maxSize}インチ`
            : `推奨距離：${range.minDistance.toFixed(2)}~${range.maxDistance.toFixed(2)}m`;

        // Update trigger display
        triggerImage.src = projector.image;
        triggerImage.alt = projector.name;
        triggerImage.style.display = 'block';
        triggerName.textContent = projector.name;
        triggerPrice.textContent = projector.price;
        triggerRange.textContent = rangeText;

        // Update selected state
        document.querySelectorAll('.custom-select-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Update app state
        state.selectedProjectorId = selectedId;

        // Sync desktop cards
        document.querySelectorAll('.projector-card').forEach(c => c.classList.remove('selected'));
        const selectedCard = document.querySelector(`.projector-card[data-id="${selectedId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Close dropdown
        trigger.classList.remove('active');
        optionsContainer.classList.remove('show');

        // Update display
        displaySpecsTable();
        calculate();
    });
}

// ============================================
// Populate Compare Selects
// ============================================
function populateCompareSelects() {
    const options = Object.entries(projectorData).map(([id, projector]) =>
        `<option value="${id}">${projector.name}</option>`
    ).join('');

    document.getElementById('compare-model-1').innerHTML = '<option value="">プロジェクターを選択</option>' + options;
    document.getElementById('compare-model-2').innerHTML = '<option value="">プロジェクターを選択</option>' + options;
}

// ============================================
// Main Calculation
// ============================================
function calculate() {
    if (!state.selectedProjectorId) {
        document.getElementById('results-section').style.display = 'none';
        return;
    }

    const projector = projectorData[state.selectedProjectorId];

    // Get max/min sizes first
    const maxSize = Math.max(...projector.dataPoints.map(p => p.screenSize));
    const minSize = Math.min(...projector.dataPoints.map(p => p.screenSize));

    let screenSize, throwDistance;

    if (state.calcMode === 'distance-to-size') {
        throwDistance = state.throwDistance;

        // Calculate min/max distances from data points
        const minDistances = projector.dataPoints.map(p => {
            if (p.distance !== undefined) return p.distance;
            return p.distanceMin;
        });
        const maxDistances = projector.dataPoints.map(p => {
            if (p.distance !== undefined) return p.distance;
            return p.distanceMax;
        });
        const minDistance = Math.min(...minDistances);
        const maxDistance = Math.max(...maxDistances);

        // Check if distance is out of range BEFORE interpolation
        if (throwDistance < minDistance || throwDistance > maxDistance) {
            // Use min/max size for error display
            const estimatedSize = throwDistance < minDistance ? minSize : maxSize;
            displaySizeError(estimatedSize, minSize, maxSize, projector.name, throwDistance);
            return;
        }

        screenSize = interpolateScreenSize(projector.dataPoints, throwDistance);

        // Display the throw distance value (same as input)
        document.getElementById('calculated-distance').textContent = throwDistance.toFixed(2);
        document.getElementById('calculated-distance-display').style.display = 'block';

        // Check if exceeds maximum in distance-to-size mode
        if (!screenSize) {
            document.getElementById('results-section').style.display = 'none';
            return;
        }

        const exceedsMax = screenSize > maxSize;
        const belowMin = screenSize < minSize;

        if (exceedsMax || belowMin) {
            displaySizeError(screenSize, minSize, maxSize, projector.name, throwDistance);
            return;
        }
    } else {
        // size-to-distance mode
        screenSize = state.desiredSize;

        // Check if exceeds maximum BEFORE calculating distance
        const exceedsMax = screenSize > maxSize;
        const belowMin = screenSize < minSize;

        if (exceedsMax || belowMin) {
            // Calculate approximate distance for visualization
            const avgDistance = projector.dataPoints.reduce((sum, p) => {
                if (p.distance !== undefined) return sum + p.distance;
                return sum + (p.distanceMin + p.distanceMax) / 2;
            }, 0) / projector.dataPoints.length;

            displaySizeError(screenSize, minSize, maxSize, projector.name, avgDistance);
            return;
        }

        throwDistance = interpolateDistance(projector.dataPoints, screenSize);

        if (throwDistance) {
            document.getElementById('calculated-distance').textContent = throwDistance.toFixed(2);
            document.getElementById('calculated-distance-display').style.display = 'block';
        } else {
            document.getElementById('results-section').style.display = 'none';
            return;
        }
    }

    if (!screenSize || !throwDistance) {
        document.getElementById('results-section').style.display = 'none';
        return;
    }

    // Calculate dimensions
    const aspectRatio = 16/9;
    const widthInches = Math.sqrt(Math.pow(screenSize, 2) / (1 + Math.pow(1/aspectRatio, 2)));
    const heightInches = widthInches / aspectRatio;
    const widthCm = widthInches * 2.54;
    const heightCm = heightInches * 2.54;

    // Display results
    displayResults(widthCm, heightCm, screenSize);

    // Draw visualization based on view mode
    if (state.viewMode === 'top') {
        drawTopView(widthCm, heightCm, throwDistance, screenSize, false, projector.lumens);
    } else {
        drawFrontView(widthCm, heightCm, screenSize, false, projector.lumens);
    }

    // Generate alerts and advice
    generateRoomSizeAdvice(throwDistance);
    generateBrightnessAdvice(projector.lumens, projector.name);

    // Show purchase button
    showPurchaseButton(projector.url);
}

// ============================================
// Interpolation Functions
// ============================================
function interpolateScreenSize(dataPoints, distance) {
    if (dataPoints[0].distanceMin !== undefined) {
        // X1 model with ranges
        for (let point of dataPoints) {
            if (distance >= point.distanceMin && distance <= point.distanceMax) {
                return point.screenSize;
            }
        }

        // Interpolate between ranges
        for (let i = 0; i < dataPoints.length - 1; i++) {
            if (distance > dataPoints[i].distanceMax && distance < dataPoints[i + 1].distanceMin) {
                const ratio = (distance - dataPoints[i].distanceMax) / (dataPoints[i + 1].distanceMin - dataPoints[i].distanceMax);
                return dataPoints[i].screenSize + ratio * (dataPoints[i + 1].screenSize - dataPoints[i].screenSize);
            }
        }

        // Extrapolate
        if (distance > dataPoints[dataPoints.length - 1].distanceMax) {
            const lastTwo = dataPoints.slice(-2);
            const avgDist1 = (lastTwo[0].distanceMin + lastTwo[0].distanceMax) / 2;
            const avgDist2 = (lastTwo[1].distanceMin + lastTwo[1].distanceMax) / 2;
            const slope = (lastTwo[1].screenSize - lastTwo[0].screenSize) / (avgDist2 - avgDist1);
            return lastTwo[1].screenSize + slope * (distance - avgDist2);
        }

        return null;
    }

    // Fixed distance models
    let lowerPoint = null;
    let upperPoint = null;

    for (let i = 0; i < dataPoints.length; i++) {
        if (dataPoints[i].distance <= distance) {
            lowerPoint = dataPoints[i];
        }
        if (dataPoints[i].distance >= distance && !upperPoint) {
            upperPoint = dataPoints[i];
        }
    }

    if (lowerPoint && lowerPoint.distance === distance) {
        return lowerPoint.screenSize;
    }

    if (lowerPoint && upperPoint) {
        const ratio = (distance - lowerPoint.distance) / (upperPoint.distance - lowerPoint.distance);
        return lowerPoint.screenSize + ratio * (upperPoint.screenSize - lowerPoint.screenSize);
    } else if (lowerPoint) {
        if (dataPoints.length >= 2) {
            const lastTwo = dataPoints.slice(-2);
            const slope = (lastTwo[1].screenSize - lastTwo[0].screenSize) / (lastTwo[1].distance - lastTwo[0].distance);
            return lowerPoint.screenSize + slope * (distance - lowerPoint.distance);
        }
        return lowerPoint.screenSize;
    }

    return null;
}

function interpolateDistance(dataPoints, screenSize) {
    if (dataPoints[0].distanceMin !== undefined) {
        // X1 model - return average of range
        for (let point of dataPoints) {
            if (point.screenSize === screenSize) {
                return (point.distanceMin + point.distanceMax) / 2;
            }
        }

        // Interpolate
        for (let i = 0; i < dataPoints.length - 1; i++) {
            if (screenSize > dataPoints[i].screenSize && screenSize < dataPoints[i + 1].screenSize) {
                const ratio = (screenSize - dataPoints[i].screenSize) / (dataPoints[i + 1].screenSize - dataPoints[i].screenSize);
                const dist1 = (dataPoints[i].distanceMin + dataPoints[i].distanceMax) / 2;
                const dist2 = (dataPoints[i + 1].distanceMin + dataPoints[i + 1].distanceMax) / 2;
                return dist1 + ratio * (dist2 - dist1);
            }
        }

        return null;
    }

    // Fixed distance models
    for (let point of dataPoints) {
        if (point.screenSize === screenSize) {
            return point.distance;
        }
    }

    // Interpolate
    for (let i = 0; i < dataPoints.length - 1; i++) {
        if (screenSize > dataPoints[i].screenSize && screenSize < dataPoints[i + 1].screenSize) {
            const ratio = (screenSize - dataPoints[i].screenSize) / (dataPoints[i + 1].screenSize - dataPoints[i].screenSize);
            return dataPoints[i].distance + ratio * (dataPoints[i + 1].distance - dataPoints[i].distance);
        }
    }

    return null;
}

// ============================================
// Display Results
// ============================================
function displayResults(width, height, diagonal) {
    document.getElementById('screen-diagonal').textContent = Math.round(diagonal);
    document.getElementById('screen-width').textContent = Math.round(width);
    document.getElementById('screen-height').textContent = Math.round(height);
    document.getElementById('results-section').style.display = 'block';
}

// ============================================
// Display Size Error
// ============================================
function displaySizeError(requestedSize, minSize, maxSize, projectorName, throwDistance = 5.0) {
    const container = document.getElementById('visualization');
    document.getElementById('results-section').style.display = 'none';

    // Get projector data to find distance ranges
    const projector = projectorData[state.selectedProjectorId];
    const lumens = projector ? projector.lumens : 2000;

    // Calculate min/max distances from data points
    const minDistances = projector.dataPoints.map(p => {
        if (p.distance !== undefined) return p.distance;
        return p.distanceMin;
    });
    const maxDistances = projector.dataPoints.map(p => {
        if (p.distance !== undefined) return p.distance;
        return p.distanceMax;
    });
    const minDistance = Math.min(...minDistances);
    const maxDistance = Math.max(...maxDistances);

    // Calculate the distance for min/max sizes
    const minSizeDistance = interpolateDistance(projector.dataPoints, minSize) || minDistance;
    const maxSizeDistance = interpolateDistance(projector.dataPoints, maxSize) || maxDistance;

    const isOverMax = requestedSize > maxSize;

    let message, advice, detailLabel1, detailValue1, detailLabel2, detailValue2;

    if (state.calcMode === 'distance-to-size') {
        // Distance-to-size mode: show distance-based messages
        const isOverMaxDistance = throwDistance > maxDistance;
        message = isOverMaxDistance
            ? `投影距離が遠すぎます`
            : `投影距離が短すぎます`;

        advice = isOverMaxDistance
            ? `${projectorName}の最大投影サイズは<strong>${maxSize}インチ（${maxSizeDistance.toFixed(2)}m）</strong>です。`
            : `${projectorName}の最小投影サイズは<strong>${minSize}インチ（${minSizeDistance.toFixed(2)}m）</strong>です。`;

        detailLabel1 = '希望距離:';
        detailValue1 = `${throwDistance.toFixed(2)}m`;
        detailLabel2 = '対応距離:';
        detailValue2 = `${minDistance.toFixed(2)}m - ${maxDistance.toFixed(2)}m`;
    } else {
        // Size-to-distance mode: show size-based messages
        message = isOverMax
            ? `投影サイズが大きすぎます`
            : `投影サイズが小さすぎます`;

        advice = isOverMax
            ? `${projectorName}の最大投影サイズは<strong>${maxSize}インチ</strong>です。`
            : `${projectorName}の最小投影サイズは<strong>${minSize}インチ</strong>です。`;

        detailLabel1 = '希望サイズ:';
        detailValue1 = `${Math.round(requestedSize)}"`;
        detailLabel2 = '対応範囲:';
        detailValue2 = `${minSize}" - ${maxSize}"`;
    }

    // Calculate dimensions for visualization
    const aspectRatio = 16/9;
    const widthInches = Math.sqrt(Math.pow(requestedSize, 2) / (1 + Math.pow(1/aspectRatio, 2)));
    const widthCm = widthInches * 2.54;
    const heightCm = widthCm / aspectRatio;

    // Draw visualization with error state immediately
    if (state.viewMode === 'top') {
        drawTopView(widthCm, heightCm, throwDistance, requestedSize, true, lumens);
    } else {
        drawFrontView(widthCm, heightCm, requestedSize, true, lumens);
    }

    // Also show error message overlay
    setTimeout(() => {
        const viz = document.getElementById('visualization');
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'error-overlay';
        errorOverlay.innerHTML = `
            <div class="error-state">
                <div class="error-icon">🚫</div>
                <h3>${message}</h3>
                <p>${advice}</p>
                <div class="error-details">
                    <div class="error-detail-item">
                        <span class="label">${detailLabel1}</span>
                        <span class="value">${detailValue1}</span>
                    </div>
                    <div class="error-detail-item">
                        <span class="label">${detailLabel2}</span>
                        <span class="value">${detailValue2}</span>
                    </div>
                </div>
            </div>
        `;

        // Clear and add error overlay
        const existingOverlay = viz.querySelector('.error-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        viz.appendChild(errorOverlay);
    }, 50);

    // Show purchase button even during error
    const purchaseSection = document.getElementById('purchase-section');
    const purchaseButton = document.getElementById('purchase-button');
    if (state.selectedProjectorId && projector) {
        purchaseButton.href = projector.url;
        purchaseSection.style.display = 'block';
    }
}

// ============================================
// Top View Visualization (Improved)
// ============================================
function drawTopView(screenWidth, screenHeight, throwDistanceM, screenDiagonal, isError = false, lumens = 2000) {
    const container = document.getElementById('visualization');
    const throwDistanceCm = throwDistanceM * 100;

    // Canvas dimensions
    const canvasWidth = 900;
    const canvasHeight = 500;

    // Reserve space for labels
    const labelPadding = 180; // Space for left label
    const topBottomPadding = 80; // Space for top and bottom labels

    // Available space for diagram
    const availableWidth = canvasWidth - labelPadding;
    const availableHeight = canvasHeight - topBottomPadding;

    // Calculate scale to fit 80-90% of available space
    const targetWidth = availableWidth * 0.85;
    const scaleByWidth = targetWidth / throwDistanceCm;
    const scaleByHeight = availableHeight / screenWidth;
    const scale = Math.min(scaleByWidth, scaleByHeight);

    // Calculate scaled dimensions
    const scaledThrowDistance = throwDistanceCm * scale;
    const scaledScreenWidth = screenWidth * scale;

    // Center the diagram in available space (offset for left label)
    const centerX = labelPadding + availableWidth / 2;
    const centerY = canvasHeight / 2;

    // Screen position (LEFT end of diagram)
    const screenX = centerX - scaledThrowDistance / 2;
    const screenY = centerY;

    // Projector position (RIGHT end of diagram)
    const projectorX = centerX + scaledThrowDistance / 2;
    const projectorY = centerY;

    // Comparison objects (in cm)
    const tv65Width = 143;
    const tv50Width = 111;
    const posterWidth = 60; // 映画ポスター（A1サイズ相当：約60cm幅）

    // ABSOLUTE LABEL POSITIONS (no overlap guaranteed)
    const distanceLabelY = 60;  // TOP area: above everything
    const screenLabelX = 20;  // LEFT of screen (fixed position)
    const projectorLabelY = canvasHeight - 60;  // BOTTOM area: below everything

    // Clean white background
    const bgOpacity = lumens >= 3000 ? 0.9 : lumens >= 1500 ? 0.8 : lumens >= 500 ? 0.6 : 0.4;

    const errorOverlay = isError ? `
        <!-- Error overlay -->
        <rect x="0" y="0" width="900" height="${canvasHeight}"
              fill="rgba(220, 53, 69, 0.08)" />
        <line x1="${screenX + 10}" y1="${screenY - scaledScreenWidth / 2}"
              x2="${projectorX}" y2="${projectorY}"
              stroke="#dc3545" stroke-width="6" opacity="0.7"/>
        <line x1="${screenX + 10}" y1="${screenY + scaledScreenWidth / 2}"
              x2="${projectorX}" y2="${projectorY}"
              stroke="#dc3545" stroke-width="6" opacity="0.7"/>
        <text x="${centerX}" y="${centerY - 20}"
              fill="#dc3545" font-size="34" font-weight="700" text-anchor="middle">
            ⚠️ 投影不可
        </text>
        <text x="${centerX}" y="${centerY + 15}"
              fill="#dc3545" font-size="17" font-weight="600" text-anchor="middle" opacity="0.8">
            投影サイズが大きすぎます
        </text>
    ` : '';

    container.innerHTML = `
        <div class="canvas-container">
            <svg width="100%" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}"
                 preserveAspectRatio="xMidYMid meet" style="display: block; background: #ffffff;">
                <defs>
                    <!-- Projection light gradient -->
                    <linearGradient id="projectionGlow" x1="100%" y1="50%" x2="0%" y2="50%">
                        <stop offset="0%" style="stop-color:${isError ? '#dc3545' : '#17BBEF'};stop-opacity:${bgOpacity}" />
                        <stop offset="50%" style="stop-color:${isError ? '#c82333' : '#0da8db'};stop-opacity:${bgOpacity * 0.5}" />
                        <stop offset="100%" style="stop-color:#ffffff;stop-opacity:${bgOpacity}" />
                    </linearGradient>

                    <!-- Screen glow -->
                    <filter id="screenGlow">
                        <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    <!-- Subtle text shadow -->
                    <filter id="textShadow">
                        <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.15"/>
                    </filter>
                </defs>

                ${!isError ? `
                <!-- Projection cone with glow -->
                <polygon
                    points="${projectorX},${projectorY}
                            ${screenX + 15},${screenY - scaledScreenWidth / 2}
                            ${screenX + 15},${screenY + scaledScreenWidth / 2}"
                    fill="url(#projectionGlow)"
                    opacity="0.4"/>
                ` : ''}

                <!-- Screen with realistic glow -->
                <rect x="${screenX}" y="${screenY - scaledScreenWidth / 2}"
                      width="20" height="${scaledScreenWidth}"
                      fill="#ffffff" filter="url(#screenGlow)"/>
                <rect x="${screenX}" y="${screenY - scaledScreenWidth / 2}"
                      width="20" height="${scaledScreenWidth}"
                      fill="url(#projectionGlow)"
                      opacity="${isError ? 0.3 : 1}"/>

                <!-- Dimension line with arrows (stylish & thin) -->
                <defs>
                    <marker id="arrowStart" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <polygon points="0,4 8,0 8,8" fill="#2d3748"/>
                    </marker>
                    <marker id="arrowEnd" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <polygon points="8,4 0,0 0,8" fill="#2d3748"/>
                    </marker>
                </defs>

                <!-- Dimension line (CENTER, horizontal at centerY) -->
                <line x1="${screenX + 25}" y1="${centerY}"
                      x2="${projectorX - 35}" y2="${centerY}"
                      stroke="#2d3748" stroke-width="2"
                      marker-start="url(#arrowStart)"
                      marker-end="url(#arrowEnd)"/>

                <!-- Distance label (TOP area - ABSOLUTE position) -->
                <g>
                    <rect x="${centerX - 95}" y="${distanceLabelY - 32}"
                          width="190" height="60" rx="10"
                          fill="rgba(255, 255, 255, 0.85)" stroke="none"/>
                    <text x="${centerX}" y="${distanceLabelY - 10}"
                          fill="#2d3748" font-size="15" font-weight="600" text-anchor="middle">
                        投影距離
                    </text>
                    <text x="${centerX}" y="${distanceLabelY + 18}"
                          fill="#17BBEF" font-size="32" font-weight="700" text-anchor="middle">
                        ${throwDistanceM.toFixed(2)}m
                    </text>
                </g>

                <!-- Screen label (LEFT of screen - ABSOLUTE position) -->
                <g>
                    <rect x="${screenLabelX}" y="${centerY - 48}"
                          width="170" height="95" rx="10"
                          fill="rgba(255, 255, 255, 0.85)" stroke="none"/>
                    <text x="${screenLabelX + 10}" y="${centerY - 24}"
                          fill="#2d3748" font-size="15" font-weight="600">
                        画面サイズ
                    </text>
                    <text x="${screenLabelX + 10}" y="${centerY + 5}"
                          fill="${isError ? '#dc3545' : '#17BBEF'}"
                          font-size="30" font-weight="700">
                        ${Math.round(screenDiagonal)}インチ
                    </text>
                    <text x="${screenLabelX + 10}" y="${centerY + 30}"
                          fill="#4a5568" font-size="14" font-weight="500">
                        ${Math.round(screenWidth)}×${Math.round(screenHeight)}cm
                    </text>
                </g>

                <!-- Projector (RIGHT zone) -->
                <circle cx="${projectorX}" cy="${projectorY}"
                        r="35" fill="${isError ? '#dc3545' : '#0da8db'}" opacity="0.9"/>
                <circle cx="${projectorX}" cy="${projectorY}"
                        r="28" fill="${isError ? '#c82333' : '#17BBEF'}"/>
                <circle cx="${projectorX}" cy="${projectorY}"
                        r="12" fill="#ffffff" opacity="0.9"/>

                <!-- Projector label (BOTTOM area - ABSOLUTE position) -->
                <g>
                    <rect x="${projectorX - 75}" y="${projectorLabelY - 20}"
                          width="150" height="38" rx="10"
                          fill="rgba(255, 255, 255, 0.85)" stroke="none"/>
                    <text x="${projectorX}" y="${projectorLabelY + 5}"
                          fill="${isError ? '#dc3545' : '#17BBEF'}"
                          font-size="18" font-weight="700" text-anchor="middle">
                        プロジェクター
                    </text>
                </g>

                ${!isError && screenWidth > tv65Width * 1.1 ? `
                <!-- TV comparison - drawn last to avoid any filter effects -->
                <g opacity="1">
                    <rect x="${screenX - 25}" y="${screenY - (tv65Width * scale) / 2}"
                          width="5" height="${tv65Width * scale}"
                          fill="#10b981" stroke="none"/>
                    <text x="${screenX - 35}" y="${screenY}"
                          fill="#10b981" font-size="16" font-weight="600"
                          text-anchor="end" transform="rotate(-90 ${screenX - 35} ${screenY})">
                        📺 65型TV
                    </text>
                </g>
                ` : !isError && screenWidth > tv50Width * 1.1 ? `
                <!-- TV comparison - drawn last to avoid any filter effects -->
                <g opacity="1">
                    <rect x="${screenX - 25}" y="${screenY - (tv50Width * scale) / 2}"
                          width="5" height="${tv50Width * scale}"
                          fill="#10b981" stroke="none"/>
                    <text x="${screenX - 35}" y="${screenY}"
                          fill="#10b981" font-size="16" font-weight="600"
                          text-anchor="end" transform="rotate(-90 ${screenX - 35} ${screenY})">
                        📺 50型TV
                    </text>
                </g>
                ` : !isError && screenWidth > posterWidth ? `
                <!-- TV comparison - drawn last to avoid any filter effects -->
                <g opacity="1">
                    <rect x="${screenX - 25}" y="${screenY - (posterWidth * scale) / 2}"
                          width="5" height="${posterWidth * scale}"
                          fill="#10b981" stroke="none"/>
                    <text x="${screenX - 35}" y="${screenY}"
                          fill="#10b981" font-size="16" font-weight="600"
                          text-anchor="end" transform="rotate(-90 ${screenX - 35} ${screenY})">
                        🎬 映画ポスター(A1)
                    </text>
                </g>
                ` : ''}

                ${errorOverlay}
            </svg>
            <div class="viz-caption">
                ${isError ? '⚠️ 投影サイズが大きすぎます' : '💡 上から見た投影イメージ（光の広がりを再現）'}
            </div>
        </div>
    `;
}

// ============================================
// Front View Visualization (Wall perspective)
// ============================================
function drawFrontView(screenWidth, screenHeight, screenDiagonal, isError = false, lumens = 2000) {
    const container = document.getElementById('visualization');

    // Room dimensions (standard wall height = 2.4m = 240cm)
    const wallHeight = 240;
    const doorHeight = 200; // Standard door height
    const tvStandHeight = 50; // TV stand height

    // Dynamic screen opacity based on brightness
    const bgOpacity = lumens >= 3000 ? 0.9 : lumens >= 1500 ? 0.8 : lumens >= 500 ? 0.6 : 0.4;

    // Responsive settings for mobile
    const isMobile = window.innerWidth <= 480;
    const canvasHeight = isMobile ? 450 : 600;
    const padding = isMobile ? 30 : 40;
    const viewBoxWidth = isMobile ? 600 : 900;
    const viewBoxStartX = isMobile ? -80 : 0; // Shift right on mobile to show wall height label
    const centerX = viewBoxWidth / 2;

    // Calculate scale to fit wall and screen (80-90% of canvas width)
    const targetWallWidth = viewBoxWidth * 0.85; // 85% of viewBox width
    const wallWidthCm = 400; // Standard wall width representation in cm
    const contentHeight = wallHeight;

    const scaleX = targetWallWidth / wallWidthCm;
    const scaleY = (canvasHeight - padding * 2) / contentHeight;
    const scale = Math.min(scaleX, scaleY) * 0.95;

    // Centered positions (responsive based on viewBox)
    const wallX = centerX;
    const wallY = canvasHeight / 2;
    const wallWidthScaled = wallWidthCm * scale;
    const wallHeightScaled = wallHeight * scale;

    const screenX = wallX;
    const screenY = wallY;
    const screenWidthScaled = screenWidth * scale;
    const screenHeightScaled = screenHeight * scale;

    const doorWidthScaled = 80 * scale;
    const doorHeightScaled = doorHeight * scale;
    const doorX = wallX - wallWidthScaled / 2 + 50;

    const exceedsWall = screenHeightScaled > wallHeightScaled * 0.95;

    const errorOverlay = isError ? `
        <rect x="${viewBoxStartX}" y="0" width="${viewBoxWidth}" height="${canvasHeight}"
              fill="rgba(220, 53, 69, 0.08)" />
        <text x="${centerX}" y="${wallY - 30}"
              fill="#dc3545" font-size="32" font-weight="700" text-anchor="middle">
            ⚠️ 投影不可
        </text>
        <text x="${centerX}" y="${wallY + 10}"
              fill="#dc3545" font-size="16" font-weight="600" text-anchor="middle" opacity="0.8">
            投影サイズが大きすぎます
        </text>
    ` : '';

    container.innerHTML = `
        <div class="canvas-container">
            <svg width="100%" height="${canvasHeight}" viewBox="${viewBoxStartX} 0 ${viewBoxWidth} ${canvasHeight}"
                 preserveAspectRatio="xMidYMid meet" style="display: block; background: #ffffff;">
                <defs>
                    <!-- Screen glow -->
                    <filter id="screenGlow">
                        <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${isError ? '#dc3545' : '#17BBEF'};stop-opacity:${bgOpacity}" />
                        <stop offset="50%" style="stop-color:${isError ? '#c82333' : '#0da8db'};stop-opacity:${bgOpacity * 0.7}" />
                        <stop offset="100%" style="stop-color:${isError ? '#dc3545' : '#17BBEF'};stop-opacity:${bgOpacity}" />
                    </linearGradient>
                </defs>

                <!-- Wall -->
                <rect x="${wallX - wallWidthScaled / 2}" y="${wallY - wallHeightScaled / 2}"
                      width="${wallWidthScaled}" height="${wallHeightScaled}"
                      fill="#f8f9fa" stroke="#dee2e6" stroke-width="3"/>

                <!-- Wall height indicator -->
                <g>
                    <line x1="${wallX - wallWidthScaled / 2 - 30}" y1="${wallY - wallHeightScaled / 2}"
                          x2="${wallX - wallWidthScaled / 2 - 30}" y2="${wallY + wallHeightScaled / 2}"
                          stroke="#6c757d" stroke-width="2"/>
                    <line x1="${wallX - wallWidthScaled / 2 - 35}" y1="${wallY - wallHeightScaled / 2}"
                          x2="${wallX - wallWidthScaled / 2 - 25}" y2="${wallY - wallHeightScaled / 2}"
                          stroke="#6c757d" stroke-width="2"/>
                    <line x1="${wallX - wallWidthScaled / 2 - 35}" y1="${wallY + wallHeightScaled / 2}"
                          x2="${wallX - wallWidthScaled / 2 - 25}" y2="${wallY + wallHeightScaled / 2}"
                          stroke="#6c757d" stroke-width="2"/>
                    <text x="${wallX - wallWidthScaled / 2 - 45}" y="${wallY}"
                          fill="#6c757d" font-size="14" font-weight="600" text-anchor="end"
                          transform="rotate(-90 ${wallX - wallWidthScaled / 2 - 45} ${wallY})">
                        平均的な壁の高さ 2.4m
                    </text>
                </g>

                <!-- Door silhouette (for reference) -->
                ${!isError ? `
                <g opacity="0.4">
                    <rect x="${doorX}" y="${wallY + wallHeightScaled / 2 - doorHeightScaled}"
                          width="${doorWidthScaled}" height="${doorHeightScaled}"
                          fill="#8b4513" stroke="#654321" stroke-width="2" rx="3"/>
                    <circle cx="${doorX + doorWidthScaled - 10}" cy="${wallY + wallHeightScaled / 2 - doorHeightScaled / 2}"
                            r="5" fill="#ffd700"/>
                    <text x="${doorX + doorWidthScaled / 2}" y="${wallY + wallHeightScaled / 2 + 20}"
                          fill="#6c757d" font-size="13" font-weight="600" text-anchor="middle">
                        🚪 ドア (2.0m)
                    </text>
                </g>
                ` : ''}

                <!-- Projection screen -->
                <rect x="${screenX - screenWidthScaled / 2}" y="${screenY - screenHeightScaled / 2}"
                      width="${screenWidthScaled}" height="${screenHeightScaled}"
                      fill="url(#screenGradient)" filter="url(#screenGlow)"
                      opacity="${isError ? 0.4 : 0.9}"/>
                <rect x="${screenX - screenWidthScaled / 2}" y="${screenY - screenHeightScaled / 2}"
                      width="${screenWidthScaled}" height="${screenHeightScaled}"
                      fill="none" stroke="${isError ? '#dc3545' : '#0da8db'}" stroke-width="4"/>

                ${exceedsWall && !isError ? `
                <!-- Warning: Screen exceeds wall -->
                <g opacity="0.7">
                    <line x1="${screenX - screenWidthScaled / 2}" y1="${wallY - wallHeightScaled / 2}"
                          x2="${screenX + screenWidthScaled / 2}" y2="${wallY - wallHeightScaled / 2}"
                          stroke="#ffc107" stroke-width="4" stroke-dasharray="10,5"/>
                    <text x="${screenX}" y="${wallY - wallHeightScaled / 2 - 15}"
                          fill="#ffc107" font-size="16" font-weight="700" text-anchor="middle">
                        ⚠️ 天井を超えています
                    </text>
                </g>
                ` : ''}

                <!-- Screen dimensions label -->
                <g>
                    ${(() => {
                        // Adjust label position to avoid overlapping with door
                        const labelWidth = 240;
                        const labelLeftEdge = screenX - labelWidth / 2;
                        const doorRightEdge = doorX + doorWidthScaled;
                        const shouldShiftRight = labelLeftEdge < doorRightEdge + 20;
                        const labelX = shouldShiftRight ? doorRightEdge + labelWidth / 2 + 30 : screenX;

                        return `
                    <rect x="${labelX - 120}" y="${screenY + screenHeightScaled / 2 + 20}"
                          width="240" height="85" rx="10"
                          fill="rgba(255, 255, 255, 0.85)" stroke="none"/>
                    <text x="${labelX}" y="${screenY + screenHeightScaled / 2 + 40}"
                          fill="#2d3748" font-size="15" font-weight="600" text-anchor="middle">
                        画面サイズ
                    </text>
                    <text x="${labelX}" y="${screenY + screenHeightScaled / 2 + 66}"
                          fill="${isError ? '#dc3545' : '#17BBEF'}"
                          font-size="30" font-weight="700" text-anchor="middle">
                        ${Math.round(screenDiagonal)}インチ
                    </text>
                    <text x="${labelX}" y="${screenY + screenHeightScaled / 2 + 88}"
                          fill="#4a5568" font-size="15" font-weight="500" text-anchor="middle">
                        ${Math.round(screenWidth)} × ${Math.round(screenHeight)} cm
                    </text>
                        `;
                    })()}
                </g>

                ${errorOverlay}
            </svg>
            <div class="viz-caption">
                ${isError ? '⚠️ 投影サイズが大きすぎます' : '🖼️ 正面から見た投影イメージ（壁との比較）'}
            </div>
        </div>
    `;
}

// ============================================
// Room Size Advice
// ============================================
function generateRoomSizeAdvice(throwDistance) {
    const container = document.getElementById('room-size-advice');

    // Estimate required room size based on throw distance
    // Assume room depth should be at least 1.2x throw distance
    const roomDepthM = throwDistance * 1.2;
    // Convert to tatami (1 tatami ≈ 1.62 m²), assuming square room
    const roomAreaSqM = Math.pow(roomDepthM, 2);
    const estimatedTatami = roomAreaSqM / 1.62;

    let advice = {
        type: 'info',
        icon: '🏠',
        title: '部屋の広さアドバイス',
        message: ''
    };

    if (estimatedTatami < 6) {
        advice.message = `大体${Math.ceil(estimatedTatami)}畳程度の部屋の広さが必要です。コンパクトな空間でも楽しめます。`;
    } else if (estimatedTatami < 10) {
        advice.message = `大体${Math.ceil(estimatedTatami)}畳程度の部屋の広さが必要です。一般的なリビングに最適です。`;
    } else {
        advice.message = `大体${Math.ceil(estimatedTatami)}畳以上の広い部屋が必要です。大画面体験に最適な環境です。`;
    }

    container.innerHTML = `
        <div class="alert alert-${advice.type}">
            <span class="alert-icon">${advice.icon}</span>
            <div class="alert-content">
                <div class="alert-title">${advice.title}</div>
                <div class="alert-message">${advice.message}</div>
            </div>
        </div>
    `;
}

// ============================================
// Brightness Advice
// ============================================
function generateBrightnessAdvice(lumens, modelName) {
    const container = document.getElementById('brightness-advice');

    let advice = {
        type: 'info',
        icon: '💡',
        title: '明るさアドバイス',
        message: ''
    };

    // Specific advice per model based on actual specs
    if (lumens >= 3500) {
        // Nebula X1
        advice.type = 'success';
        advice.icon = '☀️';
        advice.message = `${lumens}ANSIルーメン。シリーズ史上最高の明るさを誇ります。日中の明るいリビングでもカーテンを閉め切ることなく、鮮明な映像を楽しめます。`;
    } else if (lumens >= 1800) {
        // Nebula Cosmos 4K SE
        advice.type = 'success';
        advice.icon = '☀️';
        advice.message = `${lumens}ANSIルーメン。昼間の利用も可能な4Kモデルです。ホームシアター体験に十分な明るさと高画質を両立しています。`;
    } else if (lumens >= 650) {
        // Soundcore Nebula P1
        advice.type = 'success';
        advice.icon = '☀️';
        advice.message = `${lumens}ANSIルーメン。カーテンを閉めた状態であれば昼間でも利用可能な明るさです。リビングでの普段使いに適しています。`;
    } else if (lumens >= 380) {
        // Soundcore Nebula P1i
        advice.type = 'info';
        advice.icon = '🌤️';
        advice.message = `${lumens}ANSIルーメン。同価格帯のホーム型と比較すると明るい部類ですが、鮮明に楽しむには夜間や遮光カーテンの使用を推奨します。`;
    } else if (lumens >= 300) {
        // Nebula Capsule 3 Laser
        advice.type = 'info';
        advice.icon = '🌤️';
        advice.message = `${lumens}ANSIルーメン。レーザー光源を採用し、モバイル型の中では際立つ明るさですが、鮮明に楽しむには、夜間や暗くしたお部屋での利用を推奨します。`;
    } else if (lumens >= 200) {
        // Nebula Capsule 3
        advice.type = 'warning';
        advice.icon = '🌙';
        advice.message = `${lumens}ANSIルーメン。鮮明に楽しむには、夜間や暗くしたお部屋での利用を推奨します。コンパクトさと映像美のバランスが取れたモデルです。`;
    } else {
        // Nebula Capsule Air
        advice.type = 'warning';
        advice.icon = '🌙';
        advice.message = `${lumens}ANSIルーメン。完全に暗くした環境や夜間の利用を推奨します。シリーズ最軽量で持ち運びやすく、暗い環境で活躍します。`;
    }

    container.innerHTML = `
        <div class="alert alert-${advice.type}">
            <span class="alert-icon">${advice.icon}</span>
            <div class="alert-content">
                <div class="alert-title">${advice.title}</div>
                <div class="alert-message">${advice.message}</div>
            </div>
        </div>
    `;
}

// ============================================
// Purchase Button
// ============================================
function showPurchaseButton(url) {
    const section = document.getElementById('purchase-section');
    const button = document.getElementById('purchase-button');

    button.href = url;
    section.style.display = 'block';
}

// ============================================
// Specs Table
// ============================================
function displaySpecsTable() {
    if (!state.selectedProjectorId) return;

    const projector = projectorData[state.selectedProjectorId];
    const container = document.getElementById('specs-table-container');

    let tableHTML = `
        <div class="specs-header">
            <img src="${projector.image}" alt="${projector.name}" class="specs-product-image">
            <div class="specs-product-info">
                <h3>${projector.name}</h3>
                <div class="specs-price">${projector.price}</div>
            </div>
        </div>
        <table class="specs-table">
            <thead>
                <tr>
                    <th>画面サイズ（インチ）</th>
                    <th>投影距離（m）</th>
                </tr>
            </thead>
            <tbody>
    `;

    projector.dataPoints.forEach(point => {
        if (point.distanceMin !== undefined) {
            tableHTML += `
                <tr>
                    <td>${point.screenSize}</td>
                    <td>${point.distanceMin}m - ${point.distanceMax}m</td>
                </tr>
            `;
        } else {
            tableHTML += `
                <tr>
                    <td>${point.screenSize}</td>
                    <td>${point.distance}m</td>
                </tr>
            `;
        }
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

// ============================================
// Compare Mode
// ============================================
function calculateCompare() {
    renderCompareCard(state.compareModel1, 'compare-card-1');
    renderCompareCard(state.compareModel2, 'compare-card-2');
}

function renderCompareCard(modelId, containerId) {
    const container = document.getElementById(containerId);

    if (!modelId) {
        container.innerHTML = '<p class="select-prompt">プロジェクターを選択してください</p>';
        return;
    }

    const projector = projectorData[modelId];

    // Get screen size range
    const sizes = projector.dataPoints.map(p => p.screenSize);
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);

    // Get distance range
    let minDistance, maxDistance;
    if (projector.dataPoints[0].distanceMin !== undefined) {
        minDistance = Math.min(...projector.dataPoints.map(p => p.distanceMin));
        maxDistance = Math.max(...projector.dataPoints.map(p => p.distanceMax));
    } else {
        minDistance = Math.min(...projector.dataPoints.map(p => p.distance));
        maxDistance = Math.max(...projector.dataPoints.map(p => p.distance));
    }

    container.innerHTML = `
        <div class="compare-content">
            <div class="compare-image">
                <img src="${projector.image}" alt="${projector.name}">
            </div>
            <div class="compare-info">
                <h4>${projector.name}</h4>
                <div class="compare-price">${projector.price}</div>
            </div>
            <table class="compare-specs-table">
                <tr>
                    <th>タイプ</th>
                    <td>${projector.type}</td>
                </tr>
                <tr>
                    <th>解像度</th>
                    <td>${projector.resolution}</td>
                </tr>
                <tr>
                    <th>明るさ</th>
                    <td>${projector.lumens}ANSIルーメン</td>
                </tr>
                <tr>
                    <th>投影サイズ</th>
                    <td>${minSize}-${maxSize}インチ</td>
                </tr>
                <tr>
                    <th>投影距離</th>
                    <td>${minDistance.toFixed(1)}-${maxDistance.toFixed(1)}m</td>
                </tr>
                <tr>
                    <th>重量</th>
                    <td>${projector.weight}</td>
                </tr>
                ${projector.battery ? `
                <tr>
                    <th>バッテリー</th>
                    <td>${projector.battery}</td>
                </tr>
                ` : ''}
            </table>
            <a href="${projector.url}" target="_blank" class="btn-compare-purchase">
                詳細を見る
            </a>
        </div>
    `;
}

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', init);
