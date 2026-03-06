import React, { useState, useEffect } from 'react';
import './Home.css';
 
const Home = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
 
  // Дані про міста України
  const citiesData = [
    {
      id: 1,
      name: 'Київ',
      region: 'центральний',
      description: 'Столиця України, одне з найстаріших міст Європи з багатою історією та культурою.',
      image: 'https://first-school.org.ua/wp-content/uploads/2025/07/maxresdefault-1.jpg',
      highlights: ['Києво-Печерська лавра', 'Софійський собор', 'Андріївський узвіз'],
      population: '2.8 млн'
    },
    {
      id: 2,
      name: 'Львів',
      region: 'західний',
      description: 'Місто левів, кави та шоколаду. Архітектурна перлина України з неповторною атмосферою.',
      image: 'https://prolviv.com/wp-content/uploads/2020/12/%D0%BB%D1%8C%D0%B2%D1%96%D0%B2-%D0%BB%D0%B5%D0%B2-1.jpg%27',
      highlights: ['Площа Ринок', 'Оперний театр', 'Високий замок'],
      population: '721 тис.'
    },
    {
      id: 3,
      name: 'Одеса',
      region: 'південний',
      description: 'Перлина біля моря, місто гумору та південного колориту.',
      image: 'https://uamedtourskz.com/storage/images/0b72f48967d33b504c7b742bba050f4d.jpg',
      highlights: ['Дерибасівська', 'Потьомкінські сходи', 'Оперний театр'],
      population: '1.0 млн'
    },
    {
      id: 4,
      name: 'Харків',
      region: 'східний',
      description: 'Перша столиця України, найбільше місто на сході з унікальною архітектурою.',
      image: 'https://inside-ua.com/files/originals/derzhprom-1.webp',
      highlights: ['Площа Свободи', 'Держпром', 'Саржин яр'],
      population: '1.4 млн'
    },
    {
      id: 5,
      name: 'Рівне',
      region: 'західний',
      description: ' Місто відоме своїм парком на вулиці Замковій — однією з найстаріших частин міста.',
      image: 'https://pustunchik.ua/uploads/school/cache/f248e67fdee5a05638a7fdef04abb30c.jpg',
      highlights: ['Музей бурштину', 'Kostel Sv. Antoniya', 'Холм Слави'],
      population: '98 тис.'
    },
    {
      id: 6,
      name: 'Чернівці',
      region: 'західний',
      description: 'Маленький Відень, місто з унікальною австрійською архітектурою.',
      image: 'https://tourbaza.com/wp-content/uploads/2016/02/%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D1%86%D1%96_1.jpg%27',
      highlights: ['Університет', 'Театральна площа', 'Вірменська церква'],
      population: '266 тис.'
    },
    {
      id: 7,
      name: 'Дніпро',
      region: 'східний',
      description: 'Козацька столиця, сучасне індустріальне місто на берегах Дніпра.',
      image: 'https://lh3.googleusercontent.com/proxy/4U3cvICLJQAhyXwG39r3ey1ocnYCNXnWIxKjQrS2ZliJCDPgBNsy3uWr3VOyDYkIbiM3qWdTA69AnqfRdwtGyHo1uWDip1Xm7z-4HrzfOz91B2rQWA%27',
      highlights: ['Монастирський острів', 'Набережна', 'Преображенський собор'],
      population: '968 тис.'
    },
    {
      id: 8,
      name: 'Полтава',
      region: 'центральний',
      description: 'Місто з багатою козацькою історією та мальовничою архітектурою.',
      image: 'https://i1.poltava.to/uploads/2020/09/2020-09-20/poltava-korpusnyi-sad.jpg',
      highlights: ['Кругла площа', 'Біла альтанка', 'Іванова гора'],
      population: '279 тис.'
    },
        {
      id: 9,
      name: 'Кам\'янець-Подільський',
      region: 'західний',
      description: 'Старе місто та фортеця входять до складу Національного історико-архітектурного заповідника «Кам\'янець».',
      image: 'https://tamtour.com.ua/image/410/003/e1141d8077f72563dfbb304ca0c76b59-01-kamenets-podolskiy-depositphotos-41792869-original.jpg%27',
      highlights: ['Старий замок', 'Кафедральний костел св. Петра і Павла', 'Замковий міст'],
      population: '279 тис.'
    }
  ];
 
  useEffect(() => {
    // Симуляція завантаження даних
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setTimeout(() => {
      setCities(citiesData);
      setFilteredCities(citiesData);
      setLoading(false);
    }, 1500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  useEffect(() => {
    // Фільтрація міст за регіоном
    if (activeFilter === 'all') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredCities(cities);
    } else {
      const filtered = cities.filter(city => city.region === activeFilter);
      setFilteredCities(filtered);
    }
  }, [activeFilter, cities]);
 
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
 
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };
 
  const handleCloseModal = () => {
    setSelectedCity(null);
  };
 
  return (
    <div className="home-container">
      {/* Hero секція з фоновим зображенням */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title animate-slide-down">
            Цікаві міста України
          </h1>
          <button className="hero-button animate-pulse" onClick={() => document.getElementById('cities-section').scrollIntoView({ behavior: 'smooth' })}>
            Почати подорож
          </button>
        </div>
      </section>
 
      {/* Секція фільтрів */}
      <section className="filters-section">
        <div className="filters-container">
          <button
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Усі міста
          </button>
          <button
            className={`filter-button ${activeFilter === 'центральний' ? 'active' : ''}`}
            onClick={() => handleFilterChange('центральний')}
          >
            Центральні
          </button>
          <button
            className={`filter-button ${activeFilter === 'західний' ? 'active' : ''}`}
            onClick={() => handleFilterChange('західний')}
          >
            Західні
          </button>
          <button
            className={`filter-button ${activeFilter === 'східний' ? 'active' : ''}`}
            onClick={() => handleFilterChange('східний')}
          >
            Східні
          </button>
          <button
            className={`filter-button ${activeFilter === 'південний' ? 'active' : ''}`}
            onClick={() => handleFilterChange('південний')}
          >
            Південні
          </button>
        </div>
      </section>
 
      {/* Секція з містами */}
      <section id="cities-section" className="cities-section">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Завантаження міст...</p>
          </div>
        ) : (
          <>
            <h2 className="section-title">
              {activeFilter === 'all' ? 'Усі міста України' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} регіон`}
            </h2>
            <div className="cities-grid">
              {filteredCities.map((city, index) => (
                <div
                  key={city.id}
                  className="city-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleCityClick(city)}
                >
                  <div className="city-image-container">
                    <img src={city.image} alt={city.name} className="city-image" />
                    <div className="city-overlay">
                      <span className="city-population">Населення: {city.population}</span>
                    </div>
                  </div>
                  <div className="city-info">
                    <h3 className="city-name">{city.name}</h3>
                    <p className="city-description">{city.description}</p>
                    <div className="city-highlights">
                      {city.highlights.slice(0, 2).map((highlight, i) => (
                        <span key={i} className="highlight-tag">{highlight}</span>
                      ))}
                      {city.highlights.length > 2 && (
                        <span className="highlight-tag">+{city.highlights.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
 
      {/* Модальне вікно з деталями міста */}
      {selectedCity && (
        <div className="modal-overlay animate-fade-in" onClick={handleCloseModal}>
          <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <img src={selectedCity.image} alt={selectedCity.name} className="modal-image" />
            <div className="modal-info">
              <h2 className="modal-title">{selectedCity.name}</h2>
              <p className="modal-region">Регіон: {selectedCity.region}</p>
              <p className="modal-population">Населення: {selectedCity.population}</p>
              <p className="modal-description">{selectedCity.description}</p>
              <div className="modal-highlights">
                <h3>Визначні місця:</h3>
                <ul>
                  {selectedCity.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
       
      )}
    </div>
  );
};
 
 
export default Home;