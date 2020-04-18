import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

export default class DirectionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromError: false,
      fromErrorMessage: '',
      toError: false,
      toErrorMessage: '',
      searchLoading: false,
    };
    this.fromCoord = null;
    this.toCoord = null;
    this.fromAddr = '';
    this.toAddr = '';

    this.fromRef = React.createRef();
    this.toRef = React.createRef();
  }

  onSelected(place, key) {
    this[`${key}Coord`] = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  }

  onInput(e, key) {
    this[`${key}Coord`] = null;
    this[`${key}Addr`] = e.target.value;

    const state = {};
    state[`${key}Error`] = false;
    state[`${key}ErrorMessage`] = false;
    this.setState(Object.assign({}, this.state, state));
  }

  async search() {
    if (!this.validate()) return;

    if (this.state.searchLoading) return;

    this.setState(Object.assign({}, this.state, { searchLoading: true }));

    Promise.all(['from', 'to'].map((k) => this.getCoordPromise(k)))
      .then((from, to) => {
        console.log(from, to);
      })
      .catch((err) => {
        if (err.key) {
          const state = {};
          state[`${err.key}Error`] = true;
          state[`${err.key}ErrorMessage`] = err.error;
          this.setState(Object.assign({}, this.state, state));
        } else {
          alert(err);
        }
      })
      .finally(() => {
        this.setState(Object.assign({}, this.state, { searchLoading: false }));
      });
  }

  validate() {
    const state = {};
    let hasErrors = false;
    if (this.isEmpty('from')) {
      state.fromError = true;
      hasErrors = true;
    }
    if (this.isEmpty('to')) {
      state.toError = true;
      hasErrors = true;
    }
    if (hasErrors) {
      this.setState(Object.assign({}, this.state, state));
    }
    return !hasErrors;
  }

  isEmpty(key) {
    return this[`${key}Coord`] === null && this[`${key}Addr`] === '';
  }

  getCoordPromise(key) {
    return new Promise((resolve, reject) => {
      const coordKey = `${key}Coord`;
      if (this[coordKey]) {
        resolve(this[coordKey]);
        return;
      }

      const address = this[`${key}Addr`];
      if (!address) {
        reject({ key, error: 'Address is empty' });
        return;
      }

      if (
        !window.google ||
        !window.google.maps ||
        !window.google.maps.Geocoder
      ) {
        reject({ key, error: 'Geocoder API is not initialized' });
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, function (results, status) {
        if (status === 'OK') {
          const loc = results[0].geometry.location;
          resolve({
            lat: loc.lat(),
            lng: loc.lng(),
          });
        } else if (status === 'ZERO_RESULTS') {
          reject({ key, error: 'Address not found' });
        } else {
          reject({ key, error: 'Geocode was not successful: ' + status });
        }
      });
    });
  }

  swapDirection() {
    [this.fromCoord, this.toCoord] = [this.toCoord, this.fromCoord];
    [this.fromAddr, this.toAddr] = [this.toAddr, this.fromAddr];

    const fromInput = this.fromRef.current.refs.input;
    const toInput = this.toRef.current.refs.input;
    [fromInput.value, toInput.value] = [toInput.value, fromInput.value];

    this.setState(
      Object.assign({}, this.state, {
        fromError: false,
        toError: false,
      }),
    );
  }

  render() {
    return (
      <div className="direction-search">
        <div className="direction-search-form">
          <div className="direction-search-switch">
            <a onClick={() => this.swapDirection()}>
              <SyncOutlined />
            </a>
          </div>
          <div className="direction-search-main">
            <div
              className={this.state.fromError ? 'ant-form-item-has-error' : ''}
            >
              <Autocomplete
                className="ant-input"
                placeholder="from"
                ref={this.fromRef}
                onPlaceSelected={(x) => this.onSelected(x, 'from')}
                onInput={(x) => this.onInput(x, 'from')}
              />
              {this.state.fromError && this.state.fromErrorMessage && (
                <div className="ant-typography ant-typography-danger">
                  {this.state.fromErrorMessage}
                </div>
              )}
            </div>
            <div
              className={this.state.toError ? 'ant-form-item-has-error' : ''}
            >
              <Autocomplete
                className="ant-input"
                placeholder="to"
                ref={this.toRef}
                onPlaceSelected={(x) => this.onSelected(x, 'to')}
                onInput={(x) => this.onInput(x, 'to')}
              />
              {this.state.toError && this.state.toErrorMessage && (
                <div className="ant-typography ant-typography-danger">
                  {this.state.toErrorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          type="primary"
          loading={this.state.searchLoading}
          onClick={() => this.search()}
        >
          Search
        </Button>
      </div>
    );
  }
}
