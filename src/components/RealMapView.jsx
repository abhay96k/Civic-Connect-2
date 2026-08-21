import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MAPBOX_ACCESS_TOKEN } from '../services/mapApi';
import { Search, Compass, Locate, ZoomIn, ZoomOut, Layers, RefreshCw, Car, Navigation2, CheckCircle2 } from 'lucide-react';

// Google Maps-like Tile Layer Configurations
const GOOGLE_STYLE_LAYERS = {
  streets: {
    name: 'Default',
    sub: 'Map view',
    icon: '🗺️',
    url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  satellite: {
    name: 'Satellite',
    sub: 'Imagery view',
    icon: '🛰️',
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  terrain: {
    name: 'Terrain',
    sub: 'Elevation & topo',
    icon: '⛰️',
    url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  dark: {
    name: 'Night',
    sub: 'Dark mode view',
    icon: '🌙',
    url: `https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
};

const OSM_FALLBACK_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function RealMapView({
  markers = [],
  selectedMarker = null,
  onSelectMarker = () => {},
  height = '520px',
  className = '',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const leafletMarkersRef = useRef({});
  const userGpsMarkerRef = useRef(null);

  const [activeStyleKey, setActiveStyleKey] = useState('streets'); // Default to Google Maps Streets
  const [userLocating, setUserLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Default map center (Downtown SF area where mock data points exist)
  const defaultCenter = [37.7749, -122.4194];
  const defaultZoom = 13;

  // Helper to create Google Maps Signature Teardrop Pin SVG HTML
  const createGoogleTeardropIcon = (marker, isSelected) => {
    let pinColor = '#EA4335'; // Google Pin Red for potholes
    let innerIcon = '⚠️';

    if (marker.type === 'safe') {
      pinColor = '#34A853'; // Google Green
      innerIcon = '✓';
    } else if (marker.type === 'traffic') {
      pinColor = '#FBBC05'; // Google Yellow/Orange
      innerIcon = '🚗';
    } else if (marker.severity === 'critical') {
      pinColor = '#D93025'; // Critical Google Red
    }

    const scale = isSelected ? 'scale(1.3)' : 'scale(1)';
    const zIndex = isSelected ? 9999 : 500;
    const pulseRing =
      marker.severity === 'critical'
        ? `<div class="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-500/40 animate-ping"></div>`
        : '';

    const html = `
      <div class="relative group cursor-pointer transition-all duration-300 transform ${scale}" style="z-index: ${zIndex};">
        ${pulseRing}
        <svg width="34" height="44" viewBox="0 0 38 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 3px 6px rgba(0,0,0,0.35));">
          <path d="M19 0C8.50659 0 0 8.50659 0 19C0 31.5 19 50 19 50C19 50 38 31.5 38 19C38 8.50659 29.4934 0 19 0Z" fill="${pinColor}"/>
          <circle cx="19" cy="18" r="11" fill="white"/>
        </svg>
        <div class="absolute top-[8px] left-1/2 -translate-x-1/2 text-xs font-bold select-none pointer-events-none">
          ${innerIcon}
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'google-maps-pin-marker',
      iconSize: [34, 44],
      iconAnchor: [17, 44],
      popupAnchor: [0, -42],
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

    // Add scale control (bottom left like Google Maps)
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Initial Tile Layer
    const hasToken = MAPBOX_ACCESS_TOKEN && MAPBOX_ACCESS_TOKEN.startsWith('pk.');
    const tileUrl = hasToken ? GOOGLE_STYLE_LAYERS.streets.url : OSM_FALLBACK_URL;

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1,
      attribution: '© Google / Mapbox © OpenStreetMap',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    const hasToken = MAPBOX_ACCESS_TOKEN && MAPBOX_ACCESS_TOKEN.startsWith('pk.');
    const styleObj = GOOGLE_STYLE_LAYERS[activeStyleKey] || GOOGLE_STYLE_LAYERS.streets;
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

    // Filter markers by search query if present
    const visibleMarkers = markers.filter((item) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.address?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q)
      );
    });

    // Add markers
    visibleMarkers.forEach((item) => {
      if (typeof item.lat !== 'number' || typeof item.lng !== 'number') return;

      const isSelected = selectedMarker?.id === item.id;
      const icon = createGoogleTeardropIcon(item, isSelected);

      const leafletMarker = L.marker([item.lat, item.lng], { icon }).addTo(map);

      // Google Maps Styled Popup Card
      const popupHtml = `
        <div style="font-family: 'Roboto', 'Inter', sans-serif; padding: 4px; max-width: 220px; color: #202124;">
          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #5f6368; letter-spacing: 0.5px; margin-bottom: 2px;">
            ${item.type} • ${item.district || 'Sector'}
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #1a73e8; margin-bottom: 4px; line-height: 1.3;">
            ${item.title}
          </div>
          <div style="font-size: 12px; color: #3c4043; margin-bottom: 8px;">
            📍 ${item.address}
          </div>
          <div style="display: flex; items-center; justify-content: space-between; padding-top: 6px; border-top: 1px solid #dadce0;">
            <span style="font-size: 11px; background: #e8f0fe; color: #1a73e8; font-weight: 600; padding: 3px 8px; border-radius: 12px;">
              AI CONF: ${item.confidence || '98%'}
            </span>
          </div>
        </div>
      `;

      leafletMarker.bindPopup(popupHtml, { closeButton: true, className: 'google-maps-info-window' });

      leafletMarker.on('click', () => {
        onSelectMarker(item);
      });

      leafletMarkersRef.current[item.id] = leafletMarker;
    });
  }, [markers, selectedMarker, searchQuery]);

  // Pan to selected marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMarker) return;

    if (typeof selectedMarker.lat === 'number' && typeof selectedMarker.lng === 'number') {
      map.flyTo([selectedMarker.lat, selectedMarker.lng], 16, {
        animate: true,
        duration: 1.2,
      });

      const leafletMarker = leafletMarkersRef.current[selectedMarker.id];
      if (leafletMarker) {
        leafletMarker.openPopup();
      }
    }
  }, [selectedMarker]);

  // Handle GPS User Location Trigger
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

        map.flyTo([latitude, longitude], 17, { animate: true, duration: 1.5 });

        // Add Google Blue Pulsing Location Dot
        if (userGpsMarkerRef.current) {
          userGpsMarkerRef.current.remove();
        }

        const userHtml = `
          <div class="relative flex items-center justify-center">
            <span class="absolute -inset-3 rounded-full bg-blue-500/40 animate-ping"></span>
            <div class="w-6 h-6 rounded-full bg-[#1A73E8] border-3 border-white shadow-2xl flex items-center justify-center text-white text-[10px] font-bold">
              📍
            </div>
          </div>
        `;
        const userIcon = L.divIcon({
          html: userHtml,
          className: 'google-user-gps-dot',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        userGpsMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b style="color: #1A73E8;">📍 Your Live Location (Google GPS)</b>')
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
    <div className={`relative rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl bg-[#f5f5f5] ${className}`} style={{ height }}>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Google Maps Top Search & Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Google Maps Search Box */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-full shadow-lg border border-zinc-200 w-full sm:w-80 transition-all focus-within:ring-2 focus-within:ring-blue-500">
          <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center text-white text-xs font-bold">
            G
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Google Maps GIS..."
            className="w-full text-xs font-sans text-zinc-900 placeholder-zinc-400 bg-transparent focus:outline-none"
          />
          <Search className="w-4 h-4 text-zinc-500" />
        </div>

        {/* Google Maps Layer Switcher Bar */}
        <div className="pointer-events-auto relative flex items-center gap-1.5 bg-white p-1 rounded-full shadow-lg border border-zinc-200 text-xs font-medium">
          {Object.entries(GOOGLE_STYLE_LAYERS).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setActiveStyleKey(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-1.5 ${
                activeStyleKey === key
                  ? 'bg-[#1A73E8] text-white shadow-sm'
                  : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <span>{style.icon}</span>
              <span>{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Google Maps Right Controls Bar */}
      <div className="absolute right-4 bottom-6 z-10 flex flex-col gap-2.5 pointer-events-auto">
        {/* GPS My Location Button */}
        <button
          onClick={handleLocateUser}
          title="Your location"
          className={`w-10 h-10 rounded-full bg-white text-zinc-700 shadow-xl border border-zinc-200 flex items-center justify-center hover:bg-blue-50 hover:text-[#1A73E8] transition-all active:scale-95 ${
            userLocating ? 'animate-spin text-blue-600' : ''
          }`}
        >
          <Locate className="w-5 h-5" />
        </button>

        {/* Reset View Button */}
        <button
          onClick={handleReset}
          title="Reset map view"
          className="w-10 h-10 rounded-full bg-white text-zinc-700 shadow-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-95"
        >
          <RefreshCw className="w-4.5 h-4.5" />
        </button>

        {/* Zoom In/Out Card */}
        <div className="flex flex-col bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
          <button
            onClick={handleZoomIn}
            title="Zoom in"
            className="w-10 h-10 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center border-b border-zinc-100 transition-all"
          >
            <ZoomIn className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom out"
            className="w-10 h-10 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center transition-all"
          >
            <ZoomOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
