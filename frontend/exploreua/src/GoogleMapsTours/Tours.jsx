import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Tours() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Отримуємо назву регіону з URL (?region=Київська область)
  const regionFromUrl = searchParams.get("region");

  const [regionLocations, setRegionLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Geometer`);
        const allData = await response.json();

        if (regionFromUrl) {
          // Фільтруємо отримані з сервера дані по регіону з URL
          const filtered = allData.filter(
            (loc) => loc.region && loc.region.trim().toLowerCase() === regionFromUrl.trim().toLowerCase()
          );
          setRegionLocations(filtered);
        } else {
          // Якщо параметр region в URL відсутній, показуємо всі доступні локації
          setRegionLocations(allData);
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [regionFromUrl]); // Спрацює щоразу при зміні регіону в URL

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{regionFromUrl ? `Локації: ${regionFromUrl}` : "Всі доступні 3D Тури"}</h2>
        {regionFromUrl && (
          <button className="btn btn-outline-secondary" onClick={() => navigate("/tours")}>
            Показати всі області
          </button>
        )}
      </div>

      <div className="row">
        {regionLocations.length === 0 ? (
          <div className="col-12 alert alert-info text-center">
            У цьому регіоні поки що немає доданих локацій.
          </div>
        ) : (
          regionLocations.map((loc) => (
            <div className="col-md-4 mb-4" key={loc.id}>
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/tours/${loc.id}`)}
              >
                <img
                  src={loc.images?.[0]?.url || loc.images?.[0] || "/default.jpg"}
                  className="card-img-top"
                  alt={loc.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{loc.name}</h5>
                  <p className="card-text text-muted small">{loc.region}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tours;