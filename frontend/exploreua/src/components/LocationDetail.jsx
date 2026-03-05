import React from 'react';

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const LocationDetail = ({ location, allLocations, onSelectLocation, onBack }) => {
  if (!location) return null;

  const nearby = allLocations
    .filter(loc => loc.name !== location.name)
    .map(loc => ({
      ...loc,
      distance: getDistance(location.lat, location.lng, loc.lat, loc.lng)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5); 

  return (
    <div className="location-detail">
      <button className="back-button" onClick={onBack}>← Назад до списку</button>
      <h2>{location.name}</h2>
      {location.imageUrl && (
        <img 
          src={location.imageUrl} 
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
            {nearby.map(loc => (
              <div 
                key={loc.name} 
                className="nearby-card"
                onClick={() => onSelectLocation(loc)}
              >
                <img src={loc.imageUrl} alt={loc.name} />
                <p>{loc.name}</p>
                <small>{Math.round(loc.distance)} км</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetail;