// Grand Tour Interactive Map
// Supports bilingual display based on page language

(function() {
  'use strict';

  // ===================================
  // Configuration
  // ===================================
  const CONFIG = {
    mapWidth: 1000,
    mapHeight: 500,
    countryMarkerRadius: 6,
    featuredMarkerSize: 12,
    dataPath: '/data/countries.json'
  };

  // Detect current language from HTML lang attribute
  const currentLang = document.documentElement.lang || 'zh';
  const isEnglish = currentLang.includes('en');

  // ===================================
  // Helper Functions
  // ===================================
  
  // Convert latitude/longitude to SVG coordinates (simplified Mercator projection)
  function latLngToXY(lat, lng) {
    // Mercator projection with bounds
    const x = ((lng + 180) / 360) * CONFIG.mapWidth;
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = (CONFIG.mapHeight / 2) - (CONFIG.mapWidth * mercN / (2 * Math.PI));
    
    return { x, y };
  }

  // Get localized text based on current language
  function getText(zhText, enText) {
    return isEnglish ? enText : zhText;
  }

  // Format date for display
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (isEnglish) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(month) - 1]} ${year}`;
    } else {
      return `${year}年${month}月`;
    }
  }

  // ===================================
  // Map Rendering
  // ===================================
  
  function createMap(countriesData) {
    const mapContainer = document.getElementById('world-map');
    if (!mapContainer) return;

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${CONFIG.mapWidth} ${CONFIG.mapHeight}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    // Add simple world map background (simplified continents)
    // In production, replace this with a proper world map SVG
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', CONFIG.mapWidth);
    background.setAttribute('height', CONFIG.mapHeight);
    background.setAttribute('fill', '#F8F9FA');
    svg.appendChild(background);

    // Add grid lines for reference (optional, can be removed)
    addGridLines(svg);

    // Add country markers
    countriesData.forEach(country => {
      addCountryMarker(svg, country);
    });

    // Add featured place markers
    countriesData.forEach(country => {
      if (country.featured_places && country.featured_places.length > 0) {
        country.featured_places.forEach(place => {
          addFeaturedMarker(svg, place, country);
        });
      }
    });

    mapContainer.appendChild(svg);
  }

  function addGridLines(svg) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('opacity', '0.1');

    // Longitude lines
    for (let lng = -180; lng <= 180; lng += 30) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const x = ((lng + 180) / 360) * CONFIG.mapWidth;
      line.setAttribute('x1', x);
      line.setAttribute('y1', 0);
      line.setAttribute('x2', x);
      line.setAttribute('y2', CONFIG.mapHeight);
      line.setAttribute('stroke', '#0A2540');
      line.setAttribute('stroke-width', '0.5');
      group.appendChild(line);
    }

    // Latitude lines
    for (let lat = -60; lat <= 80; lat += 30) {
      const coords = latLngToXY(lat, 0);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0);
      line.setAttribute('y1', coords.y);
      line.setAttribute('x2', CONFIG.mapWidth);
      line.setAttribute('y2', coords.y);
      line.setAttribute('stroke', '#0A2540');
      line.setAttribute('stroke-width', '0.5');
      group.appendChild(line);
    }

    svg.appendChild(group);
  }

  function addCountryMarker(svg, country) {
    const coords = latLngToXY(country.latitude, country.longitude);
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', coords.x);
    circle.setAttribute('cy', coords.y);
    circle.setAttribute('r', CONFIG.countryMarkerRadius);
    circle.classList.add('country-marker');

    // Add tooltip interaction
    circle.addEventListener('mouseenter', (e) => {
      showTooltip(e, {
        title: getText(country.country, country.country_en),
        description: null,
        date: formatDate(country.visit_date)
      });
    });

    circle.addEventListener('mousemove', updateTooltipPosition);
    circle.addEventListener('mouseleave', hideTooltip);

    svg.appendChild(circle);
  }

  function addFeaturedMarker(svg, place, country) {
    const coords = latLngToXY(place.latitude, place.longitude);
    
    // Create star path
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const size = CONFIG.featuredMarkerSize;
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = coords.x + Math.cos(angle) * size;
      const y = coords.y + Math.sin(angle) * size;
      points.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
    }
    star.setAttribute('d', points.join(' ') + 'Z');
    star.classList.add('featured-marker');

    // Add tooltip interaction
    star.addEventListener('mouseenter', (e) => {
      showTooltip(e, {
        title: `⭐ ${getText(place.name, place.name_en)}`,
        description: getText(place.description, place.description_en),
        date: formatDate(place.visit_date)
      });
    });

    star.addEventListener('mousemove', updateTooltipPosition);
    star.addEventListener('mouseleave', hideTooltip);

    // Add click handler if article exists
    if (place.has_article && place.article_url) {
      star.style.cursor = 'pointer';
      star.addEventListener('click', () => {
        window.location.href = place.article_url;
      });
    }

    svg.appendChild(star);
  }

  // ===================================
  // Tooltip Functions
  // ===================================
  
  function showTooltip(event, data) {
    const tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;

    let html = `<div class="tooltip-title">${data.title}</div>`;
    if (data.description) {
      html += `<div class="tooltip-description">${data.description}</div>`;
    }
    if (data.date) {
      html += `<div class="tooltip-date">${data.date}</div>`;
    }

    tooltip.innerHTML = html;
    tooltip.classList.add('visible');
    updateTooltipPosition(event);
  }

  function updateTooltipPosition(event) {
    const tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;

    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;

    tooltip.style.left = (x + 15) + 'px';
    tooltip.style.top = (y - 10) + 'px';
  }

  function hideTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  }

  // ===================================
  // Regions List Rendering
  // ===================================
  
  function renderRegionsList(countriesData) {
    const container = document.getElementById('countries-by-region');
    if (!container) return;

    // Group countries by region
    const regions = {};
    countriesData.forEach(country => {
      const regionKey = getText(country.region, country.region_en);
      if (!regions[regionKey]) {
        regions[regionKey] = [];
      }
      regions[regionKey].push(country);
    });

    // Define region icons
    const regionIcons = {
      '亚洲': '🌏', 'Asia': '🌏',
      '中亚': '🏔️', 'Central Asia': '🏔️',
      '欧洲': '🌍', 'Europe': '🌍',
      '北美洲': '🌎', 'North America': '🌎',
      '南美洲': '🌎', 'South America': '🌎',
      '大洋洲': '🌊', 'Oceania': '🌊',
      '非洲': '🦁', 'Africa': '🦁'
    };

    // Render each region
    Object.entries(regions).forEach(([regionName, countries]) => {
      const regionSection = createRegionSection(regionName, countries, regionIcons[regionName] || '🌐');
      container.appendChild(regionSection);
    });
  }

  function createRegionSection(regionName, countries, icon) {
    const section = document.createElement('div');
    section.className = 'region-section';

    // Region header
    const header = document.createElement('div');
    header.className = 'region-header';
    header.innerHTML = `
      <div class="region-title">
        <span class="region-icon">${icon}</span>
        <h2>${regionName}</h2>
        <span class="region-count">${countries.length}${getText('国', ' countries')}</span>
      </div>
      <span class="expand-icon">▼</span>
    `;

    // Region content
    const content = document.createElement('div');
    content.className = 'region-content visible'; // Expanded by default

    countries.forEach(country => {
      const countryItem = createCountryItem(country);
      content.appendChild(countryItem);
    });

    // Toggle functionality
    header.addEventListener('click', () => {
      header.classList.toggle('expanded');
      content.classList.toggle('visible');
    });

    section.appendChild(header);
    section.appendChild(content);

    return section;
  }

  function createCountryItem(country) {
    const item = document.createElement('div');
    item.className = 'country-item';

    // Country header
    const countryName = getText(country.country, country.country_en);
    const countryFlag = getCountryFlag(country.country_code);
    
    let html = `
      <div class="country-header">
        <span class="country-flag">${countryFlag}</span>
        <span class="country-name">${countryName}</span>
        <span class="country-date">${formatDate(country.visit_date)}</span>
      </div>
    `;

    // Featured places
    if (country.featured_places && country.featured_places.length > 0) {
      html += `<div class="featured-places">`;
      html += `<div class="featured-places-title">${getText('特色地点', 'Featured Places')}</div>`;
      
      country.featured_places.forEach(place => {
        const placeName = getText(place.name, place.name_en);
        const placeDesc = getText(place.description, place.description_en);
        
        if (place.has_article && place.article_url) {
          html += `
            <div class="featured-place">
              <span class="star-icon">⭐</span>
              <div class="featured-place-info">
                <a href="${place.article_url}" class="featured-place-name">${placeName}</a>
                <div class="featured-place-description">${placeDesc}</div>
              </div>
            </div>
          `;
        } else {
          html += `
            <div class="featured-place">
              <span class="star-icon">⭐</span>
              <div class="featured-place-info">
                <div class="featured-place-name">${placeName}</div>
                <div class="featured-place-description">${placeDesc}</div>
              </div>
            </div>
          `;
        }
      });
      
      html += `</div>`;
    }

    // Cities
    if (country.cities && country.cities.length > 0) {
      html += `<div class="cities-list">`;
      html += `<div class="cities-title">${getText('访问城市', 'Cities Visited')}</div>`;
      
      country.cities.forEach(city => {
        const cityName = getText(city.name, city.name_en);
        const cityNote = getText(city.note, city.note_en);
        
        if (city.has_article && city.article_url) {
          html += `
            <div class="city-item">
              <span class="city-bullet">•</span>
              <a href="${city.article_url}" class="city-name">${cityName}</a>
              <span class="city-note">— ${cityNote}</span>
            </div>
          `;
        } else {
          html += `
            <div class="city-item">
              <span class="city-bullet">•</span>
              <span class="city-name">${cityName}</span>
              <span class="city-note">— ${cityNote}</span>
            </div>
          `;
        }
      });
      
      html += `</div>`;
    }

    item.innerHTML = html;
    return item;
  }

  // Get country flag emoji from country code
  function getCountryFlag(countryCode) {
    if (!countryCode || countryCode.length !== 3) return '🌍';
    
    // Convert ISO 3166-1 alpha-3 to alpha-2 for flag emoji
    const codeMap = {
      'PRT': 'PT', 'NOR': 'NO', 'KAZ': 'KZ', 'UZB': 'UZ', 'NZL': 'NZ',
      'JPN': 'JP', 'FRA': 'FR', 'DEU': 'DE', 'GBR': 'GB', 'USA': 'US',
      'CHN': 'CN', 'ESP': 'ES', 'ITA': 'IT', 'NLD': 'NL', 'BEL': 'BE',
      'AUT': 'AT', 'CHE': 'CH', 'DNK': 'DK', 'SWE': 'SE', 'FIN': 'FI',
      'POL': 'PL', 'CZE': 'CZ', 'HUN': 'HU', 'GRC': 'GR', 'TUR': 'TR',
      'RUS': 'RU', 'UKR': 'UA', 'ROU': 'RO', 'BGR': 'BG', 'HRV': 'HR',
      'SVN': 'SI', 'SVK': 'SK', 'LTU': 'LT', 'LVA': 'LV', 'EST': 'EE',
      'ISL': 'IS', 'IRL': 'IE', 'LUX': 'LU', 'MLT': 'MT', 'CYP': 'CY'
    };

    const alpha2 = codeMap[countryCode] || countryCode.substring(0, 2);
    
    // Convert to flag emoji
    const offset = 127397;
    return String.fromCodePoint(...alpha2.split('').map(c => c.charCodeAt(0) + offset));
  }

  // ===================================
  // Data Loading and Initialization
  // ===================================
  
  async function loadData() {
    try {
      const response = await fetch(CONFIG.dataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading countries data:', error);
      return [];
    }
  }

  async function init() {
    // Show loading state
    const mapContainer = document.getElementById('world-map');
    const listContainer = document.getElementById('countries-by-region');
    
    if (mapContainer) {
      mapContainer.innerHTML = `<div class="loading">${getText('加载中', 'Loading')}</div>`;
    }
    if (listContainer) {
      listContainer.innerHTML = `<div class="loading">${getText('加载中', 'Loading')}</div>`;
    }

    // Load data
    const countriesData = await loadData();
    
    if (countriesData.length === 0) {
      if (mapContainer) {
        mapContainer.innerHTML = `<div class="loading">${getText('暂无数据', 'No data available')}</div>`;
      }
      if (listContainer) {
        listContainer.innerHTML = `<div class="loading">${getText('暂无数据', 'No data available')}</div>`;
      }
      return;
    }

    // Clear loading states
    if (mapContainer) {
      mapContainer.innerHTML = '';
    }
    if (listContainer) {
      listContainer.innerHTML = '';
    }

    // Render map and list
    createMap(countriesData);
    renderRegionsList(countriesData);

    console.log(`Grand Tour initialized with ${countriesData.length} countries`);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
