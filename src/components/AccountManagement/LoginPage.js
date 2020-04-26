import React, { Component, Fragment } from 'react';
import { Col, Row, Button } from 'antd';
// import { Form, FormItem, Input } from "formik-antd";
import { Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router';
// import 'formik-antd/es/input/style';
import 'antd/dist/antd.css';
import '../../App.css';

export default class LoginPage extends Component {
	state = {

		email: '',
		password: ''

	}

	handleSubmit = () => {
		console.log('yo hey')
	}

	handleChange = (e) => {
		 let target = e.target;
         let value = target.type === 'checkbox' ? target.checked : target.value;
         let name = target.name;

         this.setState({
          [name]: value
         });
	}

	render() {
		return (
			<Fragment>
			<Row>
			<Col span={12} id="SignupAside" className="SignupAside"></Col>
			<Col span={12} id="SignupForm" className="SignupForm">
				<Formik
				initialValues={{ name: '', email: '', password: ''}}
				validate={values => {
					let errors = {};
					if (!values.email) {
						errors.email = 'Required';
					}
					
					if (!values.password) {
						errors.password = 'Required';
					}
					return errors;
				}}
				onSubmit={(values, {setSubmitting}) => {
					 console.log('yo')
      				}
				}
				>
				{({ isSubmitting }) => (
					  <div className="FormCenter">
            			<form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
            			<div className="FormField">
                		<label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                		<input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              			</div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/signup" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
      				)}

      			</Formik>



			</Col>
			
			</Row>
			</Fragment>

			)
	}

}