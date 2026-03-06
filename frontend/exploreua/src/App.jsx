import Home from "./Home/Home"
import LocationsLayout from "./pages/LocatiosLayout"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Navbar"
import Tours from "./GoogleMapsTours/Tours"
import TourViewer from "./GoogleMapsTours/TourViewer"
import Regions from "./GoogleMapsTours/Regions"

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
        

        <Route path="/regions" element={<Regions />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourViewer />} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App