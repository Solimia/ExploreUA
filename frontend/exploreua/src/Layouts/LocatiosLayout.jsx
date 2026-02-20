
import Sidebar from "../Sidebar";
import MapView from "../Mapview";
import './LocationsLayout.css';

function LocationsLayout() {
  return (
    <div className="Layout-class">
      {/* <header style={{ flex: '0 0 auto' }}>
      </header> */}

      {/* main займає весь залишковий простір */}
      <main style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar style={{ overflowY: 'auto' }} /> {/* окремо скрол для Sidebar, якщо треба */}
        <MapView style={{ flex: 1 }} />            {/* карта займає весь простір */}
      </main>

      <footer style={{ flex: '0 0 auto' }}></footer>
    </div>
  );
}

export default LocationsLayout;