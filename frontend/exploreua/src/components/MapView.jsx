import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';



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
  const [locations, setLocations] = React.useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://localhost:7151/api/Geometer');
        const data = await response.json();
        setLocations(data);
        console.log('Завантажені локації для карти:', data);
      } catch (error) {
        console.error('Помилка при завантаженні локацій:', error);
      }
    };
    fetchLocations();
  }, []);

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
    if (!mapInstance.current || !center || center[0] === undefined || center[1] === undefined) {
      return;
    }

    mapInstance.current.flyTo(center, zoom, {
      animate: true,
      duration: 1.5
    });
  }, [center, zoom]);
  useEffect(() => {
    if (!mapInstance.current) return;

    // Очищаємо попередні маркери
    markersLayer.current.clearLayers();

    // Додаємо нові маркери з обробником кліку
    locations.forEach(loc => {
      const marker = L.marker([loc.latitude, loc.longitude])
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