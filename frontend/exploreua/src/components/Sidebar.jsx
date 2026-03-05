import React, { useEffect, useState } from 'react';
// import locations from '../data/locations';
import LocationDetail from './LocationDetail';
import './Sidebar.css';

const Sidebar = ({ selectedLocation, onSelectLocation, onBack }) => {
  const [filterText, setFilterText] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://localhost:7151/api/Geometer');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Помилка при завантаженні локацій:', error);
      }
    };
    fetchLocations();
  }, []);


  const uniqueRegions = [...new Set(locations.map(loc => loc.region))].sort();

  const filteredLocations = locations.filter(loc => {
    const matchesText = filterText === '' ||
      loc.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (loc.description && loc.description.toLowerCase().includes(filterText.toLowerCase()));

    const matchesRegion = filterRegion === '' || loc.region === filterRegion;

    return matchesText && matchesRegion;
  });

  return (
    <div className="sidebar">
      {selectedLocation ? (
        <LocationDetail
          selectedLocation={selectedLocation}
          allLocations={locations}
          onSelectLocation={onSelectLocation}
          onBack={onBack}
        />
      ) : (
        <>
          <div className="filters">
            {/* Випадаючий список для областей */}
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="filter-select"
            >
              <option value="">Всі області</option>
              {uniqueRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            {/* Поле текстового пошуку */}
            <input
              type="text"
              placeholder="Пошук за назвою або описом..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="filter-input"
            />
          </div>

          {filteredLocations.length === 0 ? (
            <p className="no-results">Нічого не знайдено</p>
          ) : (
            <div className="locations-grid">
              {filteredLocations.map((loc, index) => (
                <div
                  key={index}
                  className="location-card"
                  onClick={() => onSelectLocation(loc)}
                >
                  <div className="card-image">
                    <img src={loc.images[0].imgUrl} alt={loc.name} />
                  </div>
                  <div className="card-content">
                    <h3>{loc.name}</h3>
                    <p>{loc.description}</p>
                    <span className="region-badge">{loc.region}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;