// src/Tours_3d/TourViewer.jsx
import { useParams } from "react-router-dom";

function TourViewer() {
  const { id } = useParams();

  // Тут можна зберігати посилання на Street View або координати
  const tours = {
    1: {
      name: "Софія Київська",
      // Приклад готового Google Street View посилання
      streetViewUrl: "https://goo.gl/maps/xxxxxx1",
    },
    2: {
      name: "Замок Паланок",
      streetViewUrl: "https://goo.gl/maps/xxxxxx2",
    },
  };

  const tour = tours[id];

  if (!tour) {
    return <div>Тур не знайдено</div>;
  }

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{tour.name}</h2>
      <p>
        <a
          href={tour.streetViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "15px 30px",
            backgroundColor: "#4285F4",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Переглянути 3D‑тур на Google Maps
        </a>
      </p>
    </div>
  );
}

export default TourViewer;