import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MAPBOX_ACCESS_TOKEN } from '../services/mapApi';
import { Locate, ZoomIn, ZoomOut, RefreshCw, Layers, ChevronDown } from 'lucide-react';

// Google Maps-like Tile Layer Configurations
const GOOGLE_STYLE_LAYERS = {
  streets: {
    name: 'Default Map',
    icon: '🗺️',
    url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  satellite: {
    name: 'Satellite',
    icon: '🛰️',
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  terrain: {
    name: 'Terrain',
    icon: '⛰️',
    url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
  dark: {
    name: 'Night Mode',
    icon: '🌙',
    url: `https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`,
  },
};

const OSM_FALLBACK_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function RealMapView({
  markers = [],
  selectedMarker = null,
  onSelectMarker = () => {},
  height = '420px',
  className = '',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const leafletMarkersRef = useRef({});
  const userGpsMarkerRef = useRef(null);

  const [activeStyleKey, setActiveStyleKey] = useState('streets');
  const [userLocating, setUserLocating] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  // Default map center
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
        <svg width="32" height="42" viewBox="0 0 38 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 3px 6px rgba(0,0,0,0.3));">
          <path d="M19 0C8.50659 0 0 8.50659 0 19C0 31.5 19 50 19 50C19 50 38 31.5 38 19C38 8.50659 29.4934 0 19 0Z" fill="${pinColor}"/>
          <circle cx="19" cy="18" r="11" fill="white"/>
        </svg>
        <div class="absolute top-[7px] left-1/2 -translate-x-1/2 text-[11px] font-bold select-none pointer-events-none">
          ${innerIcon}
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'google-maps-pin-marker',
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -40],
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
    const tileUrl = hasToken ? GOOGLE_STYLE_LAYERS.streets.url : OSM_FALLBACK_URL;

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1,
      attribution: '© Google / Mapbox © OpenStreetMap',
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Invalidate size on mount & container resize to prevent tile cutoffs
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
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

    markers.forEach((item) => {
      if (typeof item.lat !== 'number' || typeof item.lng !== 'number') return;

      const isSelected = selectedMarker?.id === item.id;
      const icon = createGoogleTeardropIcon(item, isSelected);

      const leafletMarker = L.marker([item.lat, item.lng], { icon }).addTo(map);

      // Google Maps Styled Popup Card
      const popupHtml = `
        <div style="font-family: 'Roboto', 'Inter', sans-serif; padding: 2px; max-width: 210px; color: #202124;">
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #5f6368; letter-spacing: 0.5px; margin-bottom: 2px;">
            ${item.type} • ${item.district || 'Sector'}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #1a73e8; margin-bottom: 4px; line-height: 1.3;">
            ${item.title}
          </div>
          <div style="font-size: 11px; color: #3c4043; margin-bottom: 6px;">
            📍 ${item.address}
          </div>
          <div style="padding-top: 4px; border-top: 1px solid #dadce0; font-size: 10px; color: #1a73e8; font-weight: 600;">
            AI CONF: ${item.confidence || '98%'}
          </div>
        </div>
      `;

      leafletMarker.bindPopup(popupHtml, { closeButton: true, className: 'google-maps-info-window' });

      leafletMarker.on('click', () => {
        onSelectMarker(item);
      });

      leafletMarkersRef.current[item.id] = leafletMarker;
    });
  }, [markers, selectedMarker]);

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

        if (userGpsMarkerRef.current) {
          userGpsMarkerRef.current.remove();
        }

        const userHtml = `
          <div class="relative flex items-center justify-center">
            <span class="absolute -inset-3 rounded-full bg-blue-500/40 animate-ping"></span>
            <div class="w-5 h-5 rounded-full bg-[#1A73E8] border-2 border-white shadow-2xl flex items-center justify-center text-white text-[9px] font-bold">
              📍
            </div>
          </div>
        `;
        const userIcon = L.divIcon({
          html: userHtml,
          className: 'google-user-gps-dot',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        userGpsMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b style="color: #1A73E8;">📍 Your Live Location</b>')
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

  const isFlexHeight = height === 'fill' || height === '100%';
  const styleObj = isFlexHeight ? {} : { height };
  const heightClass = isFlexHeight ? 'h-full flex-1 min-h-[300px]' : '';

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-zinc-200/80 shadow-lg bg-[#f8f9fa] ${heightClass} ${className}`} style={styleObj}>
      {/* Map DOM Container - Clean Open Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Compact Top-Right Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Layer Style Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowStyleMenu(!showStyleMenu)}
            className="h-9 px-3 rounded-full bg-white/95 backdrop-blur-md text-zinc-800 shadow-md border border-zinc-200/80 flex items-center gap-1.5 text-xs font-semibold hover:bg-zinc-50 active:scale-95 transition-all"
          >
            <span>{GOOGLE_STYLE_LAYERS[activeStyleKey]?.icon}</span>
            <span className="hidden sm:inline font-mono">{GOOGLE_STYLE_LAYERS[activeStyleKey]?.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${showStyleMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Style Dropdown Popover */}
          {showStyleMenu && (
            <div className="absolute right-0 top-11 bg-white/95 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-zinc-200 w-44 flex flex-col gap-1 z-30 animate-fadeIn">
              {Object.entries(GOOGLE_STYLE_LAYERS).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveStyleKey(key);
                    setShowStyleMenu(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-xs text-left font-medium transition-all flex items-center gap-2.5 ${
                    activeStyleKey === key
                      ? 'bg-blue-50 text-[#1A73E8] font-bold'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span className="text-base">{style.icon}</span>
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom-Right Controls Bar */}
      <div className="absolute right-3 bottom-5 z-10 flex flex-col gap-2 pointer-events-auto">
        {/* GPS Location Button */}
        <button
          onClick={handleLocateUser}
          title="Find my location"
          className={`w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-zinc-700 shadow-md border border-zinc-200 flex items-center justify-center hover:bg-blue-50 hover:text-[#1A73E8] transition-all active:scale-95 ${
            userLocating ? 'animate-spin text-blue-600' : ''
          }`}
        >
          <Locate className="w-4 h-4" />
        </button>

        {/* Reset View Button */}
        <button
          onClick={handleReset}
          title="Reset map view"
          className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-zinc-700 shadow-md border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Controls */}
        <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-zinc-200 overflow-hidden">
          <button
            onClick={handleZoomIn}
            title="Zoom in"
            className="w-9 h-9 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center border-b border-zinc-100 transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom out"
            className="w-9 h-9 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
