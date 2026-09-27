# Pakistan in Bloom — Interactive Web GIS

An editorial, vintage-inspired Leaflet application for MET418 Lab 03. Its muted olive, antique-gold, and warm-ivory palette follows the supplied design reference. The project uses separate GeoJSON files for 15 cities and 15 weather stations, with feature popups, switchable OpenStreetMap and satellite basemaps, and a layer control.

Prepared by **Meerab Qayyum** — Registration No. **FA23-BRG-076**.

## Run locally

GeoJSON is loaded with `fetch()`, so serve this folder over HTTP rather than opening `index.html` directly. In VS Code, open this folder and use **Live Server**; or run `npx http-server .` from this directory and open the local URL it prints.

The page uses Leaflet from unpkg, Esri World Imagery, OpenStreetMap tiles, and Google Fonts. Internet access is needed for those external map and font resources.

## Data note

The city GeoJSON contains city name, province/administrative area, and type. Weather station GeoJSON contains station name, temperature, and rainfall. Weather values are illustrative sample values included for the assignment and are not live or official observations.

## Project structure

```text
WebGIS_Lab03/
├── index.html
├── style.css
├── script.js
└── data/
    ├── cities.geojson
    └── weather_stations.geojson
```
