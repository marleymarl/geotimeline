import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from '../App';
import PredictorForm from '../components/UserFacing/PredictorForm';
import DataView from '../components/DataView';
import DemoDataView from '../components/DemoDataView';
import UserMap from '../components/UserFacing/UserMap';


export default class MainRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/dataview" component={DataView} />
        <Route path="/demodataview" component={DemoDataView} />
        <Route path="/usermap" component={UserMap} />
        <Route path="/predictor" component={PredictorForm} />
      </Router>
    );
  }
}
