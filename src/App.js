import React from 'react';
import './App.css';
import MapContainer from './MapContainer';
// import UpFrontForm from './upFrontForm';

function App() {
  return (
    <div className="App">
      {/* <UpFrontForm patientId={'1234567'} /> */}
      <MapContainer patientId={'1234567'} />
    </div>
  );
}

export default App;
