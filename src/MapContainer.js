import React, {Component } from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import { Form, FormItem, Input, InputNumber, Checkbox, DatePicker, TimePicker } from "formik-antd";
// import { Formik, ErrorMessage } from 'formik';
import { DatePicker, TimePicker, Form, Button, Modal } from 'antd';
import 'antd/dist/antd.css';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg'

const map_style = {
  width: '90%',
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

onMarkerClick = (mapProps, map, clickEvent) => {
console.log('Greg is awesome because: ' + JSON.stringify(clickEvent))
let markerLatLng = clickEvent.latLng
}

superMarkerClick = (markerProps, marker, clickEvent) => {

	this.setState({selectedPlace: markerProps, activeMarker: marker, showModal: true})
	//set state with activeMarker info, then use this.state.activeMarker.props to populate info for Modal
	//change Modal visible state to true
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

handleOk = () => {

}

handleCancel = () => {

}

handleSubmit = () => {

}

componentDidMount() {
	console.log('patient id: ' + this.state.patientId)
}



render() {
const currentMarkers = this.state.footPrints.map((footprint) => <Marker
title={footprint.title}
details={footprint.details}
datetime={footprint.datetime}
key={footprint.lat + footprint.lon}
position={{lat: footprint}}
onClick={this.onMarkerClick}
/>)
return(
<div>
<Map google={this.props.google} style={map_style}
initialCenter={{
lat: 43.6532, //change this to be set based on location input on form prior to map
lng: -79.3832,
}}
onClick={this.onMarkerClick}
>

  {this.displayFootprints()}
    <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          maxWidth={800}>
            <div>
           <Form>
              <DatePicker onChange={value => console.log(value._d)} />
              <TimePicker />
              <Button type="primary" onClick={() => { console.log('yo') }}>Save Footprint</Button>
            </Form>
            
            </div>
        </InfoWindow>
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
</div>
);

}
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(MapContainer)
