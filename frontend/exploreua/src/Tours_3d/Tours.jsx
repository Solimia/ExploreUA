// src/Tours_3d/Tours.jsx
import { useNavigate } from "react-router-dom";

function Tours() {
  const navigate = useNavigate();

  const tours = [
    { id: 1, title: "Софія Київська", image: "/sofia-kyivska-sobor.jpg" },
    { id: 2, title: "Замок Паланок", image: "/castle.jpg" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2>3D Тури</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {tours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => navigate(`/3d-tours/${tour.id}`)}
            style={{
              width: "250px",
              cursor: "pointer",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={tour.image}
              alt={tour.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h4>{tour.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;