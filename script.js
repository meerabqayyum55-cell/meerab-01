/* Pakistan in Bloom | Web GIS Applications (MET418), Lab 03
   City and station features are loaded from separate GeoJSON files. */
const map = L.map('map', { zoomControl: false, scrollWheelZoom: true }).setView([30.35, 69.35], 5);
L.control.zoom({ position: 'topright' }).addTo(map);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri'
});
osm.addTo(map);

const cityIcon = L.divIcon({ className: 'city-marker', iconSize: [13, 13], iconAnchor: [6, 6] });
const stationIcon = L.divIcon({ className: 'station-marker', html: '✳', iconSize: [22, 22], iconAnchor: [11, 11] });

function row(label, value) {
  return `<div class="popup-row"><span>${label}</span><strong>${value}</strong></div>`;
}

async function loadGeoJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
  return response.json();
}

async function initLayers() {
  try {
    const [citiesData, stationsData] = await Promise.all([
      loadGeoJson('data/cities.geojson'),
      loadGeoJson('data/weather_stations.geojson')
    ]);

    const citiesLayer = L.geoJSON(citiesData, {
      pointToLayer: (_feature, latlng) => L.marker(latlng, { icon: cityIcon }),
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindPopup(`<p class="popup-kicker">City · ${p.province}</p><h3 class="popup-name">${p.name}</h3>${row('Province', p.province)}${row('Type', p.type)}`);
        layer.bindTooltip(p.name, { direction: 'right', offset: [9, 0], className: 'city-label' });
      }
    });

    const stationsLayer = L.geoJSON(stationsData, {
      pointToLayer: (_feature, latlng) => L.marker(latlng, { icon: stationIcon }),
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindPopup(`<p class="popup-kicker">Illustrative station reading</p><h3 class="popup-name">${p.station}</h3>${row('Temperature', `${p.temperature} °C`)}${row('Rainfall', `${p.rainfall} mm`)}${row('Reading type', 'Sample data')}`);
      }
    });

    citiesLayer.addTo(map);
    stationsLayer.addTo(map);
    L.control.layers(
      { 'OpenStreetMap': osm, 'Satellite imagery': satellite },
      { 'Cities (15)': citiesLayer, 'Weather stations (15)': stationsLayer },
      { position: 'topright', collapsed: false }
    ).addTo(map);
  } catch (error) {
    console.error(error);
    const notice = document.createElement('div');
    notice.className = 'data-error';
    notice.textContent = 'Map data could not be loaded. Open this folder with a local web server (for example, VS Code Live Server).';
    document.querySelector('.map-frame').append(notice);
  }
}

initLayers();
