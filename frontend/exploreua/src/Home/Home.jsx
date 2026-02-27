import React from "react";
import "./Home.css";

const directions = [
  {
    title: "Київ",
    image: "https://media.istockphoto.com/id/1363984765/photo/independence-monument-in-kyiv-view-from-drone.jpg?s=612x612&w=0&k=20&c=9gKqN_GEG603voLchxrkV7gE9rmX39w2TTKjAd1Pvuc="
  },
  {
    title: "Львів",
    image: "https://c8.alamy.com/comp/DXAB5N/lviv-city-night-landscape-ukraine-DXAB5N.jpg"
  },
  {
    title: "Одеса",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/%D0%91%D1%83%D0%B4%D0%B8%D0%BD%D0%BE%D0%BA_%D1%82%D0%B5%D0%B0%D1%82%D1%80%D1%83_%D0%BE%D0%BF%D0%B5%D1%80%D0%B8_%D1%82%D0%B0_%D0%B1%D0%B0%D0%BB%D0%B5%D1%82%D1%83%2C_%D0%9E%D0%B4%D0%B5%D1%81%D0%B0_DJI_0023.jpg"
  },
  {
    title: "Карпати",
    image: "https://franyk.city/sites/default/files/images/news/2018/06/240696.jpg"
  }
];

const Home = () => {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>
            Подорожуй. Досліджуй.
            <br />
            Насолоджуйся.
          </h1>

          <p>
            discover.ua створений для всіх охочих подорожувати Україною
            та проводити вихідні дні в нових місцях
          </p>

          <div className="search-container">
            <input type="text" placeholder="Область або місто" />
            <button>Знайти</button>
          </div>
        </div>
      </section>

      {/* POPULAR DIRECTIONS */}
      <section className="directions">
        <h2>Популярні напрямки України</h2>
        <p className="subtitle">
          Ми зібрали цікаві фото, фотосфери та віртуальні тури по визначним місцям України,
          щоб надихнути тебе на незабутню подорож.
        </p>

        <div className="direction-cards">
          {directions.map((item, index) => (
            <div key={index} className="direction-card">
              <img src={item.image} alt={item.title} />
              <div className="card-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
          <footer className="footer">
        <p>© 2026 Discover Ukraine | Створено на React</p>
      </footer>
    </div>

    
  );
};

export default Home;