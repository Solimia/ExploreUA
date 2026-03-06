import Home from "./Home/Home"
import LocationsLayout from "./Layouts/LocatiosLayout"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Navbar"
import Tours from "./Tours_3d/Tours"
import TourViewer from "./Tours_3d/TourViewer"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        {/* Головна сторінка без Sidebar/Map */}
        <Route path='/' element={<Home />} />

        {/* Сторінка локацій зі своїм Layout */}
        <Route path='/locations' element={<LocationsLayout />} />
        

        <Route path="/3d-tours" element={<Tours />} />
        <Route path="/3d-tours/:id" element={<TourViewer />} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App