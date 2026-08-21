/**
 * RoadVision AI - Live Map & Geocoding API Service
 * Integrates OpenStreetMap Nominatim reverse geocoding & Leaflet live location telemetry.
 */

export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

// Reverse Geocoding API: Convert (lat, lng) to real street address
export async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'RoadVisionAI/1.0 (civic-connect-app)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return {
      address: data.display_name || `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      road: data.address?.road || data.address?.pedestrian || 'Local Road',
      suburb: data.address?.suburb || data.address?.neighbourhood || 'City Center',
      city: data.address?.city || data.address?.town || 'Metropolis',
      postcode: data.address?.postcode || '',
    };
  } catch (error) {
    console.warn('Reverse geocoding fallback triggered:', error);
    return {
      address: `GPS: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      road: 'Detected Road Segment',
      city: 'Municipal Sector 4',
    };
  }
}

// Forward Geocoding API: Search place name -> (lat, lng)
export async function searchAddress(query) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
      {
        headers: {
          'User-Agent': 'RoadVisionAI/1.0 (civic-connect-app)',
        },
      }
    );

    if (!response.ok) return [];
    const results = await response.json();
    return results.map((item) => ({
      label: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (err) {
    console.error('Search address error:', err);
    return [];
  }
}

// Get User Current GPS Location
export function getCurrentGpsPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
