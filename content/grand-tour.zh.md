---
title: "游历"
description: "42个国家的足迹与观察"
layout: "grand-tour"
---

<!-- 自定义样式 -->
<link rel="stylesheet" href="/css/grand-tour.css">

<div class="grand-tour-page">
  <div class="grand-tour-header">
    <h1>游历世界</h1>
    <p class="subtitle">42个国家的足迹与观察</p>
  </div>

  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-number">42</div>
      <div class="stat-label">已访问国家</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">36</div>
      <div class="stat-label">特色地点</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">87</div>
      <div class="stat-label">探访城市</div>
    </div>
  </div>

  <div class="map-section">
    <div class="map-container">
      <div id="world-map"></div>
    </div>
  </div>

  <div class="regions-list">
    <div id="countries-by-region"></div>
  </div>
</div>

<!-- Google Maps API -->
<script>
(function() {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyATeosKyKs3Fj4xiM3cc2MeLDGOdLX1NBo&callback=initGrandTourMap';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
})();
</script>

<!-- 自定义脚本 -->
<script src="/js/grand-tour-google.js"></script>
