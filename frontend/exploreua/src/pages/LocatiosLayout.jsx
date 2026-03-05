import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import './LocationsLayout.css';

function LocationsLayout() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([50.0, 30.0]);
  const [mapZoom, setMapZoom] = useState(4);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setMapCenter([location.latitude, location.longitude]);
    setMapZoom(10);
  };

  const handleBackToList = () => {
    setSelectedLocation(null);
    setMapCenter([50.0, 30.0]);
    setMapZoom(4);
  };

  return (
    <div className="Layout-class">
      <main className="main-container">
        <Sidebar 
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
          onBack={handleBackToList}
        />
        <MapView 
          center={mapCenter} 
          zoom={mapZoom} 
          onMarkerClick={handleSelectLocation}
        />
      </main>
    </div>
  );
}

export default LocationsLayout;