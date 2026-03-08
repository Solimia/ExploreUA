import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TourViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/Geometer/Get_Geometer_By_Id?Id=${id}`
        );
        if (!response.ok) throw new Error("Локацію не знайдено");
        const data = await response.json();
        setLocation(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchLocation();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Завантаження...</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="container mt-5 text-center">
        <h2>Локацію не знайдено</h2>
        <button className="btn btn-primary" onClick={() => navigate("/regions")}>
          Повернутися до списку
        </button>
      </div>
    );
  }

  const lat = location.lat ?? location.latitude;
  const lng = location.lng ?? location.longitude;

  // OpenStreetMap — безкоштовна карта без ключа
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;

  // Google Street View — відкривається у новій вкладці, безкоштовно
  const streetViewLink = `https://www.google.com/maps/@${lat},${lng},3a,75y,210h,90t/data=!3m1!1e1`;

  // Google Maps навігація
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // OpenStreetMap повна сторінка
  const osmFullLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=16`;

  return (
    <div className="container mt-4">
      {/* Заголовок */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-0">{location.name}</h2>
          <small className="text-muted">{location.region}</small>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      {/* Банер з кнопкою Street View */}
      <div
        className="rounded-3 mb-4 p-4 d-flex align-items-center justify-content-between"
        style={{
          background: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)",
          color: "white",
          minHeight: "120px",
        }}
      >
        <div>
          <h4 className="mb-1">🌐 Google Street View</h4>
          <p className="mb-0 opacity-75">
            Прогуляйся вулицями та оглянь місце у 360°
          </p>
        </div>
        <a
          href={streetViewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light btn-lg ms-3 text-nowrap"
          style={{ fontWeight: 600, color: "#1a73e8" }}
        >
          Відкрити Street View →
        </a>
      </div>

      {/* Карта OSM */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>🗺 Розташування на карті</span>
          <a href={osmFullLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">
            Відкрити у повному розмірі
          </a>
        </div>
        <div className="card-body p-0" style={{ height: "450px" }}>
          <iframe
            title={location.name}
            src={osmUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Інформація */}
      <div className="row">
        <div className="col-md-8">
          <h4>Про локацію</h4>
          <p>{location.description || "Опис відсутній."}</p>
          {location.detailedDescription && (
            <div className="alert alert-light border">
              <small>{location.detailedDescription}</small>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="d-grid gap-2">
            {/* <a
              href={streetViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              🌐 Street View
            </a> */}
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-success"
            >
              🧭 Прокласти маршрут
            </a>
          </div>
          <p className="mt-3 small text-muted">📍 {lat}, {lng}</p>
        </div>
      </div>
    </div>
  );
}

export default TourViewer;