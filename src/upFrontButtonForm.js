import React, { Component } from 'react';
import { Button } from 'antd';
import { Steps } from 'intro.js-react';
// import DataView from './components/DataView'
import 'antd/dist/antd.css';
import * as uuid from 'uuid';
import 'intro.js/introjs.css';

const steps = [

{
    element: '.start-demo',
    intro: 'click here to start a demo timeline and provide feedback',
    position: 'right',
    
  },
  {
    element: '.start-real',
    intro: 'click here to record an actual confirmed case timeline',
  },

]

export default class upFrontButtonForm extends Component {
  constructor() {
    super();
    this.state = {
        stepsEnabled: true,
        initialStep: 0,
        steps: [

            {        
            element: '.start-demo',
            intro: 'click here to start a demo timeline and provide feedback',
            position: 'right',
    
            },
            {
            element: '.start-real',
            intro: 'click here to record an actual confirmed case timeline',
             },

       ]
      }
    }

  onExit = () => {
      this.setState(() => ({stepsEnabled: false}));
  }



  render() {
      const { stepsEnabled, steps, initialStep } = this.state;
    return (
      <div className="up-front-form-wrapper">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <div>
        
          <Button type="primary" onClick={() => this.startTimeline()} className='start-demo'>
            Start Demo Timeline
          </Button>
          <Button onClick={() => this.startRealTimeline()} className='start-real'>
            Start Real Timeline
          </Button>
        
        </div>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={this.onExit}
        />
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
  startDemoCheckFootprints() {
    const patientId = 'not applicable';
    const demoOrReal = 'demo';
    const inputOrCheck = 'check';
    this.props.handleCheckFootprintSubmit(patientId, demoOrReal, inputOrCheck);

  }
  startRealCheckFootprints() {
    const patientId = 'not applicable';
    const demoOrReal = 'real';
    const inputOrCheck = 'check';
    this.props.handleCheckFootprintSubmit(patientId, demoOrReal, inputOrCheck);

  }
}
