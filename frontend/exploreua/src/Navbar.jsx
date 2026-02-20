import { Link } from "react-router-dom"

function Navbar() {
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar