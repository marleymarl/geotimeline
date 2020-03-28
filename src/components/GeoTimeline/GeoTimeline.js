import React, { Component } from 'react';

import MapContainer from '../../MapContainer';
import UpFrontForm from '../../upFrontForm';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg';

export default class GeoTimeline extends Component {
  state = {
    patientId: ''
  };

  handlePatientIdSubmit = patientId => {
    this.setState({ patientId });
  };

  renderMapOrForm = () => {
    if (this.state.patientId === '') {
      return (
        <UpFrontForm
          handlePatientIdSubmit={this.handlePatientIdSubmit}
          formHeader="Header"
          description="text here"
        />
      );
    } else {
      return <MapContainer patientId={this.state.patientId} apiKey={apiKey} />;
    }
  };

  render() {
    return <div>{this.renderMapOrForm()}</div>;
  }
}
