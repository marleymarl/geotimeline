import React, {Component } from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg'

const map_style = {
  width: '90%',
  height: '100%',
}

export class MapContainer extends Component {
state = {
footPrints: [{lat: 37.774929, lon: -122.419416}]
}

onMarkerClick = ({x, y, lat, lng, event}) => {
console.log('Greg is awesome because: ' + x, y, lat, lng, event)
}

render() {
const currentMarkers = this.state.footPrints.map((footprint) => <Marker
title={footprint.title}
details={footprint.details}
datetime={footprint.datetime}
key={footprint.lat + footprint.lon}
position={{lat: footprint}}
onClick={this.onMarkerClick}
/>)
return(
<Map google={this.props.google} style={map_style}
intialCenter={{
lat: 43.6532, //change this to be set based on location input on form prior to map
lng: 79.3832
}}
>
{currentMarkers}
</Map>
);

}
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(MapContainer)
