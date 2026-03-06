import Home from "./Home/Home"
import LocationsLayout from "./pages/LocatiosLayout"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Navbar"
import Tours from "./Tours_3d/Tours"
import TourViewer from "./Tours_3d/TourViewer"
import Regions from "./Tours_3d/Regions"

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
        

        <Route path="/3d-tours" element={<Regions />} />
        <Route path="/3d-tours/:id" element={<TourViewer />} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App