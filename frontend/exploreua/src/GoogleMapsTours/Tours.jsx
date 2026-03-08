import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Tours() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const regionFromUrl = searchParams.get("region");

  const [regionLocations, setRegionLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Geometer`);
        const allData = await response.json();

        // Для дебагу — видали після перевірки
        if (allData.length > 0) console.log("Приклад локації:", allData[0]);

        if (regionFromUrl) {
          const filtered = allData.filter(
            (loc) =>
              loc.region &&
              loc.region.trim().toLowerCase() === regionFromUrl.trim().toLowerCase()
          );
          setRegionLocations(filtered);
        } else {
          setRegionLocations(allData);
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [regionFromUrl]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Завантаження локацій...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          {regionFromUrl ? `Локації: ${regionFromUrl}` : "Всі доступні тури"}
        </h2>
        {regionFromUrl && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/regions")}
          >
            ← Всі області
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
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => navigate(`/tours/${loc.id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <img
                  // Підтримка різних можливих назв поля з фото
                  src={
                    loc.imageUrl ||
                    loc.image ||
                    loc.photo ||
                    loc.photoUrl ||
                    loc.images?.[0]?.url ||
                    loc.images?.[0] ||
                    `https://picsum.photos/seed/${loc.id}/300/200`
                  }
                  className="card-img-top"
                  alt={loc.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    // Якщо фото не завантажилось — показуємо заглушку
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/seed/${loc.id}/300/200`;
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{loc.name}</h5>
                  <p className="card-text text-muted small">{loc.region}</p>
                  {loc.description && (
                    <p
                      className="card-text small"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {loc.description}
                    </p>
                  )}
                </div>
                <div className="card-footer bg-transparent border-0 pb-3">
                  <span className="btn btn-sm btn-outline-primary w-100">
                    Переглянути →
                  </span>
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