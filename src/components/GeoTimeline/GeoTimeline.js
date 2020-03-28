<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, {Component } from 'react'; 
>>>>>>> fd905233ec472d171e7a83e7c6f1f67aac5f2ae0

import MapContainer from '../../MapContainer';
import UpFrontForm from '../../upFrontForm';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg';

export default class GeoTimeline extends Component {
<<<<<<< HEAD
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
=======
	state = {
		patientId: ''
	}

	handlePatientIdSubmit = (patientId) => {
		this.setState({patientId})
	}

	renderMapOrForm = () => {

		if (this.state.patientId === '') {
			return <UpFrontForm handlePatientIdSubmit={this.handlePatientIdSubmit} />
		}
		else {
			return <MapContainer patientId={this.state.patientId} apiKey={apiKey} />
		}

	}



	render() {

		return (
			<div>

			{this.renderMapOrForm()}

			</div>

			)

	}
}

>>>>>>> fd905233ec472d171e7a83e7c6f1f67aac5f2ae0
