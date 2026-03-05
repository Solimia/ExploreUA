import React, { useEffect, useState } from 'react';
import './LocationDetail.css';
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const LocationDetail = ({ selectedLocation, allLocations = [], onSelectLocation, onBack }) => {


  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://localhost:7151/api/Geometer/Get_Geometer_By_Id?Id=${selectedLocation.id}`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Помилка при завантаженні локацій:', error);
      }
    };
    fetchLocation();
  }, [selectedLocation?.id]);


  if (!location) {
    return <div className="location-detail">Завантаження...</div>;
  }

  const nearby = allLocations
    .filter(loc => loc.name !== location.name)
    .map(loc => ({
      ...loc,
      distance: getDistance(location.latitude, location.longitude, loc.latitude, loc.longitude)
    }))
    .filter(loc => !isNaN(loc.distance))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);


  const hasMainImage = location.images && location.images.length > 0;

  return (
    <div className="location-detail">
      <button className="back-button" onClick={onBack}>← Назад до списку</button>
      <h2>{location.name}</h2>


      {hasMainImage && (
        <img
          src={location.images[0].imgUrl}
          alt={location.name}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}

      <p><strong>{location.description}</strong></p>
      <p>{location.detailedDescription}</p>

      {nearby.length > 0 && (
        <div className="nearby-locations">
          <h3>Локації поруч</h3>
          <div className="nearby-scroll">
            {nearby.map(loc => {

              const hasNearbyImg = loc.images && loc.images.length > 0;
              return (
                <div key={loc.id || loc.name} className="v2-card" onClick={() => onSelectLocation(loc)}>
                  <div className="v2-card-image-wrap">
                    {hasNearbyImg ? (
                      <img src={loc.images[0].imgUrl} alt={loc.name} />
                    ) : (
                      <div className="v2-placeholder">Немає фото</div>
                    )}
                  </div>

                  <div className="v2-card-content">
                    <h4 className="v2-title">{loc.name}</h4>
                    <span className="v2-distance">{Math.round(loc.distance)} км</span>

                    <div className="v2-actions">
                      <button className="v2-btn">Переглянути</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetail;