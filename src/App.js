import React from 'react';
import './App.css';
import MapContainer from './MapContainer';
import MapContainer from './MapContainer'
import GeoTime from './components/GeoTimeline/GeoTimeline'
// import UpFrontForm from './upFrontForm';

function App() {
  return (
    <div className="App">
      {/* <UpFrontForm patientId={'1234567'} /> */}
      <MapContainer patientId={'1234567'} />
      <GeoTime />
    </div>
  );
}

export default App;
