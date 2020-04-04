import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from '../App';
import DataView from '../components/DataView';

export default class MainRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/dataview" component={DataView} />
      </Router>
    );
  }
}
