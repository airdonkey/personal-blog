(function () {
  "use strict";

  const section = document.querySelector(".map-section");
  const button = document.querySelector("#load-map");
  const mapElement = document.querySelector("#world-map");
  const status = document.querySelector("#map-status");

  if (!section || !button || !mapElement || !status) return;

  const isEnglish = section.dataset.mapLanguage === "en";

  function loadStylesheet(url) {
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector(`link[href="${url}"]`);
      if (existing) return resolve();
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      if (window.L) return resolve();
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function text(zh, en) {
    return isEnglish ? en : zh;
  }

  function popup(title, detail) {
    const wrapper = document.createElement("div");
    const heading = document.createElement("p");
    const copy = document.createElement("p");
    heading.className = "map-popup-title";
    copy.className = "map-popup-copy";
    heading.textContent = title;
    copy.textContent = detail || "";
    wrapper.append(heading, copy);
    return wrapper;
  }

  async function initialiseMap() {
    button.disabled = true;
    status.textContent = section.dataset.mapLoading;

    try {
      const leafletCss = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      const leafletJs = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

      const dataPromise = fetch(section.dataset.mapData).then(function (response) {
        if (!response.ok) throw new Error("Travel data could not be loaded");
        return response.json();
      });

      await Promise.all([
        loadStylesheet(leafletCss),
        loadScript(leafletJs),
        dataPromise,
      ]);

      const countries = await dataPromise;
      mapElement.hidden = false;

      const map = window.L.map(mapElement, {
        scrollWheelZoom: false,
        worldCopyJump: true,
      });

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const bounds = [];

      countries.forEach(function (country) {
        const countryName = text(country.country, country.country_en);
        const countryPosition = [country.latitude, country.longitude];
        bounds.push(countryPosition);

        window.L.circleMarker(countryPosition, {
          radius: 5,
          color: "#fffdf9",
          weight: 1.5,
          fillColor: "#8a5d1f",
          fillOpacity: 0.95,
        })
          .addTo(map)
          .bindPopup(popup(countryName, country.visit_date));

        (country.cities || []).forEach(function (city) {
          if (!city.show_on_map) return;
          const cityName = text(city.name, city.name_en);
          const cityNote = text(city.note, city.note_en);
          window.L.circleMarker([city.latitude, city.longitude], {
            radius: 3,
            color: "#fffdf9",
            weight: 1,
            fillColor: "#536572",
            fillOpacity: 0.9,
          })
            .addTo(map)
            .bindPopup(popup(cityName, cityNote));
        });

        (country.featured_places || []).forEach(function (place) {
          const placeName = text(place.name, place.name_en);
          const description = text(place.description, place.description_en);
          window.L.circleMarker([place.latitude, place.longitude], {
            radius: 7,
            color: "#fffdf9",
            weight: 2,
            fillColor: "#704813",
            fillOpacity: 1,
          })
            .addTo(map)
            .bindPopup(popup(placeName, description));
        });
      });

      map.fitBounds(bounds, { padding: [24, 24] });
      button.hidden = true;
      status.textContent = "";
    } catch (error) {
      button.disabled = false;
      status.textContent = section.dataset.mapError;
      console.error(error);
    }
  }

  button.addEventListener("click", initialiseMap, { once: true });
})();
