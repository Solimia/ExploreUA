import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import locations from '../data/locations';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapView = ({ center = [48.5, 31.5], zoom = 6, onMarkerClick }) => {
  
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersLayer = useRef(null);
  

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    markersLayer.current = L.layerGroup().addTo(mapInstance.current);

    return () => {
      mapInstance.current.remove();
      mapInstance.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstance.current) return;

    // Очищаємо попередні маркери
    markersLayer.current.clearLayers();

    // Додаємо нові маркери з обробником кліку
    locations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng])
        .bindPopup(`<b>${loc.name}</b><br>${loc.description || ''}`);

      marker.on('click', () => {
        if (onMarkerClick) onMarkerClick(loc);
      });

      markersLayer.current.addLayer(marker);
    });
  }, [onMarkerClick]); // Залежність від onMarkerClick, щоб оновити обробники при зміні

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};



export default MapView;