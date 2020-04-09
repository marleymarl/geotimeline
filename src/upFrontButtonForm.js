import React, {useState} from 'react';
import { Button } from 'antd';
import { Steps } from 'intro.js-react';
// import DataView from './components/DataView'
import 'antd/dist/antd.css';
import * as uuid from 'uuid';
import 'intro.js/introjs.css';
import {updateRealOrDemo} from './utils/demoOrReal'

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
 const UpFrontButtonForm = props => {
   const {title, description, handlePatientIdSubmit} = props;
   const [stepsEnabled, updateStepsEnabled] = useState(true);
   const initialStep = 0;

   const startTimeline =() => {
    const patientId = uuid.v4();
    const demoOrReal = 'demo';
    updateRealOrDemo(demoOrReal)
    handlePatientIdSubmit(patientId, demoOrReal);
  }
  const startRealTimeline =() => {
    const patientId = uuid.v4();
    const demoOrReal = 'real';
    updateRealOrDemo(demoOrReal);
    handlePatientIdSubmit(patientId, demoOrReal);
  }

   const onExit = () => {
    updateStepsEnabled(false)
  }

   return (
    <div className="up-front-form-wrapper">
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
      
        <Button type="primary" onClick={startTimeline} className='start-demo'>
          Start Demo Timeline
        </Button>
        <Button onClick={startRealTimeline} className='start-real'>
          Start Real Timeline
        </Button>
      
      </div>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
      />
    </div>
  );
 }

 export default UpFrontButtonForm