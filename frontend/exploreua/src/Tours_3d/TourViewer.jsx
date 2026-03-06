// src/Tours_3d/TourViewer.jsx

import { useParams } from "react-router-dom";

function TourViewer() {
  const { id } = useParams();
 const [location, setLocation] = useState(null);
useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Geometer/Get_Geometer_By_Id?Id=${selectedLocation.id}`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Помилка при завантаженні локацій:', error);
      }
    };
    fetchLocation();
  }, [selectedLocation?.id]);

  const tours = {
    1: {
      name: "Софія Київська",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1772805768629!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHlqOURmUHc.!2m2!1d50.45000001970302!2d30.48330001675958!3f73.052536!4f0!5f0.7820865974627469"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },

    2: {
      name: "Замок Паланок",
      iframe: (
        <iframe src="https://www.google.com/maps/embed?pb=!4v1772806021953!6m8!1m7!1sv9Nv0FMubGAUPZPD3_pbwg!2m2!1d48.43148813845161!2d22.68752756196213!3f182.41653646130106!4f-1.5323279410906991!5f0.7820865974627469" 
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
  };

  const tour = tours[id];

  if (!tour) {
    return <h2>Тур не знайдено</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>{tour.name}</h2>
      {tour.iframe}
    </div>
  );
}

export default TourViewer;