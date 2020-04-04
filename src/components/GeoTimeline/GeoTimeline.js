import React, { Component } from "react";

import MapContainer from "../../MapContainer";
// import UpFrontForm from '../../upFrontForm';
import UpFrontForm from "../../upFrontButtonForm";

var apiKey = "AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg";

export default class GeoTimeline extends Component {
  state = {
    patientId: "",
    initialCenter: { lat: 43.6532, lng: -79.3832 },
    initialLat: 43.6532,
    initialLon: -79.3832,
  };

  handlePatientIdSubmit = (patientId) => {
    this.setState({ patientId });
  };

  renderMapOrForm = () => {
    if (this.state.patientId === "") {
      return <UpFrontForm handlePatientIdSubmit={this.handlePatientIdSubmit} />;
    } else {
      return (
        <MapContainer
          patientId={this.state.patientId}
          apiKey={apiKey}
          initialLat={this.state.initialLat}
          initialLon={this.state.initialLon}
        />
      );
    }
  };

  handleBrowserGeo = () => {
    if (!navigator.geolocation) {
      console.log("no browser geo");
    } else {
      navigator.geolocation.getCurrentPosition((success, error) => {
        if (error) {
          this.setState({
            initialCenter: { lat: 43.6532, initialCenterLon: -79.3832 },
          });
        } else {
          console.log(success.coords.latitude);
          this.setState({
            initialLat: success.coords.latitude,
            initialLon: success.coords.longitude,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.handleBrowserGeo();
  }

  render() {
    return this.renderMapOrForm();
  }
}
