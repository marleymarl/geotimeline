import React, { Component } from 'react';
import MapContainer from '../../MapContainer';
import UpFrontForm from '../../upFrontButtonForm';
import * as global from '../../global';

export default class GeoTimeline extends Component {
  state = {
    patientId: '',
    demoOrReal: '',
    initialCenter: { lat: 43.6532, lng: -79.3832 },
    initialLat: 43.6532,
    initialLon: -79.3832,
  };

  handlePatientIdSubmit = (patientId, demoOrReal) => {
    this.setState({ patientId, demoOrReal });
  };

  renderMapOrForm = () => {
    if (this.state.patientId === '') {
      return (
        <UpFrontForm
          handlePatientIdSubmit={this.handlePatientIdSubmit}
          title={'Welcome to the GeoTimeline Application'}
          description={
            `Click 'Start Demo Timeline' to try out the application. Click 'Start Real Timeline' to record your footprint history if you have been confirmed to have Covid19 Coronavirus.`
          }
        />
      );
    } else {
      return (
        <MapContainer
          patientId={this.state.patientId}
          apiKey={global.API_KEY}
          initialLat={this.state.initialLat}
          initialLon={this.state.initialLon}
          demoOrReal={this.state.demoOrReal}
        />
      );
    }
  };

  handleBrowserGeo = () => {
    if (!navigator.geolocation) {
      console.log('no browser geo');
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
