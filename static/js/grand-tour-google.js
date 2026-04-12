// Grand Tour - Google Maps版本（三层标记系统 - 优化版）
// 🔵 蓝色：国家标记 | 🟠 橙色：城市标记 | 🟡 黄色：景点标记
// 优化：简洁圆点样式 + 优化控件 + 改进弹窗布局

(function() {
  'use strict';

  // 检测当前语言
  const currentLang = document.documentElement.lang || 'zh';
  const isEnglish = currentLang.includes('en');

  // 配置
  const CONFIG = {
    dataPath: '/data/countries.json',
    mapCenter: { lat: 20, lng: 0 },
    mapZoom: 2,
    // ImageKit CDN配置 - Sydney (Australia) region
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

  // 生成图片HTML
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
    
    const twoLetterCode = codeMap[countryCode];
    if (!twoLetterCode) return '🌍';
    
    const codePoints = twoLetterCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    
    return String.fromCodePoint(...codePoints);
  }

  // 初始化地图（优化控件配置）
  function initializeMap() {
    const mapElement = document.getElementById('world-map');
    
    const map = new google.maps.Map(mapElement, {
      center: CONFIG.mapCenter,
      zoom: CONFIG.mapZoom,
      minZoom: 2,
      maxZoom: 18,
      // 优化控件配置
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
      // 方案A：简洁圆点样式
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#378ADD',      // 蓝色
        fillOpacity: 1,
        strokeColor: '#ffffff',     // 白色边框
        strokeWeight: 2,
        scale: 6                    // 小一点
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

  // 添加城市标记（橙色圆点 - 方案A）
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
      // 方案A：简洁圆点样式
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#C05621',      // 橙色
        fillOpacity: 1,
        strokeColor: '#ffffff',     // 白色边框
        strokeWeight: 2,
        scale: 8                    // 城市标记稍大
      },
      zIndex: 500
    });

    // 优化弹窗布局 - 解决换行问题
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

  // 添加特色地点标记（黄色圆点 - 方案A）
  function addFeaturedMarker(map, place, country) {
    const position = {
      lat: place.latitude,
      lng: place.longitude
    };

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: getText(place.name, place.name_en),
      // 方案A：简洁圆点样式
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#B8860B',      // 黄色（金色）
        fillOpacity: 1,
        strokeColor: '#ffffff',     // 白色边框
        strokeWeight: 2,
        scale: 10                   // 特色地点最大
      },
      zIndex: 1000
    });

    // 优化弹窗布局
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

  // 渲染地区列表
  function renderRegionsList(countriesData) {
    const regions = {
      '亚洲': { en: 'Asia', countries: [] },
      '欧洲': { en: 'Europe', countries: [] },
      '美洲': { en: 'Americas', countries: [] },
      '大洋洲': { en: 'Oceania', countries: [] }
    };

    // 按地区分组
    countriesData.forEach(country => {
      const region = country.region;
      if (regions[region]) {
        regions[region].countries.push(country);
      }
    });

    const listContainer = document.getElementById('countries-by-region');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    // 渲染每个地区
    Object.keys(regions).forEach(regionName => {
      const region = regions[regionName];
      if (region.countries.length === 0) return;

      const regionElement = createRegionElement(regionName, region);
      listContainer.appendChild(regionElement);
    });
  }

  // 创建地区元素
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

  // 创建国家列表项
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
    console.log('=== Grand Tour (Google Maps优化版 - 圆点样式) 初始化 ===');
    
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
    console.log('Google地图初始化完成 - 使用优化控件配置');

    // 统计
    let cityCount = 0;
    let featuredCount = 0;

    // 添加所有标记
    countriesData.forEach(country => {
      // 国家标记（蓝色圆点）
      addCountryMarker(map, country);
      
      // 城市标记（橙色圆点）
      if (country.cities && country.cities.length > 0) {
        country.cities.forEach(city => {
          if (city.show_on_map) {
            addCityMarker(map, city, country);
            cityCount++;
          }
        });
      }
      
      // 特色地点标记（黄色圆点）
      if (country.featured_places && country.featured_places.length > 0) {
        country.featured_places.forEach(place => {
          addFeaturedMarker(map, place, country);
          featuredCount++;
        });
      }
    });

    console.log(`标记统计: ${countriesData.length}个国家, ${cityCount}个城市, ${featuredCount}个特色地点`);
    console.log('样式: 方案A - 简洁圆点 ✅');

    // 渲染列表
    if (listContainer) {
      listContainer.innerHTML = '';
      renderRegionsList(countriesData);
      console.log('国家列表渲染完成');
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
