import { Link } from "react-router-dom"
import { use, useEffect, useState } from "react" // Додаємо useState для прикладу
import axios from "axios";
import { tokenService } from "../services/token.service";

function Navbar() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [userData, setUserData] = useState(null);
  function getUser() {
    axios.get(`${import.meta.env.VITE_API_URL}/api/Account/me`, {
      headers: {
        Authorization: `Bearer ${tokenService.get()}`
      }
    }).then(res => {
      console.log("User data:", res.data);
      setUserData(res.data);
    }).catch(err => {
      console.log("Error fetching user data", err);
    })
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ExploreUA</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/locations">Цікаві місця</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Маршрути</a>
            </li>
          </ul>

          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Пошук"
            />
            <button className="btn btn-secondary" type="submit">
              Знайти
            </button>
          </form>

          <div className="d-flex align-items-center ms-3">
            {isAuthenticated ? (
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >

                  <div
                    style={{ width: '35px', height: '35px', backgroundColor: '#6b7280', borderRadius: '50%' }}
                    className="d-flex justify-content-center align-items-center me-2"
                  >
                    {userData && userData.userName ? userData.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <strong>Профіль</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow">
                  <li><Link className="dropdown-item" to="/profile">Налаштування</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={() => setIsAuthenticated(false)}>Вийти</button></li>
                </ul>
              </div>
            ) : (

              <Link to="/login" className="btn btn-outline-light">
                Увійти
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;