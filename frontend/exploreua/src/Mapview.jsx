import { MapContainer, TileLayer } from "react-leaflet"

function MapView() {
  return (
    <div style={{ width: "70%" }}>
      <MapContainer
        center={[49.0, 31.0]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='© OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default MapView