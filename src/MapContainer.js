import React, {Component } from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import { Form, FormItem, Input, InputNumber, Checkbox, DatePicker, TimePicker } from "formik-antd";
// import { Formik, ErrorMessage } from 'formik';
import { DatePicker, TimePicker, Form, Button, Modal, Table } from 'antd';
import 'antd/dist/antd.css';
import * as moment from 'moment';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg'

const map_style = {
  width: '60%',
  height: '100%',
}

function onChange(date, dateString) {
	console.log(date, dateString)
}

export class MapContainer extends Component {
  state = {
    footPrints: [],
    // footPrints: [{lat: 43.65509405622337, lng: -79.38795019216536, date: 'Tue Mar 03 2020', time: '04:04:05 GMT-0400 (Eastern Daylight Time)'}, {lat: 43.64756139911764, lng: -79.41372555024623, date: 'Tue Mar 03 2020', time: '04:04:05 GMT-0400 (Eastern Daylight Time)'}, {lat: 43.64420752674433, lng: -79.39767521150111, date: 'Tue Mar 03 2020', time: '04:04:05 GMT-0400 (Eastern Daylight Time)'} ],
    activeDate: '',
    activeLon: '',
    activeLat: '',
    activeTime: '',
    activeMarker: {
      lat: '',
      lon: '',
      date: '',
      time: ''
    },
    patientId: this.props.patientId,
    showingInfoWindow: false,
    showModal: false,
    selectedPlace: {}
  }


  // When user clicks on the map, a red marker shows up
  onMapClick = (mapProps, map, clickEvent) => {
    console.log('Greg is awesome because: ' + JSON.stringify(clickEvent))
    let markerLatLng = clickEvent.latLng
    const latitude = markerLatLng.lat();
    const longitude = markerLatLng.lng();

    debugger

    // if infowWindow is already open, close info window, else open modal
    if (this.state.showingInfoWindow) {
      debugger
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    } else {
      this.setState({
        showModal: true,
        activeLat: latitude,
        activeLon: longitude
      });
    }

  }


  // When user clicks on a red marker, an infobox pops up displaying the time for that marker
  superMarkerClick = (markerProps, marker, clickEvent) => {
    
    const latitude = markerProps.position.lat;
    const longitude = markerProps.position.lng;

    // grab footPrint in state that matches with lat/lng position
    const footPrint = this.state.footPrints.filter((footprint)=> {
      return footprint.lat === latitude && footprint.lng === longitude;
    })[0];    

    // update state with date/time and active marker
    this.setState({ 
      selectedPlace: markerProps, 
      activeMarker: marker, 
      showingInfoWindow: true,
      activeDate: footPrint.date,
      activeTime: footPrint.time
    });
    //set state with activeMarker info, then use this.state.activeMarker.props to populate info for Modal
    //change info window visible state to true
    //then take date and time data from the pickers, along with activeMarker props and push that as footprint into the footprint array in state
    //on Component Save (needs to be parent component method) take footprint array and save it as a child prop of CaseTimeline Component
    //CaseTimeline is parent of MapContainer which is parent of Map, Marker, Modal, Form, DatePicker, TimePicker
  }


  displayFootprints = () => {
    return this.state.footPrints.map((footprint, index) => {
      return <Marker
        key={index}
        position={{
          lat: footprint.lat,
          lng: footprint.lng
        }}
        onClick={this.superMarkerClick}

      />

    })
  }


  // When user clicks "save foot print" after inputing time data in modal
  handleOk = () => {
    const { activeLat, activeLon, activeDate, activeTime } = this.state

    // copy footprints so we don't modify state indirectly
    let newFootPrints = this.state.footPrints.slice();

    // add new footprint
    newFootPrints.push({
      lat: activeLat,
      lng: activeLon,
      date: activeDate,
      time: activeTime
    });
    
    // update state
    return (this.setState({
      footPrints: newFootPrints,
      showModal: false,
      activeLat: '',
      activeLon: ''
    }));
  }


  // clear active lat/lon and turn modal off
  handleCancel = () => {
    return (
      this.setState({
        activeLat: '',
        activeLon: '',
        showModal: false,
        showingInfoWindow: false
      })
    );
  }


  handleUpdate() {
    return (
      this.setState({
        showingInfoWindow: false,
        activeDate: this.state.activeDate,
        activeTime: this.state.activeTime
      })
    );
  }


  componentDidMount() {
    console.log('patient id: ' + this.state.patientId)
  }


  render() {    
    // format datasource for rendering table (datasource is an arr of objects)
    const dataSource = this.state.footPrints.map((footprint, idx) => {
      return (
        {
          key: idx,
          patient_id: this.state.patientId,
          date: footprint.date.toDateString(),
          time: footprint.time.toTimeString(),
          // city: // to add later
          latitude: footprint.lat,
          longitude: footprint.lng
        }
      );
    });

    const columns = [ 
      { title: 'patient_id', dataIndex: 'patient_id' }, 
      { title: 'date', dataIndex: 'date' },
      { title: 'time', dataIndex: 'time' },
      { title: 'latitude', dataIndex: 'latitude' },
      { title: 'longitude', dataIndex: 'longitude' }
    ];
    
    return(
      <div>
        <Map google={this.props.google} style={map_style}
          initialCenter={{
          lat: 43.6532, //change this to be set based on location input on form prior to map
          lng: -79.3832,
          }}
          onClick={this.onMapClick}
        >

          {this.displayFootprints()}
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            maxWidth={800}
          > */}
          <Modal
            visible={this.state.showingInfoWindow}
            marker={this.state.activeMarker}
            maxWidth={800}
            onOk={this.handleUpdate}
            onCancel={this.handleCancel}
            okText='Update Footprint'
          >
            <div>
              {/* <Form> */}
                <DatePicker 
                  defaultValue={moment(this.state.activeMarker.date)}
                  onChange={value => {
                    console.log(value._d);
                    return this.setState({ activeDate: value._d });
                }} />
                <TimePicker 
                  defaultValue={moment(this.state.activeTime)}
                  onChange={ value => {
                    return this.setState({ activeTime: value._d });
                }} />
                {/* <Button type="primary" onClick={() => { 
                  debugger
                  console.log('yo'); 
                }}>Save Footprint</Button> */}
              {/* </Form> */}
            </div>
          </Modal>
          {/* </InfoWindow> */}
        </Map>

        <Modal 
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='Save Footprint'
        >
          <DatePicker onChange={value => {
            this.setState({activeDate: value._d}) 
            console.log(value._d)}} />
          <TimePicker onChange={value => {
            this.setState({activeTime: value._d}) 
            console.log(value._d)}} />
        </Modal>

        {/* Table outside of map that shows info from state  */}
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}    // buttons on bottom of table that show how which page to jump to
          className='table-column'
          size='small'
          style={{ width: '40%', float: 'right' }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(MapContainer)
