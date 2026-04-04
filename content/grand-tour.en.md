---
title: "Grand Tour"
description: "Footprints across 42 countries"
layout: "grand-tour"
---

<!-- Leaflet CSS - Must load before map container -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- Custom styles -->
<link rel="stylesheet" href="/css/grand-tour.css">

<div class="grand-tour-page">
  <div class="grand-tour-header">
    <h1>Grand Tour</h1>
    <p class="subtitle">Footprints across 42 countries</p>
  </div>

  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-number">42</div>
      <div class="stat-label">Countries Visited</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">15</div>
      <div class="stat-label">Featured Places</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">100+</div>
      <div class="stat-label">Cities Explored</div>
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

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Custom script -->
<script src="/js/grand-tour-leaflet.js"></script>
