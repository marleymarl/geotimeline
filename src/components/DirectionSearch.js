import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {Button} from "antd";


export default class DirectionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fromCoord = null;
    this.toCoord = null;
    this.fromAddr = '';
    this.toAddr = ''
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
  }

  async search() {
    Promise.all(['from', 'to'].map(k => this.getCoordPromise(k)))
      .then((from, to) => {
        console.log(from, to);
      })
      .catch(err => {
        alert(err);
      })
    //console.log(this.fromCoord, this.toCoord);
    //const geocoder = new window.google.maps.Geocoder();
    //console.log(geocoder);
  }

  getCoordPromise(key) {
    return new Promise((resolve, reject) => {
      const coordKey = `${key}Coord`;
      if(this[coordKey]) {
        resolve(this[coordKey]);
        return;
      }

      const address = this[`${key}Addr`];
      if(!address) {
        reject('Address is empty');
        return;
      }

      if(!window.google || !window.google.maps || !window.google.maps.Geocoder) {
        reject('Geocoder API is not initialized');
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
          const loc = results[0].geometry.location;
          resolve({
            lat: loc.lat(),
            lng: loc.lng(),
          });
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }

  render() {
    return (
      <div>
        <Autocomplete className="ant-input" placeholder="from"
                      onPlaceSelected={x => this.onSelected(x, 'from')}
                      onInput={x => this.onInput(x, 'from')}></Autocomplete>
        <Autocomplete className="ant-input" placeholder="to"
                      onPlaceSelected={x => this.onSelected(x, 'to')}
                      onInput={x => this.onInput(x, 'to')}></Autocomplete>
        <Button type="primary" onClick={() => this.search()}>Search</Button>
      </div>
    )
  }
}