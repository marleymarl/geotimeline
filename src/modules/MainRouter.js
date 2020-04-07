import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from '../App';
import DataView from '../components/DataView';
import MapCheck from '../components/MapCheck/MapCheck';

export default class MainRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/dataview" component={DataView} />
        <Route path="/checkfootprints" component={MapCheck} />
      </Router>
    );
  }
}
