import Home from "./Home/Home"
import LocationsLayout from "./pages/LocatiosLayout"
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from "./Navbar"
import Tours from "./GoogleMapsTours/Tours"
import TourViewer from "./GoogleMapsTours/TourViewer"
import Regions from "./GoogleMapsTours/Regions"

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
          <Route element={<LayoutWithNavbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/locations' element={<LocationsLayout />} />  
            <Route path="/regions" element={<Regions />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourViewer />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App