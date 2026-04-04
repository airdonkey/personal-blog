---
title: "游历"
description: "42个国家的足迹与观察"
layout: "grand-tour"
---

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
      <div class="stat-number">15</div>
      <div class="stat-label">特色地点</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">100+</div>
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

<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- 自定义样式 -->
<link rel="stylesheet" href="/css/grand-tour.css">

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- 自定义脚本 -->
<script src="/js/grand-tour-leaflet.js"></script>
