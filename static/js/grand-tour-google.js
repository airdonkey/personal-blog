// Grand Tour - Google Maps版本（三层标记系统）
// 🔵 蓝色：国家标记 | 🟠 橙色：城市标记 | 🟡 黄色：景点标记

(function() {
  'use strict';

  // 检测当前语言
  const currentLang = document.documentElement.lang || 'zh';
  const isEnglish = currentLang.includes('en');

  // 配置
  const CONFIG = {
    dataPath: '/data/countries.json',
    mapCenter: { lat: 20, lng: 0 },
    mapZoom: 2
  };

  // 辅助函数
  function getText(zhText, enText) {
    return isEnglish ? enText : zhText;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    
    // 处理跨年/跨月格式 (如 "2016-01-20 ~ 2017-05-26")
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
    
    if (!month) return dateStr; // 只有年份
    
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

  // 获取国旗emoji
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

    const alpha2 = codeMap[countryCode] || countryCode.substring(0, 2);
    const offset = 127397;
    return String.fromCodePoint(...alpha2.split('').map(c => c.charCodeAt(0) + offset));
  }

  // 初始化Google地图
  function initializeMap() {
    const mapElement = document.getElementById('world-map');
    
    const map = new google.maps.Map(mapElement, {
      center: CONFIG.mapCenter,
      zoom: CONFIG.mapZoom,
      minZoom: 2,
      maxZoom: 18,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false,
      fullscreenControl: true
    });

    return map;
  }

  // 添加国家标记（蓝色圆点）
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
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(32, 32)
      },
      zIndex: 100
    });

    const infoContent = `
      <div style="padding: 10px; min-width: 200px; font-family: sans-serif;">
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

  // 添加城市标记（橙色圆点）
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
        url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
        scaledSize: new google.maps.Size(40, 40)
      },
      zIndex: 500
    });

    const infoContent = `
      <div style="padding: 10px; min-width: 220px; font-family: sans-serif;">
        <div style="font-size: 1.1em; margin-bottom: 6px;">
          🏙️ <strong style="color: #C05621;">
            ${getText(city.name, city.name_en)}
          </strong>
        </div>
        <div style="color: #4A5568; font-size: 0.9em; margin-bottom: 6px;">
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

  // 添加特色地点标记（黄色星标）
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
        url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        scaledSize: new google.maps.Size(48, 48)
      },
      zIndex: 1000
    });

    const infoContent = `
      <div style="padding: 10px; min-width: 220px; font-family: sans-serif;">
        <div style="font-size: 1.2em; margin-bottom: 6px;">
          ⭐ <strong style="color: #B8860B;">
            ${getText(place.name, place.name_en)}
          </strong>
        </div>
        <div style="color: #4A5568; font-size: 0.95em; margin-bottom: 6px;">
          ${getText(place.description, place.description_en)}
        </div>
        <div style="color: #718096; font-size: 0.85em; margin-bottom: 6px;">
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

  // 渲染地区列表
  function renderRegionsList(countriesData) {
    const container = document.getElementById('countries-by-region');
    if (!container) return;

    // 按地区分组
    const regions = {};
    countriesData.forEach(country => {
      const regionKey = getText(country.region, country.region_en);
      if (!regions[regionKey]) {
        regions[regionKey] = [];
      }
      regions[regionKey].push(country);
    });

    // 地区图标
    const regionIcons = {
      '亚洲': '🌏', 'Asia': '🌏',
      '中亚': '🏔️', 'Central Asia': '🏔️',
      '欧洲': '🌍', 'Europe': '🌍',
      '北美洲': '🌎', 'North America': '🌎',
      '南美洲': '🌎', 'South America': '🌎',
      '大洋洲': '🌊', 'Oceania': '🌊'
    };

    // 地区顺序
    const regionOrder = isEnglish ? 
      ['Asia', 'Central Asia', 'Europe', 'North America', 'South America', 'Oceania'] :
      ['亚洲', '中亚', '欧洲', '北美洲', '南美洲', '大洋洲'];

    // 按顺序渲染
    regionOrder.forEach(regionName => {
      if (regions[regionName]) {
        const regionSection = createRegionSection(
          regionName, 
          regions[regionName], 
          regionIcons[regionName] || '🌐'
        );
        container.appendChild(regionSection);
      }
    });
  }

  function createRegionSection(regionName, countries, icon) {
    const section = document.createElement('div');
    section.className = 'region-section';

    const header = document.createElement('div');
    header.className = 'region-header expanded';
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

    // 特色地点
    if (country.featured_places && country.featured_places.length > 0) {
      html += `<div class="featured-places">`;
      html += `<div class="featured-places-title">${getText('特色地点', 'Featured Places')}</div>`;
      
      country.featured_places.forEach(place => {
        const placeName = getText(place.name, place.name_en);
        const placeDesc = getText(place.description, place.description_en);
        
        html += `
          <div class="featured-place">
            <span class="star-icon">⭐</span>
            <div class="featured-place-info">
              <div class="featured-place-name">${placeName}</div>
              <div class="featured-place-description">${placeDesc}</div>
            </div>
          </div>
        `;
      });
      
      html += `</div>`;
    }

    // 访问城市
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

  // 加载数据
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

  // 初始化函数
  async function init() {
    console.log('=== Grand Tour (Google Maps三层标记版本) 初始化 ===');
    
    const mapContainer = document.getElementById('world-map');
    const listContainer = document.getElementById('countries-by-region');
    
    if (!mapContainer) {
      console.error('地图容器未找到');
      return;
    }

    // 检查Google Maps API
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API未加载');
      mapContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #718096;">
          <p>${getText('Google Maps加载中...', 'Loading Google Maps...')}</p>
        </div>
      `;
      return;
    }

    // 加载数据
    const countriesData = await loadData();
    
    if (countriesData.length === 0) {
      console.error('未加载到数据');
      return;
    }

    console.log(`成功加载 ${countriesData.length} 个国家的数据`);

    // 初始化地图
    const map = initializeMap();
    console.log('Google地图初始化完成');

    // 统计
    let cityCount = 0;
    let featuredCount = 0;

    // 添加所有标记
    countriesData.forEach(country => {
      // 国家标记（蓝色）
      addCountryMarker(map, country);
      
      // 城市标记（橙色）
      if (country.cities && country.cities.length > 0) {
        country.cities.forEach(city => {
          if (city.show_on_map) {
            addCityMarker(map, city, country);
            cityCount++;
          }
        });
      }
      
      // 特色地点标记（黄色）
      if (country.featured_places && country.featured_places.length > 0) {
        country.featured_places.forEach(place => {
          addFeaturedMarker(map, place, country);
          featuredCount++;
        });
      }
    });

    console.log(`标记统计: ${countriesData.length}个国家, ${cityCount}个城市, ${featuredCount}个特色地点`);

    // 渲染列表
    if (listContainer) {
      listContainer.innerHTML = '';
      renderRegionsList(countriesData);
    }

    console.log('=== 初始化完成 ===');
  }

  // 等待Google Maps API加载完成后初始化
  if (typeof google !== 'undefined' && google.maps) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } else {
    window.initGrandTourMap = init;
  }

})();
