import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MAPBOX_ACCESS_TOKEN } from '../services/mapApi';
import { Navigation, Layers, Locate, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

// Define Mapbox tile style endpoints
const MAPBOX_STYLES = {
  dark: {
    name: 'Dark GIS',
    icon: '🌙',
    url: `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  streets: {
    name: 'Streets',
    icon: '🗺️',
    url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  satellite: {
    name: 'Satellite',
    icon: '🛰️',
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  outdoors: {
    name: 'Terrain',
    icon: '⛰️',
    url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
};

const OSM_FALLBACK_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function RealMapView({
  markers = [],
  selectedMarker = null,
  onSelectMarker = () => {},
  height = '500px',
  className = '',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const leafletMarkersRef = useRef({});
  const userGpsMarkerRef = useRef(null);

  const [activeStyleKey, setActiveStyleKey] = useState('dark');
  const [userLocating, setUserLocating] = useState(false);

  // Default map center (Downtown SF area where mock data points exist)
  const defaultCenter = [37.7749, -122.4194];
  const defaultZoom = 13;

  // Helper to create custom HTML markers for Leaflet
  const createCustomDivIcon = (marker, isSelected) => {
    let colorClass = 'bg-amber-500 text-black border-amber-300';
    let ringHtml = '';

    if (marker.type === 'safe') {
      colorClass = 'bg-emerald-500 text-black border-emerald-300';
    } else if (marker.type === 'traffic') {
      colorClass = 'bg-orange-500 text-white border-orange-300';
    } else if (marker.severity === 'critical') {
      colorClass = 'bg-red-600 text-white border-red-300';
      ringHtml = `<span class="absolute -inset-2.5 rounded-full bg-red-500/40 animate-ping"></span>`;
    }

    const scaleStyle = isSelected ? 'transform: scale(1.35); z-index: 999;' : '';

    const html = `
      <div class="relative flex items-center justify-center cursor-pointer transition-all duration-300" style="${scaleStyle}">
        ${ringHtml}
        <div class="relative w-8 h-8 rounded-full ${colorClass} border-2 shadow-2xl flex items-center justify-center font-bold text-xs">
          ${
            marker.type === 'safe'
              ? '✓'
              : marker.type === 'traffic'
              ? '🚗'
              : '⚠️'
          }
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-real-map-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Map instance
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add scale control
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Initial Tile Layer
    const hasToken = MAPBOX_ACCESS_TOKEN && MAPBOX_ACCESS_TOKEN.startsWith('pk.');
    const tileUrl = hasToken ? MAPBOX_STYLES.dark.url : OSM_FALLBACK_URL;

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1,
      attribution: '© Mapbox © OpenStreetMap',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when Map Style changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    const hasToken = MAPBOX_ACCESS_TOKEN && MAPBOX_ACCESS_TOKEN.startsWith('pk.');
    const styleObj = MAPBOX_STYLES[activeStyleKey] || MAPBOX_STYLES.dark;
    const tileUrl = hasToken ? styleObj.url : OSM_FALLBACK_URL;

    tileLayerRef.current.setUrl(tileUrl);
  }, [activeStyleKey]);

  // Render & Update Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(leafletMarkersRef.current).forEach((m) => m.remove());
    leafletMarkersRef.current = {};

    // Add new markers
    markers.forEach((item) => {
      if (typeof item.lat !== 'number' || typeof item.lng !== 'number') return;

      const isSelected = selectedMarker?.id === item.id;
      const icon = createCustomDivIcon(item, isSelected);

      const leafletMarker = L.marker([item.lat, item.lng], { icon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
          <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #666; margin-bottom: 2px;">
            ${item.type} • ${item.district || 'Sector'}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #111; margin-bottom: 4px;">
            ${item.title}
          </div>
          <div style="font-size: 11px; color: #555; margin-bottom: 6px;">
            📍 ${item.address}
          </div>
          <div style="font-size: 10px; background: #111; color: #fff; padding: 2px 6px; border-radius: 4px; display: inline-block;">
            AI CONF: ${item.confidence || '98%'}
          </div>
        </div>
      `;

      leafletMarker.bindPopup(popupHtml, { closeButton: false, offset: [0, -10] });

      leafletMarker.on('click', () => {
        onSelectMarker(item);
      });

      leafletMarkersRef.current[item.id] = leafletMarker;
    });
  }, [markers, selectedMarker]);

  // Pan to selected marker when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMarker) return;

    if (typeof selectedMarker.lat === 'number' && typeof selectedMarker.lng === 'number') {
      map.flyTo([selectedMarker.lat, selectedMarker.lng], 15, {
        animate: true,
        duration: 1.2,
      });

      const leafletMarker = leafletMarkersRef.current[selectedMarker.id];
      if (leafletMarker) {
        leafletMarker.openPopup();
      }
    }
  }, [selectedMarker]);

  // Handle GPS location trigger
  const handleLocateUser = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setUserLocating(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setUserLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocating(false);
        const { latitude, longitude } = pos.coords;

        map.flyTo([latitude, longitude], 16, { animate: true, duration: 1.5 });

        // Add user location blue pin
        if (userGpsMarkerRef.current) {
          userGpsMarkerRef.current.remove();
        }

        const userHtml = `
          <div class="relative flex items-center justify-center">
            <span class="absolute -inset-3 rounded-full bg-blue-500/50 animate-ping"></span>
            <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-xl"></div>
          </div>
        `;
        const userIcon = L.divIcon({
          html: userHtml,
          className: 'user-gps-pin',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        userGpsMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>📍 Your Live GPS Location</b>')
          .openPopup();
      },
      (err) => {
        setUserLocating(false);
        alert(`GPS location error: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.flyTo(defaultCenter, defaultZoom, { duration: 1 });
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-black/15 shadow-2xl bg-zinc-950 ${className}`} style={{ height }}>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Status Badge */}
        <div className="pointer-events-auto bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-xl border border-white/20 shadow-lg flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>MAPBOX LIVE GIS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        {/* Style Selector Buttons */}
        <div className="pointer-events-auto bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg flex items-center gap-1">
          {Object.entries(MAPBOX_STYLES).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setActiveStyleKey(key)}
              title={style.name}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                activeStyleKey === key
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{style.icon}</span>
              <span className="hidden sm:inline">{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Floating Right Controls */}
      <div className="absolute right-3 bottom-6 z-10 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleLocateUser}
          title="Find My Location"
          className={`w-9 h-9 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-xl hover:bg-white hover:text-black transition-all ${
            userLocating ? 'animate-spin text-emerald-400' : ''
          }`}
        >
          <Locate className="w-4 h-4" />
        </button>

        <button
          onClick={handleReset}
          title="Reset View"
          className="w-9 h-9 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-xl hover:bg-white hover:text-black transition-all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden shadow-xl">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-9 h-9 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center border-b border-white/10"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-9 h-9 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
