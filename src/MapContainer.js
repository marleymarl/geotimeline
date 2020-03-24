import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { Form, FormItem, Input, InputNumber, Checkbox, DatePicker, TimePicker } from "formik-antd";
// import { Formik, ErrorMessage } from 'formik';
import {
  DatePicker,
  TimePicker,
  Form,
  Button,
  Modal,
  Table,
  Drawer,
  Col,
  Row
} from 'antd';
import 'antd/dist/antd.css';
import * as moment from 'moment';
import { CSVLink, CSVDownload } from 'react-csv';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg';

const map_style = {
  width: '100%',
  height: '100%'
};

function onChange(date, dateString) {
  console.log(date, dateString);
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
    selectedPlace: {},
    drawerVisible: true
  };

  // When user clicks on the map, a red marker shows up
  onMapClick = (mapProps, map, clickEvent) => {
    console.log('Greg is awesome because: ' + JSON.stringify(clickEvent));
    let markerLatLng = clickEvent.latLng;
    const latitude = markerLatLng.lat();
    const longitude = markerLatLng.lng();

    // if infowWindow is already open, close info window, else open modal
    if (this.state.showingInfoWindow) {
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
  };

  // When user clicks on a red marker, an infobox pops up displaying the time for that marker
  superMarkerClick = (markerProps, marker, clickEvent) => {
    const latitude = markerProps.position.lat;
    const longitude = markerProps.position.lng;

    // grab footPrint in state that matches with lat/lng position
    const footPrint = this.state.footPrints.filter(footprint => {
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
  };

  displayFootprints = () => {
    return this.state.footPrints.map((footprint, index) => {
      return (
        <Marker
          key={index}
          position={{
            lat: footprint.lat,
            lng: footprint.lng
          }}
          onClick={this.superMarkerClick}
        />
      );
    });
  };

  // When user clicks "save foot print" after inputing time data in modal
  handleOk = () => {
    const { activeLat, activeLon, activeDate, activeTime } = this.state;

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
    return this.setState({
      footPrints: newFootPrints,
      showModal: false,
      activeLat: '',
      activeLon: ''
    });
  };

  // clear active lat/lon and turn modal off
  handleCancel = () => {
    return this.setState({
      activeLat: '',
      activeLon: '',
      showModal: false,
      showingInfoWindow: false
    });
  };

  // update footprint with new date/time
  handleUpdate = prop => {
    const { activeDate, activeTime, activeMarker } = this.state;
    const latitude = activeMarker.position.lat();
    const longitude = activeMarker.position.lng();

    // shallow copy footprints array
    let newFootPrints = this.state.footPrints.slice();

    // grab footprint and index in newFootPrints that matches lat/lon
    let footPrint = newFootPrints.filter(footprint => {
      return footprint.lat === latitude && footprint.lng === longitude;
    })[0];

    // update the footprint with the new date/times
    footPrint.date = activeDate;
    footPrint.time = activeTime;

    // update state to show new footprints with updated date/time
    return this.setState({
      footPrints: newFootPrints,
      showingInfoWindow: false,
      activeDate: '',
      activeTime: '',
      activeMarker: ''
    });
  };

  formatData = () => {
    let csvData = [['date', 'time', 'latitude', 'longitude']];

    this.state.footPrints.forEach(footPrint => {
      let newFootPrintArr = [];
      newFootPrintArr.push(
        footPrint.date,
        footPrint.time,
        footPrint.lat,
        footPrint.lng
      );
      csvData.push(newFootPrintArr);
    });

    return csvData;
  };

  // functions to control drawer open/close state

  openDrawer = () => {
    this.setState({
      drawerVisible: true
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerVisible: false
    });
  };

  componentDidMount() {
    console.log('patient id: ' + this.state.patientId);
  }

  render() {
    // format datasource for rendering table (datasource is an arr of objects)
    const dataSource = this.state.footPrints.map((footprint, idx) => {
      return {
        key: idx,
        patient_id: this.state.patientId,
        date: footprint.date.toDateString(),
        time: footprint.time.toTimeString(),
        // city: // to add later
        latitude: footprint.lat,
        longitude: footprint.lng
      };
    });

    const columns = [
      { title: 'patient_id', dataIndex: 'patient_id' },
      { title: 'date', dataIndex: 'date' },
      { title: 'time', dataIndex: 'time' },
      { title: 'latitude', dataIndex: 'latitude' },
      { title: 'longitude', dataIndex: 'longitude' }
    ];

    let csvData = this.formatData();

    return (
      <div className="outer-wrap">
        <Map
          google={this.props.google}
          style={map_style}
          initialCenter={{
            lat: 43.6532, //change this to be set based on location input on form prior to map
            lng: -79.3832
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
            okText="Update Footprint"
          >
            <div>
              {/* <Form> */}
              <DatePicker
                defaultValue={moment(this.state.activeMarker.date)}
                onChange={value => {
                  console.log(value._d);
                  return this.setState({ activeDate: value._d });
                }}
              />
              <TimePicker
                defaultValue={moment(this.state.activeTime)}
                onChange={value => {
                  return this.setState({ activeTime: value._d });
                }}
              />
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
          okText="Save Footprint"
        >
          <DatePicker
            onChange={value => {
              this.setState({ activeDate: value._d });
              console.log(value._d);
            }}
          />
          <TimePicker
            onChange={value => {
              this.setState({ activeTime: value._d });
              console.log(value._d);
            }}
          />
        </Modal>
        {/* Table outside of map that shows info from state  */}
        <Button
          type="primary"
          onClick={this.openDrawer}
          className="dataBtnStyle"
        >
          View Footprint Data
        </Button>
        <Drawer
          title="Footprint Data"
          visible={this.state.drawerVisible}
          width={'60%'}
          className="drawerStyles"
          closable={true}
          onClose={this.closeDrawer}
          footer={
            <Row justify="center">
              <Col>
                <Button type="primary">
                  <CSVLink
                    data={this.state.footPrints}
                    className="download-csv"
                  >
                    Save to CSV
                  </CSVLink>
                </Button>
              </Col>
            </Row>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false} // buttons on bottom of table that show how which page to jump to
            className="table-column"
            size="small"
          />
        </Drawer>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);
