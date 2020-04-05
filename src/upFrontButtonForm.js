import React, { Component } from 'react';
import { Button } from 'antd';
// import DataView from './components/DataView'
import 'antd/dist/antd.css';
import * as uuid from 'uuid';

export default class upFrontButtonForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="up-front-form-wrapper">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <div>
        
          <Button type="primary" onClick={() => this.startTimeline()}>
            Start Demo Timeline
          </Button>
          <Button onClick={() => this.startRealTimeline()}>
            Start Real Timeline
          </Button>
        
        </div>
      </div>
    );
  }

  startTimeline() {
    const patientId = uuid.v4();
    const demoOrReal = 'demo';
    this.props.handlePatientIdSubmit(patientId, demoOrReal);
  }
  startRealTimeline() {
    const patientId = uuid.v4();
    const demoOrReal = 'real';
    this.props.handlePatientIdSubmit(patientId, demoOrReal);
  }
}
