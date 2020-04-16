import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from '../App';
import PredictorForm from '../PredictorForm';
import DataView from '../components/DataView';
import DemoDataView from '../components/DemoDataView';
import MapCheck from '../components/MapCheck/MapCheck';


export default class MainRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/dataview" component={DataView} />
        <Route path="/demodataview" component={DemoDataView} />
        <Route path="/checkfootprints" component={MapCheck} />
        <Route path="/predictor" component={PredictorForm} />
      </Router>
    );
  }
}
