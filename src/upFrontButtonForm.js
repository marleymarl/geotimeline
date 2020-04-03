import React, {Component} from "react";
import { Button } from 'antd';
// import DataView from './components/DataView'
import 'antd/dist/antd.css';
import * as uuid from 'uuid';

export default class upFrontButtonForm extends  Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="up-front-form-wrapper">
                <div>
           
                    <Button type="primary" onClick={() => this.startTimeline()}>Start Timeline</Button>
                </div>
            </div>
        );
    }

    startTimeline() {
        const patientId = uuid.v4();
        this.props.handlePatientIdSubmit(patientId);
    }
}