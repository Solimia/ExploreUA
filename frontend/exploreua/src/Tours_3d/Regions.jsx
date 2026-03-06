import { useState } from "react";
import { Link } from "react-router-dom";

function Regions() {

    const [filterText, setFilterText] = useState('');

const regions = [
  { id: 1, name: "Вінницька область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNgIo_bWJh2yI0tqhxYxcfxIg9vunVlxjplw&s" },
  { id: 2, name: "Волинська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtK_59gEvKPtqr0bkYFNXuCjY3ZtoYc5ww0Q&s" },
  { id: 3, name: "Дніпропетровська область", image: "https://f.discover.ua/city/28/x3zCk.jpg" },
  { id: 4, name: "Донецька область", image: "https://f.discover.ua/city/186/400x280-5eL3x.jpg" },
  { id: 5, name: "Житомирська область", image: "https://f.discover.ua/city/32/400x280-wYmtN.jpg" },
  { id: 6, name: "Закарпатська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2tJrg-v4uvcjxWCggpyqugXEB4s5jPPqLg&s" },
  { id: 7, name: "Запорізька область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjMNxdJIZ4lHzQERfIBeH4ARogI-2AaOh_g&s" },
  { id: 8, name: "Івано-Франківська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVISqYkDSmukV4RZL-BAiAwd_U6q6jXdIvzw&s" },
  { id: 9, name: "Київська область", image: "https://first-school.org.ua/wp-content/uploads/2025/07/maxresdefault-1.jpg" },
  { id: 10, name: "Кіровоградська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEgCEg92shTSdILBHyFifXWV3FOYozD3GS5g&s" },
  { id: 11, name: "Луганська область", image: "https://lh3.googleusercontent.com/-Izi1CK-Od_IL-ILgn6i_WlUykKBdhCH4yEa3Khgn63x88f9FCwR50fCvRudS7O4owIwYoPFKqGDWgVBxztrRNhde-9-kRmUAuYmSJpLzJ-zkXQvSujioaV35ym6XncceeAe1Yqq" },
  { id: 12, name: "Львівська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZbRWPMMOnNvDaFGAesouzbscmDOFSEcegw&s" },
  { id: 13, name: "Миколаївська область", image: "https://f.discover.ua/city/217/400x280-2ojlk.jpg" },
  { id: 14, name: "Одеська область", image: "https://f.discover.ua/city/80/400x280-pO6Vz.jpg" },
  { id: 15, name: "Полтавська область", image: "https://f.discover.ua/city/135/400x280-aMGu2.jpg" },
  { id: 16, name: "Рівненська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTHHiOfkH_QWYUq5wj2ziWrfuHVuNqO9Kng&s" },
  { id: 17, name: "Сумська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMLuzwFXC38eUu_DVTsbVROLYkP-W6UMHUQ&s" },
  { id: 18, name: "Тернопільська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDdPOk2qW9tyIHUiLaw6n2oBdGo4sUKl8Og&s" },
  { id: 19, name: "Харківська область", image: "https://f.discover.ua/city/30/HBVfD.jpg" },
  { id: 20, name: "Херсонська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRyBdFuq_fxtlavLnEFyQNA_p3lIWblq3Aw&s" },
  { id: 21, name: "Хмельницька область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrp_ORAcLhvf69ADX62i57ehRtTiTUmAWkw&s" },
  { id: 22, name: "Черкаська область", image: "https://f.discover.ua/city/9/400x280-8wU3l.jpg" },
  { id: 23, name: "Чернівецька область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4k6OpOH2uI3GQj85oiIme0spjaPl_MMt0A&s" },
  { id: 24, name: "Чернігівська область", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVNyltu0-fcnQ5wB8D68euCRn9VInXKegicQ&s" },
];


const filteredRegions = regions.filter(region => {
  return filterText === "" ||
    region.name.toLowerCase().includes(filterText.toLowerCase());
});


  return (
    <div className="container mt-4">

      <input
        type="text"
        placeholder="Пошук області..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="form-control mb-4"
      />

      <div className="row">

        {filteredRegions.map(region => (
          <div className="col-md-4 mb-4" key={region.id}>

            <Link to={`/regions/${region.id}`} style={{ textDecoration: "none" }}>
              <div className="card">

                <img
                  src={region.image}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{region.name}</h5>
                </div>

              </div>
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Regions;