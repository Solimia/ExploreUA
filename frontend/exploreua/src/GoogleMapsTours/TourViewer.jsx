import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TourViewer() {
  const { id } = useParams(); // Отримуємо ID з URL (/tours/7)
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      try {
        // Використовуємо ваш API для отримання даних по конкретному ID
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Geometer/${id}`);
        if (!response.ok) throw new Error("Локацію не знайдено");
        
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Помилка завантаження:', error);
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
        <p className="mt-2">Завантаження 3D туру...</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="container mt-5 text-center">
        <h2>Локацію не знайдено</h2>
        <button className="btn btn-primary" onClick={() => navigate("/tours")}>
          Повернутися до списку
        </button>
      </div>
    );
  }

  // Створюємо URL для Google Street View панорами
  // Параметр output=svembed активує режим панорами (якщо вона доступна для цих координат)
  const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyAqvAZrHuRoWaGcHVUTwPdy9QZVsJ0aBjw&location=${location.latitude},${location.longitude}&heading=210&pitch=10&fov=80`;

  // БЕЗКОШТОВНИЙ ВАРІАНТ (якщо немає API ключа):
  const fallbackUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&hl=uk&z=15&output=embed`;

  // Посилання для кнопки "Відкрити у додатку"
  const directMapsLink = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.latitude},${location.longitude}`;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-0">{location.name}</h2>
          <small className="text-muted">{location.region}</small>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body p-0" style={{ height: "600px", background: "#eee" }}>
          <iframe
            title={location.name}
            src={streetViewUrl} // Змініть на streetViewUrl, якщо маєте ключ
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

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
        <div className="col-md-4 text-end">
          <a 
            href={directMapsLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary w-100"
          >
            Відкрити повний Google Street View
          </a>
          <p className="mt-2 small text-muted">
            Координати: {location.latitude}, {location.longitude}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TourViewer;