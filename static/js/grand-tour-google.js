// Grand Tour - Google Maps Version (Three-layer marker system - Optimized)
// Plan A: Simple circles + Optimized controls + Improved popups
// FIXED: Exposed initGrandTourMap as global callback

(function() {
  'use strict';

  const currentLang = document.documentElement.lang || 'zh';
  const isEnglish = currentLang.includes('en');

  const CONFIG = {
    dataPath: '/data/countries.json',
    mapCenter: { lat: 20, lng: 0 },
    mapZoom: 2,
    imagekit: {
      endpoint: 'https://ik.imagekit.io/airdonkey',
      folder: 'grand-tour',
      params: {
        thumbnail: 'tr=w-400,q-80,f-auto',
        popup: 'tr=w-800,q-85,f-auto',
        large: 'tr=w-1200,q-90,f-auto'
      }
    }
  };

  function getText(zhText, enText) {
    return isEnglish ? enText : zhText;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    
    if (dateStr.includes('~')) {
      const parts = dateStr.split('~').map(s => s.trim());
      if (isEnglish) {
        return `${formatSingleDate(parts[0])} - ${formatSingleDate(parts[1])}`;
      } else {
        return `${formatSingleDate(parts[0])} 至 ${formatSingleDate(parts[1])}`;
      }
    }
    
    return formatSingleDate(dateStr);
  }

  function formatSingleDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    
    if (!month) return dateStr;
    
    if (isEnglish) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (day) {
        return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
      } else {
        return `${months[parseInt(month) - 1]} ${year}`;
      }
    } else {
      if (day) {
        return `${year}年${month}月${parseInt(day)}日`;
      } else {
        return `${year}年${month}月`;
      }
    }
  }

  function getImageHtml(imageName, altText) {
    if (!imageName) return '';
    
    const imageUrl = `${CONFIG.imagekit.endpoint}/${CONFIG.imagekit.folder}/${imageName}?${CONFIG.imagekit.params.popup}`;
    
    return `
      <div style="margin-bottom: 10px;">
        <img src="${imageUrl}" 
             alt="${altText}"
             style="width: 100%; max-width: 300px; height: auto; border-radius: 8px; display: block;"
             loading="lazy">
      </div>
    `;
  }

  function getCountryFlag(countryCode) {
    if (!countryCode || countryCode.length !== 3) return '🌍';
    
    const codeMap = {
      'LKA': 'LK', 'MDV': 'MV', 'THA': 'TH', 'TUR': 'TR', 'DEU': 'DE',
      'AUT': 'AT', 'HUN': 'HU', 'CZE': 'CZ', 'SVK': 'SK', 'ITA': 'IT',
      'VAT': 'VA', 'ESP': 'ES', 'PRT': 'PT', 'GEO': 'GE', 'ARM': 'AM',
      'GRC': 'GR', 'FRA': 'FR', 'POL': 'PL', 'LTU': 'LT', 'LVA': 'LV',
      'EST': 'EE', 'FIN': 'FI', 'NOR': 'NO', 'NLD': 'NL', 'RUS': 'RU',
      'QAT': 'QA', 'TJK': 'TJ', 'KGZ': 'KG', 'TKM': 'TM', 'KAZ': 'KZ',
      'UZB': 'UZ', 'USA': 'US', 'CAN': 'CA', 'MEX': 'MX', 'PRI': 'PR',
      'CHL': 'CL', 'ARG': 'AR', 'PER': 'PE', 'ECU': 'EC', 'NZL': 'NZ',
      'FJI': 'FJ', 'TON': 'TO'
    };
    
    const twoLetterCode = codeMap[countryCode];
    if (!twoLetterCode) return '🌍';
    
    const codePoints = twoLetterCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    
    return String.fromCodePoint(...codePoints);
  }

  function initializeMap() {
    const mapElement = document.getElementById('world-map');
    
    const map = new google.maps.Map(mapElement, {
      center: CONFIG.mapCenter,
      zoom: CONFIG.mapZoom,
      minZoom: 2,
      maxZoom: 18,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    });

    return map;
  }

  function addCountryMarker(map, country) {
    const position = {
      lat: country.latitude,
      lng: country.longitude
    };

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: getText(country.country, country.country_en),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#378ADD',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 6
      },
      zIndex: 100
    });

    const infoContent = `
      <div style="padding: 12px; min-width: 240px; max-width: 340px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #0A2540; font-size: 1.1em;">
          ${getCountryFlag(country.country_code)} ${getText(country.country, country.country_en)}
        </h3>
        <div style="color: #718096; font-size: 0.9em;">
          ${formatDate(country.visit_date)}
        </div>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    return marker;
  }

  function addCityMarker(map, city, country) {
    if (!city.show_on_map) return null;

    const position = {
      lat: city.latitude,
      lng: city.longitude
    };

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: getText(city.name, city.name_en),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#C05621',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 8
      },
      zIndex: 500
    });

    const infoContent = `
      <div style="padding: 12px; min-width: 240px; max-width: 340px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        ${getImageHtml(city.marker_image, getText(city.name, city.name_en))}
        <div style="display: flex; align-items: baseline; margin-bottom: 8px; gap: 6px;">
          <span style="font-size: 1.2em;">🏙️</span>
          <strong style="font-size: 1.1em; color: #C05621; white-space: nowrap;">
            ${getText(city.name, city.name_en)}
          </strong>
        </div>
        <div style="color: #4A5568; font-size: 0.9em; line-height: 1.4; margin-bottom: 6px;">
          ${getText(city.note, city.note_en)}
        </div>
        <div style="color: #718096; font-size: 0.85em;">
          ${getText(country.country, country.country_en)}
        </div>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    return marker;
  }

  function addFeaturedMarker(map, place, country) {
    const position = {
      lat: place.latitude,
      lng: place.longitude
    };

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: getText(place.name, place.name_en),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#B8860B',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 10
      },
      zIndex: 1000
    });

    const infoContent = `
      <div style="padding: 12px; min-width: 240px; max-width: 340px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        ${getImageHtml(place.marker_image, getText(place.name, place.name_en))}
        <div style="display: flex; align-items: baseline; margin-bottom: 8px; gap: 6px;">
          <span style="font-size: 1.3em;">⭐</span>
          <strong style="font-size: 1.15em; color: #B8860B; white-space: nowrap;">
            ${getText(place.name, place.name_en)}
          </strong>
        </div>
        <div style="color: #4A5568; font-size: 0.95em; line-height: 1.4; margin-bottom: 6px;">
          ${getText(place.description, place.description_en)}
        </div>
        <div style="color: #718096; font-size: 0.85em;">
          ${getText(country.country, country.country_en)}
          ${place.visit_date ? ' · ' + formatDate(place.visit_date) : ''}
        </div>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    return marker;
  }

  function renderRegionsList(countriesData) {
    const regions = {
      '亚洲': { en: 'Asia', countries: [] },
      '欧洲': { en: 'Europe', countries: [] },
      '美洲': { en: 'Americas', countries: [] },
      '大洋洲': { en: 'Oceania', countries: [] }
    };

    countriesData.forEach(country => {
      const region = country.region;
      if (regions[region]) {
        regions[region].countries.push(country);
      }
    });

    const listContainer = document.getElementById('countries-by-region');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    Object.keys(regions).forEach(regionName => {
      const region = regions[regionName];
      if (region.countries.length === 0) return;

      const regionElement = createRegionElement(regionName, region);
      listContainer.appendChild(regionElement);
    });
  }

  function createRegionElement(regionName, region) {
    const container = document.createElement('div');
    container.className = 'region-group';

    const header = document.createElement('h3');
    header.className = 'region-title';
    header.textContent = getText(regionName, region.en);
    container.appendChild(header);

    region.countries.forEach(country => {
      const countryItem = createCountryItem(country);
      container.appendChild(countryItem);
    });

    return container;
  }

  function createCountryItem(country) {
    const item = document.createElement('div');
    item.className = 'country-item';

    let html = `
      <div class="country-header">
        <h4 class="country-name">
          ${getCountryFlag(country.country_code)} ${getText(country.country, country.country_en)}
        </h4>
        <div class="country-date">${formatDate(country.visit_date)}</div>
      </div>
    `;

    if (country.cities && country.cities.length > 0) {
      html += `<div class="cities-list">`;
      html += `<div class="cities-title">${getText('访问城市', 'Cities Visited')}</div>`;
      
      country.cities.forEach(city => {
        const cityName = getText(city.name, city.name_en);
        const cityNote = getText(city.note, city.note_en);
        
        html += `
          <div class="city-item">
            <span class="city-bullet">•</span>
            <span class="city-name">${cityName}</span>
            ${cityNote ? `<span class="city-note">— ${cityNote}</span>` : ''}
          </div>
        `;
      });
      
      html += `</div>`;
    }

    item.innerHTML = html;
    return item;
  }

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

  // CRITICAL: Expose as global function for Google Maps callback
  window.initGrandTourMap = async function() {
    console.log('=== Grand Tour (Google Maps - Plan A circles) init ===');
    
    const mapContainer = document.getElementById('world-map');
    const listContainer = document.getElementById('countries-by-region');
    
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API not loaded');
      mapContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #718096;">
          <p>${getText('Google Maps加载中...', 'Loading Google Maps...')}</p>
        </div>
      `;
      return;
    }

    const countriesData = await loadData();
    
    if (countriesData.length === 0) {
      console.error('No data loaded');
      return;
    }

    console.log(`Loaded ${countriesData.length} countries`);

    const map = initializeMap();
    console.log('Google Maps initialized with optimized controls');

    let cityCount = 0;
    let featuredCount = 0;

    countriesData.forEach(country => {
      addCountryMarker(map, country);
      
      if (country.cities && country.cities.length > 0) {
        country.cities.forEach(city => {
          if (city.show_on_map) {
            addCityMarker(map, city, country);
            cityCount++;
          }
        });
      }
      
      if (country.featured_places && country.featured_places.length > 0) {
        country.featured_places.forEach(place => {
          addFeaturedMarker(map, place, country);
          featuredCount++;
        });
      }
    });

    console.log(`Markers: ${countriesData.length} countries, ${cityCount} cities, ${featuredCount} featured`);
    console.log('Style: Plan A - Simple circles OK');

    if (listContainer) {
      listContainer.innerHTML = '';
      renderRegionsList(countriesData);
      console.log('Country list rendered');
    }
  };

})();
