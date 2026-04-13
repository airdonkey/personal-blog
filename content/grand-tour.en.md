---
title: "Grand Tour"
description: "Footprints across 42 countries"
layout: "grand-tour"
date: ""
---

<!-- Allow Google Maps resources -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://*.google.com https://*.googleapis.com data: blob:;
  img-src 'self' https: data: blob:;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://*.google.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
">

<!-- Custom styles -->
<link rel="stylesheet" href="/css/grand-tour.css">

<style>
/* Map controls - Clear visibility */
.gm-style .gm-style-mtc,
.gm-bundled-control,
.gm-fullscreen-control {
  background-color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
  border: 2px solid rgba(0,0,0,0.3) !important;
}

.gm-style button {
  background-color: #ffffff !important;
  color: #1a1a1a !important;
}
</style>

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
      <div class="stat-number">34</div>
      <div class="stat-label">Featured Places</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">88</div>
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

<!-- Custom script -->
<script src="/js/grand-tour-google.js"></script>
