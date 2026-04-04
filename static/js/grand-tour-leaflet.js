// Grand Tour with Real Map using Leaflet + OpenStreetMap
// Supports bilingual display based on page language

(function() {
  'use strict';

  // Detect current language from HTML lang attribute
  const currentLang = document.documentElement.lang || 'zh';
  const isEnglish = currentLang.includes('en');

  // Configuration
  const CONFIG = {
    dataPath: '/data/countries.json',
    mapCenter: [20, 0], // Center of world map
    mapZoom: 2,
    markerColors: {
      country: '#0A2540',     // Navy blue for countries
      featured: '#B8860B'     // Bronze for featured places
    }
  };

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

  // Create custom marker icons
  function createMarkerIcon(isFeatured = false) {
    const color = isFeatured ? CONFIG.markerColors.featured : CONFIG.markerColors.country;
    const size = isFeatured ? 16 : 12;
    
    return L.divIcon({
      className: 'custom-marker',
      html: isFeatured 
        ? `<div style="background: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative;">
             <div style="position: absolute; top: -3px; left: 50%; transform: translateX(-50%); font-size: 12px;">⭐</div>
           </div>`
        : `<div style="background: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  }

  // Initialize map
  function initializeMap() {
    const map = L.map('world-map', {
      center: CONFIG.mapCenter,
      zoom: CONFIG.mapZoom,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: true
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    return map;
  }

  // Add country marker to map
  function addCountryMarker(map, country) {
    const marker = L.marker([country.latitude, country.longitude], {
      icon: createMarkerIcon(false)
    });

    // Create popup content
    const popupContent = `
      <div style="min-width: 150px;">
        <strong style="color: #0A2540; font-size: 1.1em;">${getText(country.country, country.country_en)}</strong>
        <div style="color: #718096; font-size: 0.9em; margin-top: 4px;">
          ${formatDate(country.visit_date)}
        </div>
        ${country.cities && country.cities.length > 0 ? `
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #E9ECEF;">
            <div style="font-size: 0.85em; color: #4A5568; margin-bottom: 4px;">
              ${getText('访问城市', 'Cities visited')}:
            </div>
            ${country.cities.slice(0, 3).map(city => 
              `<div style="font-size: 0.85em; color: #2D3748;">• ${getText(city.name, city.name_en)}</div>`
            ).join('')}
            ${country.cities.length > 3 ? `<div style="font-size: 0.8em; color: #718096; margin-top: 4px;">+${country.cities.length - 3} ${getText('个城市', 'more')}</div>` : ''}
          </div>
        ` : ''}
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'custom-popup'
    });

    marker.addTo(map);
    return marker;
  }

  // Add featured place marker to map
  function addFeaturedMarker(map, place, country) {
    const marker = L.marker([place.latitude, place.longitude], {
      icon: createMarkerIcon(true)
    });

    // Create popup content
    const popupContent = `
      <div style="min-width: 180px;">
        <div style="font-size: 1.1em; margin-bottom: 4px;">
          ⭐ <strong style="color: #B8860B;">${getText(place.name, place.name_en)}</strong>
        </div>
        <div style="color: #4A5568; font-size: 0.9em; margin-bottom: 4px;">
          ${getText(place.description, place.description_en)}
        </div>
        <div style="color: #718096; font-size: 0.85em;">
          ${getText(country.country, country.country_en)} · ${formatDate(place.visit_date)}
        </div>
        ${place.has_article && place.article_url ? `
          <a href="${place.article_url}" style="display: inline-block; margin-top: 8px; padding: 4px 12px; background: #B8860B; color: white; text-decoration: none; border-radius: 4px; font-size: 0.85em;">
            ${getText('阅读游记', 'Read article')} →
          </a>
        ` : ''}
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'custom-popup'
    });

    marker.addTo(map);
    return marker;
  }

  // Render regions list (same as before)
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

    const content = document.createElement('div');
    content.className = 'region-content visible';

    countries.forEach(country => {
      const countryItem = createCountryItem(country);
      content.appendChild(countryItem);
    });

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

    const countryName = getText(country.country, country.country_en);
    const countryFlag = getCountryFlag(country.country_code);
    
    let html = `
      <div class="country-header">
        <span class="country-flag">${countryFlag}</span>
        <span class="country-name">${countryName}</span>
        <span class="country-date">${formatDate(country.visit_date)}</span>
      </div>
    `;

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

  function getCountryFlag(countryCode) {
    if (!countryCode || countryCode.length !== 3) return '🌍';
    
    const codeMap = {
      'PRT': 'PT', 'NOR': 'NO', 'KAZ': 'KZ', 'UZB': 'UZ', 'NZL': 'NZ',
      'JPN': 'JP', 'FRA': 'FR', 'DEU': 'DE', 'GBR': 'GB', 'USA': 'US',
      'CHN': 'CN', 'ESP': 'ES', 'ITA': 'IT', 'NLD': 'NL', 'BEL': 'BE',
      'AUT': 'AT', 'CHE': 'CH', 'DNK': 'DK', 'SWE': 'SE', 'FIN': 'FI',
      'POL': 'PL', 'CZE': 'CZ', 'HUN': 'HU', 'GRC': 'GR', 'TUR': 'TR',
      'RUS': 'RU', 'UKR': 'UA', 'ROU': 'RO', 'BGR': 'BG', 'HRV': 'HR'
    };

    const alpha2 = codeMap[countryCode] || countryCode.substring(0, 2);
    const offset = 127397;
    return String.fromCodePoint(...alpha2.split('').map(c => c.charCodeAt(0) + offset));
  }

  // Load data and initialize
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
    const mapContainer = document.getElementById('world-map');
    const listContainer = document.getElementById('countries-by-region');
    
    if (!mapContainer) {
      console.error('Map container not found');
      return;
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

    // Initialize Leaflet map
    const map = initializeMap();

    // Add markers for countries and featured places
    countriesData.forEach(country => {
      addCountryMarker(map, country);
      
      if (country.featured_places && country.featured_places.length > 0) {
        country.featured_places.forEach(place => {
          addFeaturedMarker(map, place, country);
        });
      }
    });

    // Render regions list
    if (listContainer) {
      listContainer.innerHTML = '';
      renderRegionsList(countriesData);
    }

    console.log(`Grand Tour initialized with ${countriesData.length} countries using Leaflet + OpenStreetMap`);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
