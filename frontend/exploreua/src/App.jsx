import Home from "./Home/Home"
import LocationsLayout from "./pages/LocatiosLayout"
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from "./Navbar"
import Login from "../Autorize/Login"
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          {/* Головна сторінка без Sidebar/Map */}
          {/* <Route path='/' element={<Home />} /> */}

          <Route element={<LayoutWithNavbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/locations' element={<LocationsLayout />} />
          </Route>

          {/* 3. Окремий роут БЕЗ НАВІГАЦІЇ (Navbar тут не з'явиться) */}
          <Route path='/login' element={<Login />} />

          {/* Сторінка локацій зі своїм Layout */}
          {/* <Route path='/locations' element={<LocationsLayout />} />
          <Route path='/login' element={<Login />} /> */}

        </Routes>


      </BrowserRouter>

    </>
  )
}

export default App