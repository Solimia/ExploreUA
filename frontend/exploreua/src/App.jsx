import Home from "./Home/Home"
import LocationsLayout from "./Layouts/LocatiosLayout"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Navbar"

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
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App