---
title: "Grand Tour"
description: "Footprints across 42 countries"
layout: "grand-tour"
---

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
      <div class="stat-number">36</div>
      <div class="stat-label">Featured Places</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">87</div>
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
