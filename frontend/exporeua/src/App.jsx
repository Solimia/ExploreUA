import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import PlacePopup from './Popup/PlacePopup'


const places = [
  {
    id: 1,
    name: "Софійський собор",
    description: "Один із найдавніших храмів Києва, пам’ятка ЮНЕСКО.",
    position: [50.4526, 30.5144]
  },
  {
    id: 2,
    name: "Хотинська фортеця",
    description: "Середньовічна фортеця в Чернівецькій області.",
    position: [48.6578, 26.5597]
  },
  {
    id:3,
    name:"тараканівський форт",
    position:[50.363125, 25.716130]
  }
]

function App() {
  return (
    <MapContainer
      center={[49.0, 31.0]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='© OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map(place => (
        <Marker key={place.id} position={place.position}>
          <PlacePopup place={place} />
        </Marker>
      ))}

    </MapContainer>
  )
}

export default App
