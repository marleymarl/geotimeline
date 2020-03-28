import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import GeoTime from './components/GeoTimeline/GeoTimeline';

// import UpFrontForm from './upFrontForm';

function App() {
  return (
    <div className="App">
      <GeoTime />
    </div>
  );
}

export default App;
